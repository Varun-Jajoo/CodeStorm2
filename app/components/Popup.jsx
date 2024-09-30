import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import * as Progress from "react-native-progress";
import { UserContext } from "../App";
import { LinearGradient } from "expo-linear-gradient";

const Popup = () => {
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext);
  return (
    <SafeAreaView style={styles.popup}>
      <LinearGradient colors={["#3FA2F6", "#7CF5FF"]} style={styles.gradient}>
        <View style={styles.topcard}>
          <Text style={styles.tip}>Learn about Basics of Finance</Text>
        </View>
        <Pressable style={styles.financeCard}>
          <Image
            source={require("../assets/finance.png")}
            style={styles.financeImage}
          />
          <View style={styles.financeTextContainer}>
            <Text style={styles.financeText}>Basics of Finance</Text>
            <Progress.Bar
              borderColor="transparent"
              unfilledColor="white"
              color="#2a9d8f"
              progress={userData.level / 5}
              width={150}
              height={10}
              borderRadius={20}
              style={styles.progressBar}
            />
          </View>
        </Pressable>
      </LinearGradient>

      <View style={styles.edu}>
        <TouchableOpacity
          style={[styles.popcard, styles.study]}
          onPress={() => navigation.navigate("Learn")}
        >
          <Image
            style={styles.cardImage}
            source={require("../assets/education_3181724.png")}
          />
          <Text style={styles.poptext}>Learn and Study</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.popcard, styles.quiz]}
          onPress={() => navigation.navigate("Quiz")}
        >
          <Image
            style={styles.cardImage}
            source={require("../assets/search_3277438.png")}
          />
          <Text style={styles.poptext}>Take Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.popcard, styles.walk]}>
          <Image
            style={styles.cardImage}
            source={require("../assets/team_9068396.png")}
          />
          <Text style={styles.poptext}>Walkthrough</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.popcard, styles.video]}
          onPress={() => navigation.navigate("Video")}
        >
          <Image
            style={styles.cardImage}
            source={require("../assets/video_7214114.png")}
          />
          <Text style={styles.poptext}>Video Tutorials</Text>
        </TouchableOpacity>
      </View>
      {userData.wrongQuestion.length > 0 && (
        <View style={styles.notificationDot} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  popup: {
    height: "100%",
    width: "100%",
    backgroundColor: "#EEF7FF",
    alignItems: "center",
  },
  gradient: {
    height: 350,
    width: "100%",
    alignItems: "center",
    paddingTop: 60,
  },
  topcard: {
    marginBottom: 20,
  },
  tip: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  financeCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: "90%",
    backgroundColor: "#bde0fe",
    borderRadius: 35,
    padding: 20,
  },
  financeImage: {
    height: 80,
    width: 80,
    marginRight: 20,
  },
  financeTextContainer: {
    alignItems: "center",
  },
  financeText: {
    fontSize: 22,
    fontFamily: "Poppins",
    color: "#023e8a",
    fontWeight: "600",
    marginBottom: 10,
  },
  progressBar: {
    marginTop: 10,
  },
  edu: {
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 15,
    width: "100%",
    marginTop: 30,
    paddingBottom: 20,
  },
  popcard: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    flex: 0,
    flexBasis: "40%",
    borderRadius: 20,
    margin: 6,
    padding: 10,
  },
  study: {
    backgroundColor: "#bde0fe",
  },
  quiz: {
    backgroundColor: "#a2d2ff",
  },
  walk: {
    backgroundColor: "#ade8f4",
  },
  video: {
    backgroundColor: "#70d6ff",
  },
  cardImage: {
    height: 60,
    width: 60,
    marginBottom: 10,
  },
  poptext: {
    fontSize: 16,
    fontWeight: "600",
    color: "#023e8a",
    textAlign: "center",
  },
  notificationDot: {
    width: 25,
    height: 25,
    borderRadius: 40,
    backgroundColor: "red",
    position: "absolute",
    bottom: 227,
    right: 30,
  },
});

export default Popup;
