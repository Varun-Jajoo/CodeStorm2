import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserContext } from "../App";

const genAI = new GoogleGenerativeAI("AIzaSyD66npWWEDp8zXmnI2X9FMPQwDQs6A4NIs");

const Loan = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const { userData, setUserData } = useContext(UserContext);
  const [result, setResult] = useState("");

  const calculateLoan = async () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const geminiResult = await model.generateContent([
      {
        text: `User takes a loan with the following details: Principal: ₹
          ${principal} 
         Interest Rate: 
          ${rate} 
          %, Loan Term: 
          term 
           ${loanTerm}.
          The user's salary is 
          ₹${userData.salary} 
           and the user's savings is 
          ₹${userData.savings}
          interest calculation method should be monthly compunded interest , loan frequency should be monthly
          Give me a Single Line output nothing else output should be precise and on point response like 'If You increase montly installment By ₹ X you can reduce your loan term by Y months considering savings of ₹Z amount and ₹A salary ' `,
      },
    ]);

    if (principal > 0 && rate > 0 && term > 0) {
      const payment =
        (principal * rate * Math.pow(1 + rate, term)) /
        (Math.pow(1 + rate, term) - 1);
      setMonthlyPayment(payment.toFixed(2));
    }
    console.log(geminiResult.response.text());
    setResult(geminiResult.response.text());
  };

  return (
    <LinearGradient colors={["#3FA2F6", "#7CF5FF"]} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Loan Calculator</Text>
        <TextInput
          style={styles.input}
          placeholder="Loan Amount"
          keyboardType="numeric"
          value={loanAmount}
          onChangeText={setLoanAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Interest Rate (%)"
          keyboardType="numeric"
          value={interestRate}
          onChangeText={setInterestRate}
        />
        <TextInput
          style={styles.input}
          placeholder="Loan Term (Years)"
          keyboardType="numeric"
          value={loanTerm}
          onChangeText={setLoanTerm}
        />
        <TouchableOpacity style={styles.button} onPress={calculateLoan}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
        {monthlyPayment && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Monthly Payment:</Text>
            <Text style={styles.resultAmount}>₹{monthlyPayment}</Text>
          </View>
        )}
        <View>
          {result && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{result}</Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0096c7",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    color: "#023e8a",
    marginBottom: 5,
  },
  resultAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#023e8a",
  },
});

export default Loan;
