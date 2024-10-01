import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Loan = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;

    if (principal > 0 && rate > 0 && term > 0) {
      const payment =
        (principal * rate * Math.pow(1 + rate, term)) /
        (Math.pow(1 + rate, term) - 1);
      setMonthlyPayment(payment.toFixed(2));
    }
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
            <Text style={styles.resultAmount}>${monthlyPayment}</Text>
          </View>
        )}
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
