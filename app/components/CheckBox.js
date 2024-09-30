import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CheckBox = (props) => {
  const iconName = props.isChecked
    ? "checkbox-marked"
    : "checkbox-blank-outline";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Pressable onPress={props.onPress}>
        <MaterialCommunityIcons name={iconName} size={24} color="#000" />
      </Pressable>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: 325,
    marginTop: 17,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    color: "#000",
    marginLeft: 5,
  },
});
