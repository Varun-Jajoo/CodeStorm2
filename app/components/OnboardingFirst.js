import React, { useState,useContext, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { UserContext } from "../App";


const OnboardingFirst = () => {
  const {userData,setUserData} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "English", value: "english" },
    { label: "Hindi", value: "hindi" },
    { label: "Marathi", value: "marathi" },
  ]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

useEffect(()=>{
  setUserData((prevUserData) => ({
    ...prevUserData,
    name,
  }));
  setUserData((prevUserData) => ({
    ...prevUserData,
    age,
  }));
  setUserData((prevUserData) => ({
    ...prevUserData,
    phoneNumber,
  }));

  setUserData((prevUserData) => ({
    ...prevUserData,
    language:value,
  }))

},[value])
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={name}
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          value={age}
          style={styles.input}
          placeholder="Age"
          onChangeText={(text) => setAge(text)}
        />
        <TextInput
          value={phoneNumber}
          style={styles.input}
          placeholder="Phone Number"
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
            PLACEHOLDER: "Select a language",
          }}
          placeholderStyle={{
            color: "lightgrey",
            //fontWeight: 600,
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
