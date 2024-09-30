import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  ImageBackground,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const SavingsAccount = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EEF7FF",
        height: "100%",
      }}
    >
      <ScrollView style={{ display: "flex" }}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageBackground
            source={require("../assets/zeroBG.jpg")}
            style={styles.topCard}
          >
            <View style={styles.overlay} />
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("BankPage")}>
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 50 }}
                >
                  Open a Savings Bank {""} Account
                </Text>
                <Text style={{ color: "white", fontSize: 20, marginTop: 10 }}>
                  Start Saving Today
                </Text>
                <Text style={{ color: "white", fontSize: 17, marginTop: 10 }}>
                  Enjoy the benefits of a savings account.
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={styles.rockbottom}>
            <View
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pressable
                onPress={() => navigation.navigate("BankPage")}
                style={{
                  backgroundColor: "#0096c7",
                  height: 150,
                  width: 170,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../assets/savings.png")}
                  style={{ width: 40, height: 40, margin: 10 }}
                />
                <Text
                  style={{
                    color: "darkblue",
                    marginLeft: 10,
                    fontWeight: "600",
                  }}
                >
                  Savings Bank Account
                </Text>
                <Text
                  style={{
                    color: "darkblue",
                    margin: 10,
                    opacity: 0.5,
                    fontSize: 12,
                  }}
                >
                  Open a Savings Bank Account and start saving today
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("Scheme")}
                style={{
                  backgroundColor: "#48cae4", // Pastel yellow
                  height: 150,
                  width: 170,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../assets/doc.png")}
                  style={{ width: 40, height: 40, margin: 10 }}
                />
                <Text
                  style={{ color: "brown", marginLeft: 10, fontWeight: "600" }}
                >
                  Online Application
                </Text>
                <Text
                  style={{
                    color: "brown",
                    margin: 10,
                    opacity: 0.5,
                    fontSize: 12,
                  }}
                >
                  Online application for Account Opening
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("Savings")}
                style={{
                  backgroundColor: "#70d6ff", // Pastel green
                  height: 150,
                  width: 170,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../assets/mobile.png")}
                  style={{ width: 40, height: 40, margin: 10 }}
                />
                <Text
                  style={{
                    color: "darkgreen",
                    marginLeft: 10,
                    fontWeight: "600",
                  }}
                >
                  Mobile Banking
                </Text>
                <Text
                  style={{
                    color: "darkgreen",
                    margin: 10,
                    opacity: 0.5,
                    fontSize: 12,
                  }}
                >
                  Access mobile banking services with your account
                </Text>
              </Pressable>
              <View
                style={{
                  backgroundColor: "#AFEEEE", // Pastel blue
                  height: 150,
                  width: 170,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../assets/bank.png")}
                  style={{ width: 40, height: 40, margin: 10 }}
                />
                <Text style={{ marginLeft: 10, fontWeight: "600" }}>
                  Account Services
                </Text>
                <Text style={{ margin: 10, opacity: 0.5, fontSize: 12 }}>
                  Explore various account services for your Savings Bank Account
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavingsAccount;

const styles = StyleSheet.create({
  topCard: {
    borderRadius: 20,
    resizeMode: "contain",
    height: 300,
    padding: 20,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity as needed
  },
  rockbottom: {
    height: 350,
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    marginTop: 20,
  },
});
