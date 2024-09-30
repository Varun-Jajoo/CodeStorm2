import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserContext } from "../App";

const LevelCompletion = () => {
  const route = useRoute();
  const { score } = route.params;
  const { userData, setUserData } = useContext(UserContext);
  const navigation = useNavigation();
  const handleNextLevel = () => {
    setUserData((prev) => ({
      ...prev,
      points: prev.points + score * 50,
    }));
    const check = userData.progress.bof;
    if (check.quiz) {
      setUserData((prev) => ({
        ...prev,
        level: parseInt(prev.level) + 1,
      }));
      navigation.navigate("Popup");
    } else {
      Alert.alert(
        "Complete All",
        "Please complete every module of this level",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          gap: 20,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Level Complete</Text>
        <Text style={{ fontSize: 15, fontWeight: 600 }}>
          Level {userData.level}
        </Text>
        <Image
          source={require("../assets/trophy_2827957.png")}
          style={{ height: 150, width: 150, marginTop: 30 }}
        />
        <View
          style={{
            height: 160,
            width: 350,
            backgroundColor: "#8ECDDD",
            borderRadius: 20,
            marginTop: 20,
          }}
        >
          <View
            style={{
              height: 80,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: "grey",
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 90,
                padding: 7,
              }}
            >
              <Image
                source={require("../assets/trophy_2827957.png")}
                style={{ height: 25, width: 25 }}
              />
            </View>
            <Text style={{ fontSize: 20 }}>Answer Right</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{score}</Text>
          </View>
          <View
            style={{
              height: 80,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 90,
                padding: 7,
              }}
            >
              <Image
                source={require("../assets/trophy_2827957.png")}
                style={{ height: 25, width: 25 }}
              />
            </View>
            <Text style={{ fontSize: 20 }}>Points Gained</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {score * 50}
            </Text>
          </View>
        </View>
        <Pressable style={styles.continueButton} onPress={handleNextLevel}>
          <Text style={styles.continueButtonText}>
            Proceed to Level {parseInt(userData.level) + 1}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LevelCompletion;

const styles = StyleSheet.create({
  continueButton: {
    backgroundColor: "#22668D",
    width: 350,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  continueButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Poppins",
  },
});
