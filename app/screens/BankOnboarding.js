import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Platform,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BankOnboarding = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigation = useNavigation();
  const [aadharImg, setAadharImg] = useState(null);
  const [panImg, setPanImg] = useState(null);
  const [aadhar, setAadhar] = useState();
  const [pan, setPan] = useState();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setAadharImg(result.assets[0].uri);
    }
  };
  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPanImg(result.assets[0].uri);
    }
  };
  const handlePress = () => {
    setUserData((prev) => ({
      ...prev,
      aadhar,
      pan,
    }));
    navigation.navigate("bo");
  };
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: 600, padding: 20 }}>
          Welcome, {userData.name}
        </Text>
        <Pressable onPress={handlePress}>
          <AntDesign
            style={{ paddingRight: 20 }}
            name="arrowright"
            size={24}
            color="black"
          />
        </Pressable>
      </View>

      <Text
        style={{
          fontSize: 20,
          fontWeight: 500,
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        Start by entering your pan and adhaar card number
      </Text>
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10,
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter Aadhar Card Number"
            onChangeText={(text) => setAadhar(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Pan Card Number"
            onChangeText={(text) => setPan(text)}
          />
          <Pressable
            style={{
              height: 190,
              width: "90%",
              borderColor: "gray",
              borderWidth: 6,
              borderStyle: "dotted",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={pickImage}
          >
            {!aadharImg ? (
              <>
                <Text style={{ color: "grey", fontSize: 50 }}>+</Text>
                <Text style={{ color: "grey", fontSize: 18 }}>
                  Click to add your Aadhar Card
                </Text>
              </>
            ) : (
              <>
                <Text>
                  <Entypo name="images" size={50} color="grey" />
                </Text>
                <Text style={{ color: "grey", fontSize: 18 }}>
                  Click to view your Aadhar Card
                </Text>
              </>
            )}

            {/* {aadharImg && (
              <Image
                source={{ uri: aadharImg }}
                style={{ width: 200, height: 190 }}
              />
            )} */}
          </Pressable>
          <Pressable
            style={{
              height: 190,
              width: "90%",
              borderColor: "gray",
              borderWidth: 6,
              borderStyle: "dotted",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
            onPress={pickImage2}
          >
            {!panImg ? (
              <>
                <Text style={{ color: "grey", fontSize: 50 }}>+</Text>
                <Text style={{ color: "grey", fontSize: 18 }}>
                  Click to add your Pan Card
                </Text>
              </>
            ) : (
              <>
                <Text>
                  <Entypo name="images" size={50} color="grey" />
                </Text>
                <Text style={{ color: "grey", fontSize: 18 }}>
                  Click to view your Pan Card
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankOnboarding;

const styles = StyleSheet.create({
  input: {
    width: "90%",
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
});
