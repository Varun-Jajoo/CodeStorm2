import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import PersonalFirst from "../components/PersonalFirst";
import PersonalSecond from "../components/PersonalSecond";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";
import axios from "axios";

const Dots = ({ activeDotIndex }) => {
  const dots = [1, 2];

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

const PersonalQuestions = () => {
  const androidPadding = Platform.OS === "android" ? 20 : 0;
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const { userData, setUserData } = useContext(UserContext);
  const navigation = useNavigation();

  // const handleContinuePress = () => {
  //   setActiveDotIndex(activeDotIndex + 1);
  //   if (activeDotIndex + 1 === 2) {
  //     console.log(userData);
  //     axios.post(
  //       "https://ap-south-1.aws.data.mongodb-api.com/app/data-icdsj/endpoint/data/v1",
  //       {
  //         data: JSON.stringify({
  //           name: userData.name,
  //           age: userData.age,
  //           phn_num: parseInt(userData.phoneNumber),
  //           depend: parseInt(userData.dependents),
  //           area: userData.city,
  //           lst_mnth_sav: parseInt(userData.savings),
  //           ann_inc: parseInt(userData.salary) * 12,
  //         }),
  //       }
  //     );
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: "Main" }],
  //     });
  //   }
  // };
  // const handleContinuePress = async () => {
  //   setActiveDotIndex(activeDotIndex + 1);
  //   if (activeDotIndex + 1 === 2) {
  //     console.log(userData);
  //     try {
  //       const response = await axios.post(
  //         "https://ap-south-1.aws.data.mongodb-api.com/app/data-icdsj/endpoint/data/v1",
  //         {
  //           data: JSON.stringify({
  //             name: userData.name,
  //             age: userData.age,
  //             phn_num: parseInt(userData.phoneNumber),
  //             depend: parseInt(userData.dependents),
  //             area: userData.city,
  //             lst_mnth_sav: parseInt(userData.savings),
  //             ann_inc: parseInt(userData.salary) * 12,
  //           }),
  //         }
  //       );

  //       console.log("Response:", response.data);

  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: "Main" }],
  //       });
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  // };
  const handleContinuePress = async () => {
    setActiveDotIndex(activeDotIndex + 1);
    if (activeDotIndex + 1 === 2) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
      try {
        console.log(userData);
        // const response = await axios.post(
        //   "https://nfcbackend.snehalpoptani.repl.co/add", // Update with your server URL
        //   {
        //     level: userData.level,
        //     name: userData.name,
        //     age: userData.age,
        //     phn_num: userData.phoneNumber,
        //     depend: userData.dependents,
        //     area: userData.city,
        //     lst_mnth_sav: userData.savings,
        //     ann_inc: userData.salary,
        //     points: userData.points,
        //     progress: userData.progress,
        //   }
        // );
        // console.log("Response:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: androidPadding,
        backgroundColor: "white",
        height: Dimensions.get("window").height,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Poppins",
          textAlign: "center",
          paddingTop: 20,
        }}
      >
        Tell us about yourself
      </Text>
      {activeDotIndex === 0 && <PersonalFirst />}
      {activeDotIndex === 1 && <PersonalSecond />}
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

export default PersonalQuestions;

const styles = StyleSheet.create({
  continueButton: {
    backgroundColor: "black",
    width: 300,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 20,
    zIndex: -1,
    alignSelf: "center",
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
