import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import * as Progress from "react-native-progress";
import { BottomModal } from "react-native-modals";
import { ModalFooter } from "react-native-modals";
import { ModalButton } from "react-native-modals";
import { ModalTitle } from "react-native-modals";
import { SlideAnimation } from "react-native-modals";
import { ModalContent } from "react-native-modals";

const Home = () => {
  const[display,setdisplay]=useState(true)
  const [goals, setGoals] = useState([]);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalAmount, setNewGoalAmount] = useState("");
  const [newTotalGoalAmount, setNewTotalGoalAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  const addNewGoal = () => {
    setModalVisible(!modalVisible);
    if (newGoalName && newGoalAmount && newTotalGoalAmount) {
      const newGoal = {
        name: newGoalName,
        amount: newGoalAmount,
        total: newTotalGoalAmount,
        progress: parseFloat(newGoalAmount / newTotalGoalAmount),
      };

      setGoals([...goals, newGoal]);
      setNewGoalName("");
      setNewGoalAmount("");
      setNewTotalGoalAmount("");
    }
  };

  const renderGoalCard = ({ item }) => (
    <Pressable style={styles.save1}>
      <ImageBackground>
        <View
          style={{ display: "flex", flexDirection: "column", marginTop: 20 }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/dartboard_1230127.png")}
              style={{ height: 50, width: 50, marginRight: 30 }}
            />
            <View>
              <Text
                style={{
                  color: "black",
                  fontSize: 20,
                  marginRight: 30,
                  textAlign: "left",
                }}
              >
                {item.name}
              </Text>
              <Text>Trust the process</Text>
            </View>
          </View>

          <Progress.Bar
            borderColor="transparent"
            animationType="spring"
            unfilledColor="white"
            color="rgb(59,198,84)"
            progress={item.progress}
            width={255}
            height={18}
            borderRadius={10}
            style={{ marginTop: 20, elevation: 10, borderWidth: -1 }}
          />
          <Text
            style={{
              color: "black",
              fontSize: 16,
              marginRight: 30,
              textAlign: "left",
              marginTop: 20,
            }}
          >
            Balance
          </Text>
          <Text>
            ₹ {item.amount} / ₹ {item.total}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );

  return (
    <>
      <View
        style={{
          display: "flex",
          backgroundColor: "white",
          height: screenHeight,
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/Savings-cuate.png")}
            style={{
              height: 350,
              width: "100%",
              backgroundColor: "#2b6747",
            }}
          />
          <Pressable
            style={styles.savetop}
            onPress={() => {setModalVisible(!modalVisible) 
              setdisplay(false)}}
            
          >
            <Image
              source={require("../assets/wallet-wallet-svgrepo-com.png")}
              style={{ height: 70, width: 80, marginRight: 35, marginTop:5 }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#1b1b1b",
                  fontSize: 20,
                  textAlign: "left",
                }}
              >
                Add a Saving Goal
              </Text>
              <Text style={{ textAlign: "center", color: "#1b1b1b" }}>
                We will keep a Report
              </Text>
            </View>
          </Pressable>
         {display ? <View style={{borderColor:"lightgrey",borderRadius:20,borderWidth:2,height:250,width:350,marginTop:80,display:"flex",justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:30,fontFamily:"Poppins",color:"lightgrey"}}>Add your Financial goals here!</Text></View>:
          <FlatList
            style={{ marginTop: 80 }}
            data={goals}
            renderItem={renderGoalCard}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 180 }}
            showsVerticalScrollIndicator={false}
          />}
        </View>
      </View>
      <BottomModal
        swipeThreshold={200}
        onBackDropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Add"
              textStyle={{ color: "white" }}
              style={{
                marginBottom: 20,
                marginHorizontal: 40,
                backgroundColor: "#0079FF",
                borderRadius: 100,
              }}
              onPress={addNewGoal}
            />
          </ModalFooter>
        }
        modalTitle={
          <ModalTitle
            title="Add Details for Saving Goal"
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
        <ModalContent style={{ width: "100%", height: 200 }}>
          <TextInput
            placeholder="Goal Name"
            value={newGoalName}
            onChangeText={(text) => setNewGoalName(text)}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Amount to be deducted per month"
            value={newGoalAmount}
            onChangeText={(text) => setNewGoalAmount(text)}
            keyboardType="numeric"
            style={styles.textInput}
          />
          <TextInput
            placeholder="Amount required to acheive the goal"
            value={newTotalGoalAmount}
            onChangeText={(text) => setNewTotalGoalAmount(text)}
            keyboardType="numeric"
            style={styles.textInput}
          />
        </ModalContent>
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({
  savetop: {
    height: 100,
    width: "90%",
    backgroundColor: "#98bc62",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 20,
    position: "absolute",
    top: 300,
  },
  save1: {
    height: 200,
    width: 325,
    backgroundColor: "#F1C93B",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 20,
    elevation: 10,
    marginBottom: 10,
  },
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

export default Home;
