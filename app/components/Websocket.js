import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WebSocketComponent() {
  const [message, setMessage] = useState("Connecting to WebSocket...");

  useEffect(() => {
    // Use the ngrok URL for the WebSocket connection
    const socketUrl = "ws://225a-103-246-224-118.ngrok-free.app"; // Replace with the correct ngrok URL

    // Create a new WebSocket connection
    const socket = new WebSocket(socketUrl);

    // Connection opened
    socket.onopen = () => {
      console.log("WebSocket connection opened");
      setMessage("WebSocket connection opened");
    };

    // Listen for messages
    socket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      setMessage(event.data);
    };

    // Handle errors
    socket.onerror = (error) => {
      console.error("WebSocket error:", error.message);
      setMessage(`WebSocket error: ${error.message}`);
    };

    // Connection closed
    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event.reason);
      setMessage(`WebSocket connection closed: ${event.reason}`);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      display: "none",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    margin: 10,
  },
});
