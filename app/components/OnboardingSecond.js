import React, { useState } from "react";
import { StyleSheet, Text, View,Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { UserContext } from "../App";
import { useContext,useEffect } from "react";

const OnboardingSecond = () => {
  const {userData,setUserData} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
  ]);

  useEffect(()=>{
    setUserData((prevUserData) => ({
      ...prevUserData,
      dependents:value,
    }))
  
  },[value])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>
          We will take a quiz to determine the best financial quiz for you!
        </Text>
        <Text style={styles.text}>Number of Dependents</Text>
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
              PLACEHOLDER: "Select no. of family members",
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
    </View>
  );
};

export default OnboardingSecond;

const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    alignItems: "center", 
    height:350
  },
  content: {
    width: "80%", 
  },
  text: {
    textAlign: "center",
    //fontWeight: 600,
    fontSize: 18,
    marginBottom: 30,
  },
  dropDownContainer: {
    width: "100%",
  },
  dropDown: {
    borderWidth: 0,
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
  dropDownLabel: {
    fontSize: 16,
    color: "black",
  },
});
