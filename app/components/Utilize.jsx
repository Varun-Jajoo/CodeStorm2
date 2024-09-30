import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Platform,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Utilize = () => {
  const navigation = useNavigation();
  const elevationStyle = Platform.select({
    ios: {
      shadowColor: "black",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
    },
    android: {
      elevation: 10, // This sets the elevation for Android
    },
    default: {
      // For other platforms, you can set some default styles
      // or leave it empty.
    },
  });

  return (
    <LinearGradient colors={["#3FA2F6", "#7CF5FF"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <Image
            source={require("../assets/family-fishing-cuate.png")}
            style={styles.headerImage}
          />

          <View style={styles.cardsContainer}>
            {[
              {
                title: "Stocks",
                icon: require("../assets/stock.png"),
                onPress: () => navigation.navigate("Stock"),
              },
              {
                title: "Fixed Deposit",
                icon: require("../assets/fixeddeposite.png"),
              },
              {
                title: "Real Estate",
                icon: require("../assets/real.png"),
              },
            ].map((item, index) => (
              <Pressable
                key={index}
                onPress={item.onPress}
                style={[styles.card, elevationStyle]}
              >
                <Image source={item.icon} style={styles.cardIcon} />
                <Text style={styles.cardTitle}>{item.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Utilize;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  headerImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    marginBottom: 30,
  },
  cardsContainer: {
    width: "100%",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  cardIcon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: "Poppins",
    color: "#333",
  },
});
