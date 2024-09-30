import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const BankPage = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: "https://kapps.kotak.com/kotakXpress/xpress/xpress-home.action?pid=ProPVRdc1&utm_source=website&utm_medium=organic&utm_term=SA_HeroBanner",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BankPage;
