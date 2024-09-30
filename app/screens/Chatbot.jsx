import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for the send icon

const API_KEY = "AIzaSyDqHqA1AG2wdmi3rU5BSzs1b6A9pNdALjw"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export default function App() {
  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    // User's message
    const userMessage = { type: "user", text: inputText };
    setChatMessages([...chatMessages, userMessage]);

    try {
      // Call the Generative Language API to get a response
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: "prompt" + inputText }],
            },
          ],
        }),
      });

      const data = await response.json();
      const cleanedText = data?.candidates[0]?.content?.parts[0]?.text.replace(
        /[^\w\s]/gi,
        ""
      );
      // Extract the bot's reply from the response
      const botReply = cleanedText || "Sorry, I could not generate a response.";

      // Add bot's message to the chat
      const botMessage = { type: "bot", text: botReply };

      setChatMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error calling the API:", error);
      const botMessage = { type: "bot", text: "Sorry, something went wrong." };
      setChatMessages((prevMessages) => [...prevMessages, botMessage]);
    }

    setInputText(""); // Clear the input field
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={styles.chatContainer}>
        {chatMessages.length > 0 ? (
          chatMessages.map((message, index) => (
            <View key={index} style={styles[message.type]}>
              <Text>{message.text}</Text>
            </View>
          ))
        ) : (
          <Text
            style={{
              alignSelf: "center",
              fontSize: 40,
              fontWeight: "bold",
              color: "#3FA2F6",
              marginTop: 200,
            }}
          >
            Welcome to the chatbot
          </Text>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatContainer: {
    flex: 1,
    marginTop: 50,
    marginBottom: 10,
    padding: 10,
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    maxWidth: "80%",
  },
  bot: {
    alignSelf: "flex-start",
    backgroundColor: "#F1F0F0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    maxWidth: "80%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
});
