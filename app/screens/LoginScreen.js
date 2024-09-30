import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import OnboardingFirst from "../components/OnboardingFirst";
import OnboardingSecond from "../components/OnboardingSecond";
import OnboardingThree from "../components/OnboardingThree";
import { UserContext } from "../App";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Dots = ({ activeDotIndex }) => {
  const dots = [1, 2, 3];
  const { userData, setUserData } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (userData.form) {
      // navigation.navigate('Main')
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    }
  });

  return (
    <View style={styles.dotsContainer}>
      {dots.map((_, index) => (
        <View
          key={index}
          style={[styles.dot, activeDotIndex === index && styles.activeDot]}
        />
      ))}
    </View>
  );
};

const LoginScreen = () => {
  const androidPadding = Platform.OS === "android" ? 20 : 0;
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const navigation = useNavigation();

  const handleContinuePress = () => {
    setActiveDotIndex(activeDotIndex + 1);
    if (activeDotIndex + 1 === 3) {
      navigation.navigate("Personal");
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: androidPadding, height: screenHeight },
      ]}
    >
      <Image
        style={styles.img}
        source={require("../assets/3d-render-hand-put-golden-coin-into-piggy-bank.jpg")}
      />
      <Text style={styles.title}>Financy</Text>

      {activeDotIndex === 0 && <OnboardingFirst />}
      {activeDotIndex === 1 && <OnboardingSecond />}
      {activeDotIndex === 2 && <OnboardingThree />}

      <Dots activeDotIndex={activeDotIndex} />
      <Pressable
        style={styles.continueButton}
        onPress={() => handleContinuePress()}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    gap: 10,
    fontFamily: "Poppins",
  },
  title: {
    fontFamily: "Poppins",
    fontSize: 40,
  },
  img: {
    width: 200,
    height: 200,
  },

  continueButton: {
    backgroundColor: "black",
    width: 300,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 20,
    zIndex: -1,
  },
  continueButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    //fontWeight: 700,
    fontFamily: "Poppins",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    zIndex: -1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "black",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "grey",
    width: 15,
  },
});

export default LoginScreen;
