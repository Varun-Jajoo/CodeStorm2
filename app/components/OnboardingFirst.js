import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
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
    { label: "हिंदी", value: "hindi" },
    { label: "मराठी", value: "marathi" },
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
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
        <View style={styles.dropDownWrapper}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.dropDown}
            dropDownContainerStyle={styles.dropDownContainer}
            placeholder={placeholders.languageLabel} // Use translated label
            placeholderStyle={{ color: "lightgrey" }}
            labelStyle={styles.dropDownLabel}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OnboardingFirst;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    width: 300,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
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
  dropDownWrapper: {
    zIndex: 10, // Ensures dropdown is above other elements
  },
  dropDownContainer: {
    width: 300,
    borderColor: "lightgray",
    borderRadius: 10,
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
