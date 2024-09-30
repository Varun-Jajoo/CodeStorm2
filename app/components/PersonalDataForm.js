import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

const PersonalDataForm = () => {
  const [formData, setFormData] = useState({
    level: "",
    name: "",
    age: "",
    phn_num: "",
    depend: "",
    area: "",
    lst_mnth_sav: "",
    ann_inc: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    // Send the data to your backend server
    axios
      .post(" https://f156-103-173-245-53.ngrok-free.app", formData)
      .then((response) => {
        // Handle success, e.g., show a success message
        console.log("Data sent successfully:", response.data);
      })
      .catch((error) => {
        // Handle error, e.g., display an error message
        console.error("Error:", error);
      });
  };

  // Common input style
  const inputStyle = {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  };

  return (
    <View style={styles.container}>
      <Text style={{fontFamily:"Poppins"}}>Personal Data</Text>
      <TextInput
        placeholder="Level"
        style={inputStyle}
        value={formData.level}
        onChangeText={(text) => handleChange("level", text)}
      />
      <TextInput
        placeholder="Name"
        style={inputStyle}
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        placeholder="Age"
        style={inputStyle}
        value={formData.age}
        onChangeText={(text) => handleChange("age", text)}
      />
      <TextInput
        placeholder="Phone Number"
        style={inputStyle}
        value={formData.phn_num}
        onChangeText={(text) => handleChange("phn_num", text)}
      />
      <TextInput
        placeholder="Dependents"
        style={inputStyle}
        value={formData.depend}
        onChangeText={(text) => handleChange("depend", text)}
      />
      <TextInput
        placeholder="Area"
        style={inputStyle}
        value={formData.area}
        onChangeText={(text) => handleChange("area", text)}
      />
      <TextInput
        placeholder="Last Month Savings"
        style={inputStyle}
        value={formData.lst_mnth_sav}
        onChangeText={(text) => handleChange("lst_mnth_sav", text)}
      />
      <TextInput
        placeholder="Annual Income"
        style={inputStyle}
        value={formData.ann_inc}
        onChangeText={(text) => handleChange("ann_inc", text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});

export default PersonalDataForm;
