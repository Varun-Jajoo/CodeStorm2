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

const Popup = () => {
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext);
  return (
    <SafeAreaView style={styles.popup}>
      <View style={styles.topcard}>
        <Text style={styles.tip}>Learn about Basics of Finance</Text>
      </View>
      <Pressable
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 150,
          width: "90%",
          backgroundColor: "#F1C93B",
          borderRadius: 35,
        }}
      >
        <Image
          source={require("../assets/3d-calculator_10473465.png")}
          style={{ height: 80, width: 80 }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Poppins",
            }}
          >
            Basics of Finance
          </Text>
          <Progress.Bar
            borderColor="transparent"
            unfilledColor="white"
            color="rgb(59,198,84)"
            progress={userData.level / 5}
            width={150}
            height={10}
            borderRadius={20}
            style={{ marginTop: 20, borderWidth: -5 }}
          />
        </View>
      </Pressable>

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
        <View
          style={{
            width: 25,
            height: 25,
            borderRadius: 40,
            backgroundColor: "red",
            position: "relative",
            bottom: 227,
            left: 164,
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  popup: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  topcard: {
    flexDirection: "column",
    marginVertical: 20,
  },
  edu: {
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 15,
    width: "100%",
    marginTop: 30,
  },
  popcard: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
    backgroundColor: "#fff",
    flex: 0,
    flexBasis: "40%",
    borderRadius: 20,
    margin: 6,
  },
  study: {
    backgroundColor: "#d5ecf9",
    borderColor: "rgb(15, 37, 145)",
  },
  quiz: {
    backgroundColor: "#ffcffa",
    borderColor: "rgb(120, 21, 120)",
  },
  walk: {
    backgroundColor: "rgb(250, 250, 159)",
    borderColor: "rgb(166, 112, 31)",
  },
  video: {
    backgroundColor: "rgb(182, 255, 182)",
    borderColor: "rgb(19, 66, 22)",
  },
  cardImage: {
    height: 60,
    width: 60,
    marginBottom: 20,
  },
  tip: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Popup;
