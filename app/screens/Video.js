import React, { useEffect, useContext, useCallback, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { UserContext } from "../App";
import { LinearGradient } from "expo-linear-gradient";

const Video = () => {
  const { userData } = useContext(UserContext);
  const [playing, setPlaying] = useState(false);
  const vid = ["AIOR1x7fPcQ", "OJGUYYUPH_0", "W4hcZe79qS0"];

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video has finished playing!");
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#3FA2F6", "#7CF5FF"]}
        style={styles.gradientHeader}
      >
        <Text style={styles.headerText}>Video Tutorials</Text>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.subHeaderText}>
          Improve your knowledge by learning from your previous mistakes
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {userData.wrongQuestion.map((ques, id) => (
            <View key={id} style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {id + 1}. {ques}?
              </Text>
              <View style={styles.videoContainer}>
                <YoutubePlayer
                  style={{ borderRadius: 10 }}
                  height={200}
                  play={playing}
                  videoId={vid[id]}
                  onChangeState={onStateChange}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Video;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF7FF",
  },
  gradientHeader: {
    height: 150,
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  headerText: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "#023e8a",
  },
  content: {
    flex: 1,
    backgroundColor: "#EEF7FF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  subHeaderText: {
    textAlign: "center",
    fontSize: 16,
    color: "#023e8a",
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  questionContainer: {
    marginBottom: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00b4d8",
    marginBottom: 15,
  },
  videoContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
});
