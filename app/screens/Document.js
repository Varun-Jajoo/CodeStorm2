import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TextInput,
  Platform,
} from "react-native";
import React, { useState, useContext } from "react";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { UserContext } from "../App";
import { LinearGradient } from "expo-linear-gradient";

const Document = () => {
  const { userData } = useContext(UserContext); // Getting data from UserContext
  const [father, setFather] = useState("");
  const [addr, setAddre] = useState("");
  const [occupation, setOccupation] = useState("");

  const generatePdf = async () => {
    const html = `<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>खाता खोलने का फॉर्म</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      .container {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #000;
        font-size: 16px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      table,
      td,
      th {
        border: 1px solid black;
      }
      td {
        padding: 10px;
      }
      .form-title {
        text-align: center;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 20px;
      }
      .form-section {
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="form-title">वित्तीय समावेशन खाता खोलने का फॉर्म</div>

      <div class="form-section">
        <label>शाखा का नाम:</label>
        <span>${userData.branchName || "Pen"}</span><br />
        <label>गांव/शहर:</label>
        <span>${userData.city || ""}</span><br />
        <label>उपजिला/ब्लॉक का नाम:</label>
        <span>${userData.subDistrictBlock || "Pen"}</span><br />
        <label>जिला:</label>
        <span>${userData.district || "Raigad"}</span><br />
        <label>राज्य:</label>
        <span>${userData.state || "Maharashtra"}</span><br />
      </div>

      <div class="form-section">
        <table>
          <tr>
            <td>पूरा नाम</td>
            <td>
              <label>श्री/श्रीमती/कुमारी</label><br />
              <span>${userData.name || ""}</span>
            </td>
          </tr>
          <tr>
            <td>वैवाहिक स्थिति</td>
            <td>
              <span>${userData.maritalStatus || "Unmarried"}</span>
            </td>
          </tr>
          <tr>
            <td>पिता का नाम/पति का नाम</td>
            <td><span>${father}</span></td>
          </tr>
          <tr>
            <td>पता</td>
            <td><span>${addr}</span></td>
          </tr>
          <tr>
            <td>टेलीफोन एवं मोबाइल न.</td>
            <td><span>${userData.phoneNumber || ""}</span></td>
          </tr>
          <tr>
            <td>आधार/ई.आई.डी. न.</td>
            <td><span>${userData.aadhaar || "637293617392"}</span></td>
          </tr>
          <tr>
            <td>पैन न.</td>
            <td><span>${userData.panNumber || "HXOXY7835Q"}</span></td>
          </tr>
          <tr>
            <td>जन्मतिथि</td>
            <td><span>${userData.dob || "1994-07-16"}</span></td>
          </tr>
        </table>
      </div>

      <div class="form-section">
        <table>
          <tr>
            <td>आजीविका</td>
            <td><span>${occupation}</span></td>
          </tr>
          <tr>
            <td>वार्षिक आय</td>
            <td><span>${userData.salary * 12 || ""}</span></td>
          </tr>
          <tr>
            <td>आश्रितों की संख्या</td>
            <td><span>${userData.dependents || ""}</span></td>
          </tr>
        </table>
      </div>

      <div class="form-section">
        <table>
          <tr>
            <td>किसान क्रेडिट कार्ड</td>
            <td>
              <span>${userData.kccEligible === "yes" ? "पात्र" : "नहीं"}</span>
            </td>
          </tr>
        </table>
      </div>

      <div class="form-section">
        <label>घोषणा:</label>
        <p>
          मैं बैंक खाता खोलने के लिए आवेदन करता हूँ और घोषणा करता हूँ कि मेरे
          द्वारा दी गई सभी सूचनाएं सही हैं।
        </p>
      </div>

      <div class="form-section">
        <label>नामांकित व्यक्ति की जानकारी:</label>
        <table>
          <tr>
            <td>नामांकित व्यक्ति का नाम</td>
            <td><span>${father || ""}</span></td>
          </tr>
          <tr>
            <td>संबंध</td>
            <td><span>${userData.relationship || "father"}</span></td>
          </tr>
          <tr>
            <td>आयु</td>
            <td><span>${userData.nomineeAge || "54"}</span></td>
          </tr>
          <tr>
            <td>जन्मतिथि</td>
            <td><span>${userData.nomineeDob || "1974-07-24"}</span></td>
          </tr>
        </table>
      </div>

      <div class="form-section">
        <label>आवेदक के हस्ताक्षर:</label><br />
        <span>${userData.name || ""}</span><br /><br />
        <label>स्थान:</label><br />
        <span>${userData.city || ""}</span><br />
      </div>
    </div>
  </body>
</html>
`;
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });
    await shareAsync(file.uri);
  };

  return (
    <LinearGradient colors={["#3FA2F6", "#7CF5FF"]} style={styles.container}>
      <SafeAreaView
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <Text style={{ paddingVertical: 30, fontSize: 23, fontWeight: 600 }}>
          Enter Your details for form generation
        </Text>
        <TextInput
          value={father}
          style={styles.input}
          placeholder="Enter your father name"
          onChangeText={(text) => setFather(text)}
        />
        <TextInput
          value={occupation}
          style={styles.input}
          placeholder="Enter your occupation"
          onChangeText={(text) => setOccupation(text)}
        />
        <TextInput
          value={addr}
          style={styles.input}
          placeholder="Enter your address"
          onChangeText={(text) => setAddre(text)}
        />

        <Pressable
          style={{
            backgroundColor: "black",
            width: 200,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
          }}
          onPress={generatePdf}
        >
          <Text style={{ color: "white" }}>Generate Document</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Document;

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 50,
    borderColor: "lightgray",
    borderRadius: 10,
    marginTop: 5,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 7,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
