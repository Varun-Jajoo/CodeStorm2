import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import {
  financeInfoCards1,
  financeInfoCards2,
  financeInfoCards3,
  financeInfoCards4,
} from "../data/Learn"; 
const LearnAndStudy = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const [cardColorIndex, setCardColorIndex] = useState(0);

  const cardColors = [
    { backgroundColor: "white", textColor: "black" },
    { backgroundColor: "dodgerblue", textColor: "blue" },
    { backgroundColor: "pink", textColor: "purple" },
    { backgroundColor: "lightgreen", textColor: "darkgreen" },
  ];

  const cards = [...financeInfoCards1, ...financeInfoCards2, ...financeInfoCards3, ...financeInfoCards4];

  const handleNext = () => {
    if (cardIndex < cards.length - 1) {
      setCardIndex(cardIndex + 1);
      // Increment the card color index by 1.
      setCardColorIndex((cardColorIndex + 1) % cardColors.length);
    }
  };

  const handlePrevious = () => {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
      // Decrement the card color index by 1.
      setCardColorIndex((cardColorIndex - 1 + cardColors.length) % cardColors.length);
    }
  };

  const currentCardStyle = cardColors[cardColorIndex];

  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 800,
        }}
      >
        <View
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 230,
            width: 280,
          }}
        >
          <View
            style={{
              display: "flex",
              backgroundColor: currentCardStyle.backgroundColor,
              justifyContent: "center",
              alignItems: "center",
              height: 230,
              width: 280,
              borderWidth: 2,
              borderColor: "black",
              borderRadius: 30,
              zIndex: 99,
              top: 0,
              position: "absolute",
            }}
          >
            <Text style={{ color: currentCardStyle.textColor,fontSize:25,fontFamily:"Poppins" }}>
              {cards[cardIndex].title}
            </Text>
            <Text style={{ color: currentCardStyle.textColor,fontFamily:"Poppins",marginHorizontal:20 }}>
              {cards[cardIndex].content}
            </Text>
          </View>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={{
                display: "flex",
                backgroundColor: cardColors[(cardColorIndex + index + 1) % cardColors.length].backgroundColor,
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                height: 230,
                width: 280,
                borderWidth: 2,
                borderColor: cardColors[(cardColorIndex + index + 1) % cardColors.length].backgroundColor,
                borderRadius: 30,
                zIndex: 9 - index,
                top: (index + 1) * 30,
              }}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handlePrevious}
          disabled={cardIndex === 0}
        >
          <Text>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button1}
          onPress={handleNext}
          disabled={cardIndex === cards.length - 1}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 120,
    padding: 10,
    backgroundColor: "dodgerblue",
    borderRadius: 5,
  },
  button1: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "dodgerblue",
    borderRadius: 5,
  },
});

export default LearnAndStudy;
