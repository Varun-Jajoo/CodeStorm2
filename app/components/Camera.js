import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";

// Initialize Google Generative AI with the API key
const genAI = new GoogleGenerativeAI("AIzaSyD66npWWEDp8zXmnI2X9FMPQwDQs6A4NIs");

// Function to convert the image to base64 format for Gemini
async function fileToGenerativePart(base64Data, mimeType) {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
}

export default function CameraScreen() {
  const [image, setImage] = useState(null);
  const [geminiResponse, setGeminiResponse] = useState(null);

  const supportedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/heic",
    "image/heif",
  ];

  const photos = {
    FOOD: require("../assets/FOOD.png"),
    CLOTHES: require("../assets/CLOTHES.png"),
    TECHNOLOGY: require("../assets/TECHNOLOGY.png"),
    EDUCATION: require("../assets/EDUCATION.png"),
    TRANSPORT: require("../assets/TRANSPORT.png"),
    
  };

  const openCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const imageUri = result.assets[0].uri;
        const mimeType = result.assets[0].mimeType;

        if (!supportedMimeTypes.includes(mimeType)) {
          alert(
            `Unsupported image type: ${mimeType}. Please select a PNG, JPEG, WEBP, HEIC, or HEIF image.`
          );
          return;
        }

        setImage(imageUri);

        let newImageUri = imageUri;
        if (mimeType === "image/jpeg") {
          const manipulatedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [{ resize: { width: 800, height: 800 } }],
            { format: ImageManipulator.SaveFormat.PNG }
          );
          newImageUri = manipulatedImage.uri;
        }

        const base64Data = await FileSystem.readAsStringAsync(newImageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const filePart = await fileToGenerativePart(base64Data, "image/png");

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const geminiResult = await model.generateContent([
          `You will be provided with images of receipts. Your task is to categorize each receipt according to the type of items and the total amount spent in each category. Please ensure that you extract the relevant details and format them in the specific JSON structure provided below.
CATEGORIES ARE : FOOD, CLOTHES, EDUCATION, TECHNOLOGY, TRANSPORT AND OTHERS
Details to extract:

[
  {
    "category_type": "CLOTHES",
    "total_amount_spent": 100
  },
  {
    "category_type": "FOOD",
    "total_amount_spent": 200
  },
  {
    "category_type": "EDUCATION",
    "total_amount_spent": 300
  },
  {
    "category_type": "TRANSPORT",
    "total_amount_spent": 400
  },
  {
    "category_type": "TECHNOLOGY",
    "total_amount_spent": 500
  },
  {
    "category_type": "OTHERS",
    "total_amount_spent": 600
  }
]`,
          filePart,
        ]);

        let geminiResponse = geminiResult.response.text();
        geminiResponse = geminiResponse.replace(/`/g, "").replace(/json/g, "");
        setGeminiResponse(JSON.parse(geminiResponse));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}> 
      <TouchableOpacity onPress={openCamera} style={styles.button}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

      {geminiResponse && (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.responseContainer}>
            {geminiResponse.map((item, index) => {
              // Use the category_type to get the corresponding image
              const itemImage =
                photos[item.category_type] // Fallback to a default image

              return (
                <View key={index} style={styles.responseItem}>
                      {item.total_amount_spent !== 0 && <Image source={itemImage} style={styles.image} />}
                  {item.total_amount_spent !== 0 && (
                    <View style={styles.textContainer}>
                      <Text style={styles.title}>{item.category_type}</Text>
                      <Text style={styles.description}>
                        Total Amount Spent: {item.total_amount_spent}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 0,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  capturedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  responseContainer: {
    marginTop: 20,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  responseItem: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  description: {
    color: "gray",
  },
});
