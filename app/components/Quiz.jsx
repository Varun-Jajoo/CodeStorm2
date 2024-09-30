import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { UserContext } from "../App";
import { quizData1, quizData2, quizData3, quizData4 } from "./Quizdata";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

export default function Quiz({ setquiz }) {
  const [ques, setQues] = useState(0);
  const [score, setScore] = useState(0);
  const [clickopt, setClickOpt] = useState(null);
  const [optionStyle, setOptionStyle] = useState({});
  const { userData, setUserData } = useContext(UserContext);
  const navigation = useNavigation();
  const [quizData, setQuizData] = useState(quizData1);

  useEffect(() => {
    if (userData.level === "1") {
      setQuizData(quizData1);
    } else if (userData.level === 2) {
      setQuizData(quizData2);
    } else if (userData.level === 3) {
      setQuizData(quizData3);
    } else {
      setQuizData(quizData4);
    }
  }, []);
  const nextQues = () => {
    let set = false;
    if (clickopt === quizData[ques].correctAnswer) {
      setScore(score + 1);
      set = true;
    } else {
      setUserData((prev) => ({
        ...prev,
        wrongQuestion: [...prev.wrongQuestion, quizData[ques].question],
      }));
    }

    if (ques < quizData.length - 1) {
      setQues(ques + 1);
      setClickOpt(null);
      setOptionStyle({});
    } else {
      setUserData((prev) => ({
        ...prev,
        progress: {
          ...prev.progress,
          bof: {
            ...prev.progress.bof,
            quiz: true,
          },
        },
      }));
      const goBackWithDelay = () => {
        setTimeout(() => {
          navigation.navigate("Complete", { score: set ? score + 1 : score });
        }, 500);
      };
      goBackWithDelay();
    }
  };
  return (
    <SafeAreaView style={styles.quizContainer}>
      <View style={{ gap: 10, alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>All about Loan</Text>
        <Text style={{ textAlign: "center", fontWeight: 600 }}>
          Level : {userData.level}
        </Text>
        <Progress.Bar
          borderColor="transparent"
          unfilledColor="white"
          color="rgb(59,198,84)"
          progress={ques / quizData.length}
          width={300}
          height={10}
          borderRadius={20}
          style={{ marginTop: 5, borderWidth: -5 }}
        />
      </View>
      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          alignItems: "center",
          height: "100%",
          marginTop: 20,
          width: "100%",
        }}
      >
        <Image
          source={quizData[ques].img}
          style={{ width: 130, height: 130, marginTop: 20 }}
        />
        <View style={styles.ques}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Question {ques + 1}
          </Text>
          <Text style={{ fontSize: 19, fontWeight: "600" }}>
            {quizData[ques].question}
          </Text>
        </View>
        <View style={styles.options}>
          {quizData[ques].options.map((option, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={[styles.optionButton, optionStyle[i]]}
                onPress={() => {
                  setClickOpt(i);
                  setOptionStyle((prevStyle) => ({
                    ...prevStyle,
                    [i]: {
                      backgroundColor:
                        i === quizData[ques].correctAnswer ? "green" : "red",
                    },
                  }));
                }}
                disabled={clickopt !== null}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 999,
                    backgroundColor: "lightpink",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: 600 }}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <Text style={{ flex: 1 }}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={nextQues}>
          <Text style={{ textAlign: "center" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  quizContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  ques: {
    paddingHorizontal: 40,
    marginTop: 20,
    width: 400,
    gap: 10,
  },
  options: {
    marginVertical: 20,
  },
  optionButton: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    width: 350,
    backgroundColor: "#ededed",
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nextButton: {
    backgroundColor: "lightblue",
    padding: 15,
    margin: 20,
    borderRadius: 5,
    width: 100,
  },
});
