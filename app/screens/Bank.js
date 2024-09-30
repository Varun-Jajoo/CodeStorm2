import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState, useContext } from "react";
import CreditCard from "../components/Mastercard";
import Transfer from "../components/Transfer";
import { UserContext } from "../App";
import { useNavigation } from "@react-navigation/native";
import BankOnboarding from "./BankOnboarding";
import { LinearGradient } from "expo-linear-gradient";

const Bank = () => {
  const [transfer, settransfer] = useState(false);
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext);
  return (
    <>
      {userData.bankForm ? (
        <ScrollView bounces={false} style={{ display: "flex" }}>
          <LinearGradient
            colors={["#3FA2F6", "#7CF5FF"]}
            style={{ height: 350, width: "100%" }}
          >
            <TouchableOpacity
              style={styles.wallet}
              onPress={() => {
                settransfer(false);
              }}
            >
              <CreditCard />
            </TouchableOpacity>
          </LinearGradient>
          <View style={styles.bottomup}></View>
          <View style={styles.rockbottom}>
            <View
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <Pressable
                onPress={() => navigation.navigate("Zero")}
                style={{
                  backgroundColor: "#bde0fe",
                  height: 200,
                  width: 170,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../assets/bank-svgrepo-com.png")}
                  style={{ width: 40, height: 40, margin: 10 }}
                />
                <Text
                  style={{ color: "darkblue", marginLeft: 10, fontWeight: 600 }}
                >
                  Zero Balance Account
                </Text>
                <Text
                  style={{
                    color: "darkblue",
                    margin: 10,
                    opacity: 0.5,
                    fontSize: 12,
                  }}
                >
                  Open an Account with no minimum balance
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("Scheme")}
                style={{
                  backgroundColor: "#a2d2ff",
                  height: 200,
                  width: 170,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../assets/document-svgrepo-com.png")}
                  style={{ width: 40, height: 40, margin: 10 }}
                />
                <Text
                  style={{ color: "#0096c7", marginLeft: 10, fontWeight: 600 }}
                >
                  Schema Doc Generation
                </Text>
                <Text
                  style={{
                    color: "#023e8a",
                    margin: 10,
                    opacity: 0.5,
                    fontSize: 12,
                  }}
                >
                  Hassle-free application for eligible Yojnas
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("Savings")}
                style={{
                  backgroundColor: "#ade8f4",
                  height: 200,
                  width: 170,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../assets/money-check-dollar-svgrepo-com.png")}
                  style={{ width: 40, height: 40, margin: 10 }}
                />
                <Text
                  style={{
                    color: "#2a9d8f",
                    marginLeft: 10,
                    fontWeight: 600,
                  }}
                >
                  Personal Saving Account
                </Text>
                <Text
                  style={{
                    color: "#2a9d8f",
                    margin: 10,
                    opacity: 0.5,
                    fontSize: 12,
                  }}
                >
                  Open a Savings Account online
                </Text>
              </Pressable>
              <View
                style={{
                  backgroundColor: "#70d6ff",
                  height: 200,
                  width: 170,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../assets/bill-dollar-left-svgrepo-com.png")}
                  style={{ width: 40, height: 40, margin: 10 }}
                />
                <Text style={{ marginLeft: 10, fontWeight: 600 }}>
                  Account Tracker
                </Text>
                <Text style={{ margin: 10, opacity: 0.5, fontSize: 12 }}>
                  Track your Due and Paid Bills
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <BankOnboarding />
      )}
    </>
  );
};

export default Bank;

const styles = StyleSheet.create({
  wallet: {
    height: 350,
    paddingBottom: 30,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  bottomup: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    top: 300,
    height: 50,
    width: "100%",
    backgroundColor: "#EEF7FF",
  },
  rockbottom: {
    zIndex: 99,
    height: 450,
    backgroundColor: "#EEF7FF",
    display: "flex",
    alignItems: "center",
    paddingTop: 20,
    justifyContent: "start",
  },
});
