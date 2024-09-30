import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Bank from "./screens/Bank";
import Education from "./screens/Education";
import Community from "./screens/Community";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import PersonalQuestions from "./screens/PersonalQuestions";
import ExpensesLanding from "./screens/ExpensesLanding";
import DailyExpense from "./screens/DailyExpense";
import Popup from "./components/Popup";
import Quiz from "./components/Quiz";
import LevelCompletion from "./screens/LevelCompletion";
import LearnAndStudy from "./screens/LearnAndStudy";
import Video from "./screens/Video";
import BankOnboardingSecond from "./screens/BankOnboardingSecond";
import Utilize from "./components/Utilize";
import Scheme from "./screens/Scheme";
import Document from "./screens/Document";
import Stock from "./screens/Stock";
import ZeroBalanceAccount from "./screens/ZeroBalance";
import SavingsAccount from "./screens/Savings";
import BankPage from "./screens/BankPage";

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
      style={{
        top: -15,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#e32f45",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );

  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            // position: "absolute",
            // bottom: 25,
            // left: 20,
            // right: 20,
            elevation: 0,
            backgroundColor: "white",
            borderRadius: 15,
            height: 90,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Savings",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("./assets/save-money_1611179.png")}
                  resizeMode="contain"
                  style={{
                    width: 27,
                    height: 27,
                    tintColor: focused ? "#e32f45" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 13,
                    paddingTop: 7,
                  }}
                >
                  Savings
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Bank"
          component={Bank}
          options={{
            tabBarLabel: "Bank",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("./assets/bank_522554.png")}
                  resizeMode="contain"
                  style={{
                    width: 27,
                    height: 27,
                    tintColor: focused ? "#e32f45" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 13,
                    paddingTop: 7,
                  }}
                >
                  Bank
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Education"
          component={Education}
          options={{
            tabBarLabel: "Education",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/graduation-cap_3074058.png")}
                resizeMode="contain"
                style={{
                  width: 27,
                  height: 27,
                  tintColor: focused ? "white" : "white",
                }}
              />
            ),
            tabBarButton: (props) => (
              // Return the CustomTabBarButton component
              <CustomTabBarButton {...props} />
            ),
          }}
        />
        <Tab.Screen
          name="Community"
          component={Community}
          options={{
            tabBarLabel: "Community",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("./assets/bubble-chat_2076218.png")}
                  resizeMode="contain"
                  style={{
                    width: 27,
                    height: 27,
                    tintColor: focused ? "#e32f45" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 13,
                    paddingTop: 7,
                  }}
                >
                  Community
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Expenses"
          component={ExpensesLanding}
          options={{
            tabBarLabel: "Expenses",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("./assets/expenses_5501384.png")}
                  resizeMode="contain"
                  style={{
                    width: 27,
                    height: 27,
                    tintColor: focused ? "#e32f45" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 13,
                    paddingTop: 7,
                  }}
                >
                  Expenses
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Zero"
          component={ZeroBalanceAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Savings"
          component={SavingsAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Personal"
          component={PersonalQuestions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Daily"
          component={DailyExpense}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Complete"
          component={LevelCompletion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Learn"
          component={LearnAndStudy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Video"
          component={Video}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Popup"
          component={Popup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="bo"
          component={BankOnboardingSecond}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Utilize"
          component={Utilize}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Scheme"
          component={Scheme}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Doc"
          component={Document}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Stock"
          component={Stock}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BankPage"
          component={BankPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
