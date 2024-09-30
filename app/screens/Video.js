import React, {
  useEffect,
  useContext,
  useCallback,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Button, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { UserContext } from "../App";

const Video = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [playing, setPlaying] = useState(false);
  const vid = ["AIOR1x7fPcQ", "OJGUYYUPH_0", "W4hcZe79qS0"];

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  console.log(userData.wrongQuestionId);
  return (
    <SafeAreaView
      style={{
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 30, fontWeight: 700 }}>
          Video Tutorials
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          Imporove you knowledge by learning the things that went wrong during
          previous Level
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {userData.wrongQuestion.map((ques, id) => (
            <View key={id}>
              <Text style={{ paddingBottom: 20, fontSize: 20 }}>
                {id + 1}. {ques} ?
              </Text>
              <View style={{ borderRadius: 10 }}>
                <YoutubePlayer
                  height={250}
                  play={playing}
                  videoId={vid[id]}
                  onChangeState={onStateChange}
                />
                {/* <Button
                  title={playing ? "pause" : "play"}
                  onPress={togglePlaying}
                /> */}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Video;

const styles = StyleSheet.create({});
