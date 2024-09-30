import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import React, { useState, useContext } from "react";
import { UserContext } from "../App";

const PersonalFirst = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [cards, setCards] = useState([
    {
      title: "Gifts",
      img: require("../assets/gift_548509.png"),
      selected: false,
      spent: 0,
    },
    {
      title: "Food",
      img: require("../assets/fast-food_737967.png"),
      selected: false,
      spent: 0,
    },
    {
      title: "Clothes",
      img: require("../assets/laundry_2954918.png"),
      selected: false,
      spent: 0,
    },
    {
      title: "Education",
      img: require("../assets/education_3976625.png"),
      selected: false,
      spent: 0,
    },
    {
      title: "Leisure",
      img: require("../assets/haptic_2362310.png"),
      selected: false,
      spent: 0,
    },
    {
      title: "Toiletries",
      img: require("../assets/commodity_2974036.png"),
      selected: false,
      spent: 0,
    },
    {
      title: "Savings",
      img: require("../assets/piggy-bank_1511168.png"),
      selected: false,
      spent: 0,
    },
    {
      title: "Technology",
      img: require("../assets/technology_4365271.png"),
      selected: false,
      spent: 0,
    },
    {
      title: "Transport",
      img: require("../assets/transportation_995260.png"),
      selected: false,
      spent: 0,
    },
  ]);

  const colors = [
    "#AEC6CF",
    "#98FB98",
    "#E6E6FA",
    "#FFDAB9",
    "#87CEEB",
    "#FFFF99",
    "#F7CAC9",
    "#BCE27F",
    "#0e6994",
  ];

  const handlePress = (i) => {
    const updatedCards = [...cards];
    updatedCards[i].selected = !cards[i].selected;
    setCards(updatedCards);

    const selectedCards = updatedCards.filter((card) => card.selected);
    const updatedSpend = selectedCards.map((card) => ({
      title: card.title,
      spent: card.spent,
    }));

    setUserData((prevData) => ({
      ...prevData,
      spend: updatedSpend,
    }));
  };

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
      }}
    >
      <Text style={{ paddingTop: 30, color: "grey", fontSize: 25 }}>
        What do you spend on?
      </Text>
      <Text style={{ paddingTop: 20, fontSize: 18, color: "grey" }}>
        Select all that apply
      </Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {cards.map((card, index) => (
          <Pressable
            key={index}
            style={[
              styles.card,
              { backgroundColor: card.selected ? colors[index] : "white" },
            ]}
            onPress={() => handlePress(index)}
          >
            <Image source={card.img} style={{ height: 70, width: 70 }} />
            <Text style={{ fontFamily: "Poppins", fontSize: 13 }}>
              {card.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default PersonalFirst;

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
    height: 400,
  },
  card: {
    width: Dimensions.get("window").width * 0.23,
    height: 100,
    backgroundColor: "white",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
    borderRadius: 15,
    flexDirection: "column",
  },
});
