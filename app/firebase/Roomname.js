import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Pressable,
  Image,
} from "react-native";
import Chat from "./Chat";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomModal } from "react-native-modals";
import { ModalFooter } from "react-native-modals";
import { ModalButton } from "react-native-modals";
import { ModalTitle } from "react-native-modals";
import { SlideAnimation } from "react-native-modals";
import { ModalContent } from "react-native-modals";

import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firebase-config.js";

const forumTopics = [
  "Budgeting and Saving",
  "Wealth Building",
  "Financial Planning",
  "Estate Planning",

  "Finance Education and Courses",
  "Career Advice",

  "Digital Banking",

  "Economics and Global Finance",
  "Payment Solutions",
  "Trade and Commerce",
];

const colors = [
  "#FFA726", // Orange
  "#66BB6A", // Green
  "#42A5F5", // Blue
  "#FF7043", // Red

  "#FFD54F", // Yellow
  "#FFC107", // Amber

  "#26C6DA", // Cyan

  "#9575CD", // Purple
  "#4DB6AC", // Teal
  "pink", // Blue Gray
];
const backgroundColors = [
  "#F5FFFA", // mint

  "#E6F0FF", // lavender
  "#D8BFD8", // thistle
  "#DDA0DD", // plum
  "#FFB6C1", // pink
  "#FF7F50", // coral
  "#AFEEEE", // paleturquoise
  "#FFDAB9", // peach
  "#FFE4C4", // bisque
];

const Roomname = () => {
  const [room, setRoom] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("");
  const [forums, setForums] = useState("");
  const [time, setTime] = useState("");
  const ref = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);

  useLayoutEffect(() => {
    const meetCollection = collection(db, "meet");

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(meetCollection);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setMeetings(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
    setReloadKey(reloadKey + 1);
  }, []);
  const handleTopicPress = (topicIndex) => {
    setRoom(forumTopics[topicIndex]);
  };
  const handlePress = async () => {
    setModalVisible(!modalVisible);
    console.log(meetingName, date, mode, forums, time);
    const meetCollection = collection(db, "meet");

    const meetingData = {
      date,
      forums,
      meetingName,
      mode,
      time,
    };

    try {
      const docRef = doc(meetCollection);
      await setDoc(docRef, meetingData);
      console.log("Document added with ID:", docRef.id);

      // Update the meetings state with the new data
      setMeetings([...meetings, meetingData]);

      // Reset form fields
      setMeetingName("");
      setDate("");
      setMode("");
      setForums("");
      setTime("");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <ScrollView style={{ height: 900, paddingTop: 30 }}>
      <Text style={{ padding: 20, fontSize: 31, fontWeight: 600 }}>Chat</Text>
      {room ? (
        <View style={{ backgroundColor: colors[forumTopics.indexOf(room)] }}>
          <Text>
            <Chat room={room} setRoom={setRoom} />
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {forumTopics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleTopicPress(index)}
                style={{
                  backgroundColor: colors[index],
                  padding: 10,
                  marginVertical: 5,
                  borderRadius: 88,
                  marginHorizontal: 5,
                  opacity: 0.8,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>#{topic}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text
            style={{
              padding: 20,
              marginTop: 20,
              fontWeight: 600,
              fontSize: 31,
            }}
          >
            Meet
          </Text>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "90%",
                height: 100,
                marginRight: 8,
                borderRadius: 10,
              }}
            >
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  borderRadius: 20,
                  height: 80,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
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
                }}
              >
                <Text
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    fontSize: 20,
                    color: "gray",
                  }}
                >
                  +
                </Text>
                <Text style={{ fontSize: 20, color: "gray" }}>
                  {" "}
                  Tap to add a meet{" "}
                </Text>
              </Pressable>
            </View>
          </View>
          <ScrollView
            style={{ margin: 20 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {meetings ? (
              meetings.map((meet, id) => (
                <View
                  key={id}
                  style={{
                    height: 170,
                    width: 200,
                    backgroundColor: backgroundColors[id],
                    borderRadius: 20,
                    marginRight: 20,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontWeight: 700, bottom: 10, margin: 10 }}>
                    {meet.meetingName}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      margin: 5,
                    }}
                  >
                    <Image
                      source={require("../assets/profile-round-1342-svgrepo-com.png")}
                      style={{
                        width: 15,
                        height: 15,
                        marginRight: 10,
                        marginLeft: 5,
                      }}
                    />
                    <Text style={{ marginRight: "50" }}>Shreyans Jain</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      margin: 5,
                    }}
                  >
                    <Image
                      source={require("../assets/hashtag-svgrepo-com.png")}
                      style={{
                        width: 15,
                        height: 15,
                        marginRight: 10,
                        marginLeft: 5,
                      }}
                    />
                    <Text style={{ marginRight: "50" }}>{meet.forums}</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      margin: 5,
                    }}
                  >
                    <Image
                      source={require("../assets/camera-svgrepo-com.png")}
                      style={{
                        width: 15,
                        height: 15,
                        marginRight: 10,
                        marginLeft: 5,
                      }}
                    />
                    <Text>{meet.mode}</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      margin: 5,
                    }}
                  >
                    <Image
                      source={require("../assets/clock-two-svgrepo-com.png")}
                      style={{
                        width: 15,
                        height: 15,
                        marginRight: 10,
                        marginLeft: 5,
                      }}
                    />
                    <Text>
                      {meet.date}, {meet.time}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <></>
            )}
          </ScrollView>
        </View>
      )}
      <BottomModal
        swipeThreshold={200}
        onBackDropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Add"
              textStyle={{ color: "white" }}
              onPress={handlePress}
              style={{
                marginBottom: 20,
                marginHorizontal: 40,
                backgroundColor: "#0079FF",
                borderRadius: 100,
                marginTop: 10,
                borderWidth: 0,
              }}
            />
          </ModalFooter>
        }
        modalTitle={
          <ModalTitle
            title="Add Deatils for Saving Goal"
            textStyle={{ fontSize: 20, paddingBottom: 1 }}
            hasTitleBar={false}
          />
        }
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 300 }}>
          <TextInput
            value={meetingName}
            placeholder="Meeting Name"
            style={styles.textInput}
            onChangeText={(text) => setMeetingName(text)}
          />
          <TextInput
            value={date}
            placeholder="Date (DD/MM/YYYY)"
            style={styles.textInput}
            onChangeText={(text) => setDate(text)}
          />
          <TextInput
            value={mode}
            placeholder="Mode (Online/Offline)"
            style={styles.textInput}
            onChangeText={(text) => setMode(text)}
          />
          <TextInput
            value={forums}
            placeholder="Forums (#Wealth Building #Career Advice)"
            style={styles.textInput}
            onChangeText={(text) => setForums(text)}
          />
          <TextInput
            value={time}
            placeholder="Time eg. (12:00 AM)"
            style={styles.textInput}
            onChangeText={(text) => setTime(text)}
          />
        </ModalContent>
      </BottomModal>
    </ScrollView>
  );
};

export default Roomname;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    paddingLeft: 10,
  },
});
