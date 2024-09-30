import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../App";

import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

const BankOnboardingSecond = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [check, setCheck] = useState(false);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "ICICI", value: "ICICI" },
    { label: "Kotak", value: "Kotak" },
    { label: "RBL", value: "RBL" },
  ]);
  console.log(userData);
  const handlePress = () => {
    setUserData((prev) => ({
      ...prev,
      bankForm: true,
    }));
    navigation.navigate("Bank");
  };
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 27, fontWeight: 600, padding: 20 }}>
        Select the Banks
      </Text>
      <View style={{ alignItems: "center" }}>
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
              PLACEHOLDER: "Enter Bank Name",
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
        <TextInput style={styles.input} placeholder="Enter the IFCS code" />
        {check && (
          <Pressable
            style={styles.continueButton}
            onPress={() => {
              setCheck(false);
              Alert.alert("An OTP is sent to you");
            }}
          >
            <Text style={styles.continueButtonText}>Check IFCS Code</Text>
          </Pressable>
        )}
        {!check && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter the otp sent to you"
            />
            <Pressable style={styles.continueButton} onPress={handlePress}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BankOnboardingSecond;

const styles = StyleSheet.create({
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
        shadowOpacity: 0.2,
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
  input: {
    width: 300,
    height: 50,
    borderColor: "lightgray",
    borderRadius: 10,
    marginTop: 50,
    paddingLeft: 10,
    backgroundColor: "white",
    zIndex: -1,
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
  continueButton: {
    backgroundColor: "black",
    width: 300,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 60,
    zIndex: -1,
  },
  continueButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Poppins",
  },
});
