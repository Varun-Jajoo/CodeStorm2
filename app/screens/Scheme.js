import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CheckBox from "../components/CheckBox";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Scheme = () => {
  const backgroundColors = [
    "#FFE4C4", // bisque
    "#D8BFD8", // thistle
    "#DDA0DD", // plum
    "#E6F0FF", // lavender
    "#AFEEEE", // paleturquoise
    "#FF7F50", // coral
    "#F5FFFA", // mint
    "#FFDAB9", // peach
  ];
  const [aadhar, setAadhar] = useState(false);
  const [bpl, setBpl] = useState(false);
  const [preg, setPreg] = useState(false);
  const [bp, setBp] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const prompt =
    "generate schemes that as an Indian citizen having" +
    (aadhar ? " aadhar card" : "") +
    (bpl ? " Income certificate card" : "") +
    (preg ? " is a pregnant woman" : "") +
    (bp ? " business plan" : "") +
    ", all government schemes I can claim";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODEyZDgxOWYtNDI4ZS00NDMyLWFkZWMtMTZhMmE1NmYzMGQ4IiwidHlwZSI6ImZyb250X2FwaV90b2tlbiJ9.6xc3EtZR33l724P6gxseDfe1WPeUl7TnbUoc3l2MrBg"; // Replace with your actual API key

  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/text/generation",
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      show_original_response: false,
      providers: "openai",
      text: prompt,
      temperature: 0.2,
      max_tokens: 250,
    },
  };

  const handlePress = async () => {
    try {
      setLoading(true);
      const response = await axios.request(options);
      const schemeList = response.data.openai.generated_text
        .split("\n")
        .filter((scheme) => scheme.trim() !== "");
      setSchemes(schemeList);
      setClicked(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LinearGradient colors={["#3FA2F6", "#7CF5FF"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Image
            source={require("../assets/government.png")}
            style={styles.headerImage}
          />
          {!clicked ? (
            <View style={styles.content}>
              <Text style={styles.header}>
                Check Your Eligibility for Government Schemes
              </Text>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  title="Do you have an Aadhar card?"
                  onPress={() => setAadhar(!aadhar)}
                  isChecked={aadhar}
                />
                <CheckBox
                  title="Do you have an income certificate?"
                  onPress={() => setBpl(!bpl)}
                  isChecked={bpl}
                />
                <CheckBox
                  title="Are you a pregnant woman?"
                  onPress={() => setPreg(!preg)}
                  isChecked={preg}
                />
                <CheckBox
                  title="Do you have a business plan?"
                  onPress={() => setBp(!bp)}
                  isChecked={bp}
                />
              </View>
              <Pressable style={styles.continueButton} onPress={handlePress}>
                <Text style={styles.continueButtonText}>
                  {loading ? "Loading..." : "Continue"}
                </Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.content}>
              <Text style={styles.header}>Government Schemes</Text>
              {schemes.slice(0, 5).map((scheme, index) => (
                <View
                  key={index}
                  style={[
                    styles.schemeItemContainer,
                    { backgroundColor: backgroundColors[index] },
                  ]}
                >
                  <Text style={styles.boldText}>{scheme.split(":")[0]}:</Text>
                  <Text style={styles.schemeItem}>
                    {scheme.split(":").slice(1).join(":")}
                  </Text>
                </View>
              ))}
              <Pressable
                style={styles.continueButton}
                onPress={() => navigation.navigate("Doc")}
              >
                <Text style={styles.continueButtonText}>
                  Press to create a PMJDY
                </Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerImage: {
    width: "100%",
    height: 250,
    marginTop: 20,
    resizeMode: "contain",
    marginBottom: 20,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins",
  },
  checkboxContainer: {
    width: "100%",
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  continueButtonText: {
    color: "#4A00E0",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  schemeItemContainer: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Poppins",
  },
  schemeItem: {
    fontSize: 16,
    fontFamily: "Poppins",
  },
});

export default Scheme;
