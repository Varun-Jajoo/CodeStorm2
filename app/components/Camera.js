import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"; // Import FileSystem for handling files
import * as ImageManipulator from "expo-image-manipulator"; // Import Image Manipulator for image conversion

// Initialize Google Generative AI with the API key
const genAI = new GoogleGenerativeAI("AIzaSyD66npWWEDp8zXmnI2X9FMPQwDQs6A4NIs"); // Ensure your API key is securely stored in environment variables

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

  // Supported MIME types
  const supportedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/heic",
    "image/heif",
  ];

  // Camera logic for opening the camera and capturing an image
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
        const mimeType = result.assets[0].mimeType; // Get the MIME type of the selected image

        // Validate the MIME type
        if (!supportedMimeTypes.includes(mimeType)) {
          alert(
            `Unsupported image type: ${mimeType}. Please select a PNG, JPEG, WEBP, HEIC, or HEIF image.`
          );
          return; // Exit the function if the MIME type is unsupported
        }

        setImage(imageUri); // Save image URI
        console.log(imageUri); // Log image URI

        // Convert JPG to PNG if necessary
        let newImageUri = imageUri;
        if (mimeType === "image/jpeg") {
          const manipulatedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [{ resize: { width: 800, height: 800 } }], // Optional resizing
            { format: ImageManipulator.SaveFormat.PNG } // Convert to PNG
          );
          newImageUri = manipulatedImage.uri; // Update to the new PNG URI
        }

        // Convert image to base64 and send it to Gemini
        const base64Data = await FileSystem.readAsStringAsync(newImageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const filePart = await fileToGenerativePart(base64Data, "image/png");

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const geminiResult = await model.generateContent([
          `You will be provided with images of receipts. Your task is to categorize each receipt according to the type of items and the total amount spent in each category. Please ensure that you extract the relevant details and format them in the specific JSON structure provided below.
CATEGORIES ARE : FOOD ,CLOTHES EDUCATION TECHNOLOGY AND TRANSPORT
Details to extract:

Category type
Total amount spent in each category`,
          filePart,
        ]);

        console.log("Gemini AI Response:", geminiResult.response.text());
        setGeminiResponse(geminiResult.response.text()); // Save Gemini response
      }
    } catch (e) {
      console.log(e); // Error handling
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Capture Image</Text>

      {/* Display captured image */}
      {image ? (
        <Image source={{ uri: image }} style={styles.capturedImage} />
      ) : (
        <Text>No image captured</Text>
      )}

      {/* Button to open camera */}
      <TouchableOpacity onPress={openCamera} style={styles.button}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>

      {/* Display Gemini AI response */}
      {geminiResponse && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>Gemini AI Response:</Text>
          <Text>{geminiResponse}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  responseText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
