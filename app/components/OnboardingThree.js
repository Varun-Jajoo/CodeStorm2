import { StyleSheet, Text, View } from "react-native";
import React, { useState,useEffect,useContext } from "react";
import CheckBox from "./CheckBox";
import { UserContext } from "../App";

const OnboardingThree = () => {
  const {userData,setUserData} = useContext(UserContext);
  const [financialGoals, setFinancialGoals] = useState([
    {
      question: "Support my family",
      ans: false,
    },
    {
      question: "Start a business",
      ans: false,
    },
    {
      question: "Build my house",
      ans: false,
    },
    {
      question: "Make investments",
      ans: false,
    },
    {
      question: "Make an emergency fund",
      ans: false,
    },
  ]);

  const handleCheckBoxChange = (index) => {
    const updatedGoals = [...financialGoals];
    updatedGoals[index].ans = !updatedGoals[index].ans;
    setFinancialGoals(updatedGoals);
    const selectedGoals = updatedGoals.filter((goal) => goal.ans);

  setUserData((prevUserData) => ({
    ...prevUserData,
    goals: selectedGoals.map((goal) => goal.question),
  }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>
          We will take a quiz to determine the best financial quiz for you!
        </Text>
        <Text
          style={{
            textAlign: "center",
            
            fontSize: 18,
            marginBottom: 20,
          }}
        >
          What are your financial goals ?
        </Text>
        {financialGoals.map((goal, index) => (
          <CheckBox
            key={index}
            onPress={() => handleCheckBoxChange(index)}
            title={goal.question}
            isChecked={goal.ans}
          />
        ))}
      </View>
    </View>
  );
};

export default OnboardingThree;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: "center",
    height: 350,
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
});
