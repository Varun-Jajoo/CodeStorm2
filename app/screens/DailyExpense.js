import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
// import { useUserContext } from "../UserContext";
import axios from "axios";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";



const DailyExpense = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [data, setData] = useState();
  const { user, setUser } = useUserContext();
  console.log("data" + user.id, user.data);
  const [selectedTab, setSelectedTab] = useState(true);
  const [recommend, setRecommend] = useState(true);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let headersList = {
  //         Accept: "/",
  //         "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       };
  //       let reqOptions = {
  //         url: `https://log-b.vercel.app/api/user-data/?user_id=${user.id}`,
  //         method: "GET",
  //         headers: headersList,
  //       };

  //       let response = await axios.request(reqOptions);
  //       console.log(response.data);
  //       setUser({ ...user, data: response.data });
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/text/generation",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiN2E0ODk0MjktZGIwMS00YzMyLTgwNmYtZmI3YzgyMzkzMWYzIiwidHlwZSI6ImFwaV90b2tlbiJ9.zb2xQc9BJybAGp0EX3fDuDjtvTB-_Uqe5NZ16wDW9Hg",
    },
    data: {
      providers: "openai",
      text: 
         `give recommendation if i am 50-60 yrs old and i drink 1 liter of water and sleep 6 hrs and mood is happy in points of 1-2 lines`,
       
      temperature: 0.3,
      max_tokens: 50,
    },
  };

  const handleQuestionSubmit = async () => {
    axios
    .request(options)
    .then((response) => {
      console.log(response.data);
      setData(response.data);
      setAnswer(response.data.openai.generated_text)
      // setRecommend(false)
    })
    .catch((error) => {
      console.error(error);
    });
  };
  const handlesubmit =()=>{
    navigation.navigate("Map")
  }
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View
        style={{
          paddingTop:30,
          height: "100%",
          flexDirection: "column",
        }}
      >
      {/* <Header style={{position:"absolute",top:0,left:0,bottom:0,right:0,zIndex:99}}/> */}

        <View
          style={{
            height: "51%",
            width: "100%",
            backgroundColor: "#b7d9e2",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            position: "relative",
            bottom: 60,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingTop: 70,
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                gap: 10,
                borderRadius: 99,
                backgroundColor: "white",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Pressable
                onPress={() => setSelectedTab(true)}
                style={[
                  styles.tabButton,
                  {
                    borderBottomWidth: selectedTab ? 2 : 0,
                    borderBottomColor: "#5c93aa",
                    height: 22,
                  },
                ]}
              >
                <Text style={{ paddingBottom: 5 }}>Days</Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedTab(false)}
                style={[
                  styles.tabButton,
                  {
                    borderBottomWidth: !selectedTab ? 2 : 0,
                    borderBottomColor: "#5c93aa",
                    height: 22,
                  },
                ]}
              >
                <Text style={{ paddingBottom: 5 }}>Weeks</Text>
              </Pressable>
            </View>
            <View
              style={{
                borderRadius: 99,
                backgroundColor: "#5c93aa",
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <EvilIcons name="location" size={30} color="#f0fcfe" onPress={handlesubmit}/>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20,
            }}
          >
            <AnimatedCircularProgress
              size={160}
              rotation={0}
              width={15}
              fill={37}
              tintColor="#5c93aa"
              onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor="#f0fcfe"
            />
          </View>
          <Text
            style={{
              textAlign: "center",
              paddingTop: 20,
              color: "#5c93aa",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            17% increase from yesterday
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            position: "relative",
            top: -40,
            paddingHorizontal: 10,
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                height: 110,
                backgroundColor: "lightblue",
                borderRadius: 15,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Text style={{ fontSize: 19 }}>Water</Text>
                <Pressable
                  style={{
                    height: 25,
                    width: 25,
                    backgroundColor: "black",
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 19,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    +
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  alignItems: "baseline",
                }}
              >
                <Text style={{ fontSize: 35 }}>1</Text>
                <Text> of 2 liters</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <View
              style={{
                height: 110,
                backgroundColor: "pink",
                borderRadius: 15,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Text style={{ fontSize: 19 }}>Sleep</Text>
                <Pressable
                  style={{
                    height: 25,
                    width: 25,
                    backgroundColor: "black",
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 19,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    +
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  alignItems: "baseline",
                }}
              >
                <Text style={{ fontSize: 35 }}>6</Text>
                <Text> of 8 Hours</Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 10,
            height: 230,
            backgroundColor: "#F1F1F1",
            borderRadius: 20,
            padding: 10,
            marginTop: -20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 600 }}>
            Recommendations for you
          </Text>
          {recommend ? (
            <>
              <Pressable onPress={handleQuestionSubmit} >
                <Text>Recommend</Text>
              </Pressable>
              <Text>Click above to get AI personalized
                {answer}
              </Text>
            </>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 10,
                  gap: 10,
                }}
              >
                <View
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 10,
                    backgroundColor: "#85bcc7",
                  }}
                ></View>
                <View
                  style={{
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Text style={{ fontSize: 17, fontWeight: 700 }}>Milk</Text>
                  <Text>Rich in calcium</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 10,
                  gap: 10,
                }}
              >
                <View
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 10,
                    backgroundColor: "#85bcc7",
                  }}
                ></View>
                <View
                  style={{
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Text style={{ fontSize: 17, fontWeight: 700 }}>Milk</Text>
                  <Text>Rich in calcium</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 10,
                  gap: 10,
                }}
              >
                <View
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 10,
                    backgroundColor: "#85bcc7",
                  }}
                ></View>
                <View
                  style={{
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Text style={{ fontSize: 17, fontWeight: 700 }}>Milk</Text>
                  <Text>Rich in calcium</Text>
                </View>
              </View>
            </>
          )}
        </View>
        <Text
          style={{
            textAlign: "center",
            position: "absolute",
            top: 127,
            right: "37.5%",
            fontSize: 80,
            color: "#5c93aa",
            fontWeight: "bold",
          }}
        >
          37
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DailyExpense;

const styles = StyleSheet.create({
  tabButton: {
    alignItems: "center",
  },
});