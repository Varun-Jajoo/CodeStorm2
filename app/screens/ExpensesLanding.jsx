import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Pressable,
  Platform,
  Modal,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import { UserContext } from "../App";
import { LinearGradient } from "expo-linear-gradient";
import { GoogleGenerativeAI } from "@google/generative-ai";
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

const Expenses = () => {
  const [answer, setAnswer] = useState("");
  const { userData, setUserData } = useContext(UserContext);
  const [selectedTab, setSelectedTab] = useState(true);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false); // Second modal
  const [expend, setExpend] = useState(0);
  const [loading, setLoading] = useState(false);
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
    OTHERS: require("../assets/OTHERS.png"),
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

  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/text/generation",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiN2E0ODk0MjktZGIwMS00YzMyLTgwNmYtZmI3YzgyMzkzMWYzIiwidHlwZSI6ImFwaV90b2tlbiJ9.zb2xQc9BJybAGp0EX3fDuDjtvTB-_Uqe5NZ16wDW9Hg",
    },
    data: {
      providers: "openai",
      text: `give recommendation, if i am ${userData.age} years old and i have ${userData.dependents} in my family and live in a ${userData.city} area some financial tips of savings, give me 2 points of 1 line `,

      temperature: 0.3,
      max_tokens: 75,
    },
  };
  const totalSpent = userData.spend.reduce((accumulator, item) => {
    return accumulator + item.spent;
  }, 0);

  const handleQuestionSubmit = async () => {
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        console.log(response.data.openai.generated_text);
        setAnswer(response.data.openai.generated_text);
      })
      .catch((error) => {
        console.error(error);
      });
    setLoading(false);
  };
  const handlesubmit = () => {
    navigation.navigate("Map");
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#DFF5FF" }}>
      <ScrollView>
        <View
          style={{
            paddingTop: Platform.OS === "android" ? 30 : 0,
            height: "100%",
            flexDirection: "column",
            paddingBottom: 50,
          }}
        >
          <LinearGradient
            colors={["#3FA2F6", "#7CF5FF"]}
            style={{
              height: "51%",
              width: "100%",
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              position: "relative",
              bottom: 60,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingTop: 70,
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: 10,
                  borderRadius: 99,
                  backgroundColor: "white",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Pressable
                  onPress={() => setSelectedTab(true)}
                  style={[
                    styles.tabButton,
                    {
                      borderBottomWidth: selectedTab ? 2 : 0,
                      borderBottomColor: "#5356FF",
                      height: 22,
                    },
                  ]}
                >
                  <Text style={{ paddingBottom: 5 }}>Days</Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelectedTab(false)}
                  style={[
                    styles.tabButton,
                    {
                      borderBottomWidth: !selectedTab ? 2 : 0,
                      borderBottomColor: "#5356FF",
                      height: 22,
                    },
                  ]}
                >
                  <Text style={{ paddingBottom: 5 }}>Weeks</Text>
                </Pressable>
              </View>
              <View
                style={{
                  borderRadius: 99,
                  backgroundColor: "white",
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 15,
                }}
              >
                <Pressable
                  onPress={() => setModalVisible2(true)}
                  style={{
                    borderRadius: 99,
                    backgroundColor: "white",
                    width: 45,
                    height: 45,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Octicons name="graph" size={30} color="#5356FF" />
                </Pressable>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 20,
              }}
            >
              <AnimatedCircularProgress
                size={160}
                rotation={0}
                width={15}
                fill={(userData.level * 100) / 5}
                tintColor="#5356FF"
                onAnimationComplete={() => console.log("onAnimationComplete")}
                backgroundColor="#f0fcfe"
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                paddingTop: 20,
                color: "black",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Keep it up you can do it !!
            </Text>
          </LinearGradient>
          <Modal
            transparent={true}
            visible={modalVisible2}
            animationType="slide"
            onRequestClose={() => setModalVisible2(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {geminiResponse && (
                  <ScrollView style={styles.scrollContainer}>
                    <View style={styles.responseContainer}>
                      {geminiResponse.map((item, index) => {
                        // Use the category_type to get the corresponding image
                        const itemImage = photos[item.category_type]; // Fallback to a default image

                        return (
                          <View key={index} style={styles.responseItem}>
                            {item.total_amount_spent !== 0 && (
                              <Image source={itemImage} style={styles.image} />
                            )}
                            {item.total_amount_spent !== 0 && (
                              <View style={styles.textContainer}>
                                <Text style={styles.title}>
                                  {item.category_type}
                                </Text>
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
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalVisible2(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <View
            style={{
              width: "100%",
              position: "relative",
              top: -40,
              paddingHorizontal: 10,
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  height: 110,
                  backgroundColor: "#5DEBD7",
                  borderRadius: 15,
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingTop: 10,
                  }}
                >
                  <Text style={{ fontSize: 19 }}>Expenditure</Text>
                  <Pressable
                    onPress={() => setModalVisible(true)}
                    style={{
                      height: 25,
                      width: 25,
                      backgroundColor: "black",
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 19,
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    flexDirection: "coloumn",
                    paddingHorizontal: 10,
                    paddingBottom: 12,
                    gap: 3,
                  }}
                >
                  <Text style={{ fontSize: 35 }}>₹ {totalSpent + expend}</Text>
                  <Text> of {userData.salary - userData.savings} Rupees</Text>
                </View>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <View
                style={{
                  height: 110,
                  backgroundColor: "#7BC9FF",
                  borderRadius: 15,
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingTop: 10,
                  }}
                >
                  <Text style={{ fontSize: 19 }}>Savings</Text>
                  <Pressable
                    style={{
                      height: 25,
                      width: 25,
                      backgroundColor: "black",
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 19,
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    flexDirection: "coloumn",
                    paddingHorizontal: 10,
                    paddingBottom: 12,
                    gap: 3,
                  }}
                >
                  <Text style={{ fontSize: 35 }}>₹ {userData.savings}</Text>
                  <Text> of {userData.salary} Rupees</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={openCamera} style={styles.button2}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
          <View
            style={{
              marginHorizontal: 10,
              height: 250,
              backgroundColor: "#bbd0ff",
              borderRadius: 20,
              paddingHorizontal: 10,
              marginTop: -20,
              alignItems: "center",
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 600, color: "#5356FF" }}>
              Recommendations for you
            </Text>

            <Pressable
              style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                backgroundColor: "#008DDA",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 99,
                marginTop: 10,
              }}
              onPress={handleQuestionSubmit}
            >
              <Text style={{ color: "white" }}>
                {loading ? "Loading..." : "Recommend"}
              </Text>
            </Pressable>

            <ScrollView
              style={{ padding: 5, maxHeight: 160 }}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={true}
            >
              <Text style={{ color: "#5356FF" }}>
                {answer ? answer.trim() : "Press The Button"}
              </Text>
            </ScrollView>
          </View>
          <Text
            style={{
              textAlign: "center",
              position: "absolute",
              top: Platform.OS === "android" ? 127 : 105,
              right: "45%",
              fontSize: 80,
              color: "#5356FF",
              fontWeight: "bold",
            }}
          >
            {userData.level}
          </Text>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Your Todays Expenditure!</Text>
            <TextInput
              style={styles.input}
              placeholder="Expenditure in rupees"
              onChangeText={(text) => setExpend(parseInt(text, 10))}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Expenses;

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
  button2: {
    backgroundColor: "#5356FF",
    borderRadius: 15,
    height: Dimensions.get("window").height / 15,
    marginBottom: 20,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",

    transform: [{ translateY: -20 }],
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 19,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").height - 240,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#5356FF",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  tabButton: {
    alignItems: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: 200,
    height: 50,
    borderColor: "lightgray",
    borderRadius: 10,
    marginTop: 5,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 7,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
