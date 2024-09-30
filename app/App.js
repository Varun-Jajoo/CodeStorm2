import React, { createContext, useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./StackNavigator";
import { useFonts } from "expo-font";
import { ModalPortal } from "react-native-modals";

export const UserContext = createContext();

export default function App() {
  const [userData, setUserData] = useState({
    name: "Shreyans",
    age: "18",
    phoneNumber: "983838283",
    language: "English",
    dependents: "8",
    goals: [],
    spend: [
      { spent: 0, title: "Gifts" },
      { spent: 0, title: "Leisure" },
      { spent: 0, title: "Technology" },
      { spent: 0, title: "Transport" },
    ],
    salary: "7000",
    savings: "600",
    city: "Rural",
    form: true,
    leftToSpend: 0,
    points: 1000,
    level: "1",
    progress: {
      bof: {
        lns: false,
        quiz: false,
        wt: false,
        video: false,
      },
    },
    wrongQuestion: [],
    bankForm: true,
    aadhar: "",
    pan: "",
  });
  const [loaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <StackNavigator />
      <ModalPortal />
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({});
