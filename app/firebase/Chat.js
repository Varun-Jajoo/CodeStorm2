import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import {
  addDoc,
  collection,
  serverTimestamp,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase-config";
import { UserContext } from "../App";

const Chat = (props) => {
  const { room, setRoom } = props;
  const { userData, setUserData } = useContext(UserContext);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = collection(db, "messages");

  // Load initial messages and set up real-time updates
  useEffect(() => {
    const q = query(messageRef, orderBy("createAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedMessages = [];
      querySnapshot.forEach((doc) => {
        updatedMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(updatedMessages);
    });

    return () => {
      // Unsubscribe from real-time updates when the component unmounts
      unsubscribe();
    };
  }, []);

  const handleSubmit = async () => {
    if (text === "") return;

    await addDoc(messageRef, {
      text: text,
      createAt: serverTimestamp(),
      user: userData.name,
      room,
    });

    setText("");
  };

  const styles = StyleSheet.create({
    chatContainer: {
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    messageContainer: {
      marginBottom: 16,
      maxWidth: "80%",
      alignSelf: "flex-start",
    },
    username: {
      fontSize: 12,
      color: "#888",
      marginBottom: 4,
    },
    messageBubble: {
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 10,
      maxWidth: "100%",
    },
    userMessage: {
      backgroundColor: "#DCF8C6",
      alignSelf: "flex-end",
    },
    otherMessage: {
      backgroundColor: "#E8E8E8",
    },
    messageText: {
      fontSize: 16,
      color: "#333",
    },
  });

  return (
    <View style={{ height: 700, width: "100%" }}>
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: "#5356FF",
          borderRadius: 25,
          marginTop: 15,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          alignSelf: "flex-start",
          maxWidth: "100%",
        }}
        onPress={() => setRoom(false)}
      >
        <Text
          style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
        >
          ← Go Back
        </Text>
      </TouchableOpacity>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.username}>{item.user}</Text>
            <View
              style={[
                styles.messageBubble,
                item.user === userData.name
                  ? styles.userMessage
                  : styles.otherMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        )}
        inverted={true}
        contentContainerStyle={styles.chatContainer}
      />
      <Pressable
        style={{
          width: 400,
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 10,
            marginTop: 10,
            width: 350,
            marginLeft: 5,
          }}
        >
          <TextInput
            style={{
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 20,
              width: 400,
              marginBottom: 40,
              position: "relative",
            }}
            onChangeText={(text) => setText(text)}
            value={text}
            placeholder="Type your message here"
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <Text
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: 15,
                borderRadius: 20,
                width: 100,
              }}
            >
              Send
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Implement image upload functionality here
              console.log("Upload image button pressed");
            }}
            style={{ position: "absolute", top: 0, right: 80 }}
          >
            {/* <Image
              source={require("../assets/imageUpload.png")}
              style={{ width: 24, height: 24, padding: 10 }}
            /> */}
          </TouchableOpacity>
        </View>
      </Pressable>
    </View>
  );
};

export default Chat;
