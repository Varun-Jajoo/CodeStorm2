import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";

const PersonalSecond = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [spent, setSpent] = useState("");
  const [savings, setSavings] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Rural", value: "Rural" },
    { label: "Semi-Urban", value: "Semi-urban" },
    { label: "Urban", value: "Urban" },
    { label: "Metropolitian", value: "Metropolitian" },
  ]);

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      salary: spent,
    }));
    setUserData((prevUserData) => ({
      ...prevUserData,
      savings,
    }));

    setUserData((prevUserData) => ({
      ...prevUserData,
      city: value,
    }));
  }, [value]);
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingTop: 30,
      }}
    >
      <Image
        source={require("../assets/money.jpg")}
        style={{ height: 100, width: 100 }}
      />
      <Text style={{ fontSize: 25, textAlign: "center" }}>
        How much do you make per month ?
      </Text>
      <TextInput
        value={spent}
        onChangeText={(text) => setSpent(text)}
        style={styles.input}
        placeholder=" ₹ Enter Amount "
      />
      <Text style={{ fontSize: 25, textAlign: "center" }}>
        How much do you save per month ?
      </Text>
      <TextInput
        value={savings}
        onChangeText={(text) => setSavings(text)}
        style={styles.input}
        placeholder=" ₹ Enter Amount "
      />
      <Text style={{ fontSize: 25, textAlign: "center" }}>
        Which Type of city you live ?
      </Text>
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
  );
};

export default PersonalSecond;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderColor: "lightgray",
    borderRadius: 10,
    marginTop: 30,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "#171717",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  dropDownContainer: {
    width: "100%",
    paddingTop: 10,
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
