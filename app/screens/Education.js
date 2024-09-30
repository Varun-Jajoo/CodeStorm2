import React, { useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../App";

const Education = () => {
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);

  return (
    <ScrollView bounces={false} style={styles.container}>
      <LinearGradient
        colors={["#3FA2F6", "#7CF5FF"]}
        style={styles.gradientBackground}
      >
        <Image
          source={require("../assets/school.png")}
          style={styles.backgroundImage}
        />
      </LinearGradient>
      <View style={styles.bottomup}></View>
      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <Pressable style={[styles.statBox, styles.elevationStyle]}>
            <Image
              source={require("../assets/rank-svgrepo-com.png")}
              style={styles.statIcon}
            />
            <Text style={styles.statText}>Rank</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Utilize")}
            style={[styles.statBox, styles.elevationStyle]}
          >
            <Image
              source={require("../assets/dollar-bag-svgrepo-com.png")}
              style={styles.statIcon}
            />
            <Text style={styles.statText}>{userData.points} Points</Text>
          </Pressable>
        </View>

        <View style={styles.coursesHeader}>
          <Text style={styles.coursesTitle}>Courses</Text>
          <Text style={styles.seeAllText}>See all</Text>
        </View>

        <View style={styles.coursesList}>
          <CourseCard
            title="Basics of Finance"
            progress={userData.level / 5}
            icon={require("../assets/attend-class-svgrepo-com.png")}
            onPress={() => navigation.navigate("Popup")}
            color="#bde0fe"
          />
          <CourseCard
            title="Scam Prevention"
            progress={1 / 5}
            icon={require("../assets/alert-rhombus-fill-svgrepo-com.png")}
            color="#a2d2ff"
          />
          <CourseCard
            title="Entrepreneurship Guide"
            progress={1 / 5}
            icon={require("../assets/finance-svgrepo-com.png")}
            color="#ade8f4"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const CourseCard = ({ title, progress, icon, onPress, color }) => (
  <Pressable
    style={[
      styles.courseCard,
      styles.elevationStyle,
      { backgroundColor: color },
    ]}
    onPress={onPress}
  >
    <Image source={icon} style={styles.courseIcon} />
    <View style={styles.courseInfo}>
      <Text style={styles.courseTitle}>{title}</Text>
      <Progress.Bar
        borderColor="transparent"
        unfilledColor="white"
        color="#3FA2F6"
        progress={progress}
        width={150}
        height={10}
        borderRadius={20}
        style={styles.progressBar}
      />
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF7FF",
  },
  gradientBackground: {
    height: 300,
    width: "100%",
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    opacity: 1,
  },
  bottomup: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    top: 250,
    height: 50,
    width: "100%",
    backgroundColor: "#EEF7FF",
  },
  content: {
    backgroundColor: "#EEF7FF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#70d6ff",
    height: 100,
    width: "48%",
    borderRadius: 20,
  },
  statIcon: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  statText: {
    fontWeight: "600",
    color: "#023e8a",
  },
  coursesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  coursesTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#023e8a",
  },
  seeAllText: {
    fontSize: 16,
    color: "#0096c7",
    textDecorationLine: "underline",
  },
  coursesList: {
    paddingBottom: 40,
  },
  courseCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  courseIcon: {
    height: 60,
    width: 60,
    marginRight: 20,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#023e8a",
    marginBottom: 10,
  },
  progressBar: {
    marginTop: 10,
  },
  elevationStyle: Platform.select({
    ios: {
      shadowColor: "black",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    android: {
      elevation: 6,
    },
  }),
});

export default Education;
