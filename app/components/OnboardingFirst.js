import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { UserContext } from "../App";

const translations = {
  english: {
    namePlaceholder: "Enter your name",
    agePlaceholder: "Age",
    phonePlaceholder: "Phone Number",
    languageLabel: "Select a language",
  },
  hindi: {
    namePlaceholder: "अपना नाम दर्ज करें",
    agePlaceholder: "उम्र",
    phonePlaceholder: "फोन नंबर",
    languageLabel: "भाषा चुनें",
  },
  marathi: {
    namePlaceholder: "तुमचे नाव भरा",
    agePlaceholder: "वय",
    phonePlaceholder: "फोन नंबर",
    languageLabel: "भाषा निवडा",
  },
};

const OnboardingFirst = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("english"); // Default to English
  const [items, setItems] = useState([
    { label: "English", value: "english" },
    { label: "हिंदी", value: "hindi" }, // Hindi in Hindi script
    { label: "मराठी", value: "marathi" }, // Marathi in Marathi script
  ]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [placeholders, setPlaceholders] = useState(translations[value]); // Initialize with English translations

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      name,
      age,
      phoneNumber,
      language: value,
    }));
  }, [name, age, phoneNumber, value]);

  useEffect(() => {
    // Update the placeholders/text when language changes
    setPlaceholders(translations[value]);
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={name}
          style={styles.input}
          placeholder={placeholders.namePlaceholder} // Use translated placeholder
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          value={age}
          style={styles.input}
          placeholder={placeholders.agePlaceholder} // Use translated placeholder
          onChangeText={(text) => setAge(text)}
        />
        <TextInput
          value={phoneNumber}
          style={styles.input}
          placeholder={placeholders.phonePlaceholder} // Use translated placeholder
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>

      <View style={styles.dropDownContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.dropDown}
          dropDownStyle={styles.dropDown}
          labelStyle={styles.dropDownLabel}
          containerStyle={styles.dropDownContainer}
          translation={{
            PLACEHOLDER: placeholders.languageLabel, // Update dropdown label based on language
          }}
          placeholderStyle={{
            color: "lightgrey",
          }}
          dropDownDirection="BOTTOM"
          dropDownContainerStyle={{
            borderColor: "lightgray",
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
};

export default OnboardingFirst;

const styles = StyleSheet.create({
  container: {
    height: 350,
  },
  inputContainer: {
    width: 300,
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "lightgray",
    borderRadius: 10,
    marginTop: 5,
    paddingLeft: 10,
    marginBottom: 20,
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
  dropDownContainer: {
    width: 300,
    borderColor: "lightgray",
    marginTop: 10,
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
        elevation: 5,
      },
    }),
  },
  dropDown: {
    borderWidth: 0,
    borderRadius: 10,
  },
  dropDownLabel: {
    fontSize: 16,
    color: "black",
  },
});
