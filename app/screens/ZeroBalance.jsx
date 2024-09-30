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
import { LinearGradient } from "expo-linear-gradient";

const ZeroBalanceAccount = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#EEF7FF",
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
            source={require("../assets/Underp.jpg")}
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
              <TouchableOpacity>
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 50 }}
                >
                  Open a Zero Balance Account
                </Text>
                <Text style={{ color: "white", fontSize: 20, marginTop: 10 }}>
                  Start Banking with Zero Deposit
                </Text>
                <Text style={{ color: "white", fontSize: 17, marginTop: 10 }}>
                  Enjoy the benefits of a zero balance account.
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
                onPress={() => navigation.navigate("Zero")}
                style={{
                  backgroundColor: "#4cc9f0", // Light blue
                  height: 200,
                  width: 170,
                  
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../assets/piggy.png")}
                  style={{ width: 40, height: 40, margin: 10 }}
                />
                <Text
                  style={{
                    color: "darkblue",
                    marginLeft: 10,
                    fontWeight: "600",
                  }}
                >
                  Zero Balance account
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
                  backgroundColor: "#0096c7", // Deep blue
                  height: 200,
                  width: 170,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../assets/doc.png")}
                  style={{ width: 40, height: 40, margin: 10 }}
                />
                <Text
                  style={{ color: "white", marginLeft: 10, fontWeight: "600" }}
                >
                  Online Application
                </Text>
                <Text
                  style={{
                    color: "white",
                    margin: 10,
                    opacity: 0.7,
                    fontSize: 12,
                  }}
                >
                  Online application for Account Opening
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("Savings")}
                style={{
                  backgroundColor: "#90e0ef", // Light cyan
                  height: 200,
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
                  backgroundColor: "#a2d2ff", // Light blue
                  height: 200,
                  width: 170,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../assets/bank.png")}
                  style={{ width: 40, height: 40, margin: 10 }}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    fontWeight: "600",
                    color: "darkblue",
                  }}
                >
                  Supported Banks
                </Text>
                <Text
                  style={{
                    margin: 10,
                    opacity: 0.5,
                    fontSize: 12,
                    color: "darkblue",
                  }}
                >
                  Explore various Banks that support zero balance account
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ZeroBalanceAccount;

const styles = StyleSheet.create({
  topCard: {
    borderRadius: 20,
    resizeMode: "contain",
    height: 350,

    padding: 30,
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
    height: 450,
    display: "flex",
    alignItems: "center",
  },
});
