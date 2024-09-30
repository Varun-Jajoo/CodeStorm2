import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageComponent = () => {
  const [name, setName] = useState('');
  const [storedName, setStoredName] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('userName', name);
      Alert.alert('Success', 'Name saved successfully');
    } catch (e) {
      Alert.alert('Error', 'Failed to save the name');
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userName');
      if (value !== null) {
        setStoredName(value);
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to retrieve the name');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter your name:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
        placeholder="Enter name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Button title="Save Name" onPress={storeData} />
      <View style={{ marginTop: 20 }}>
        <Text>Stored Name: {storedName}</Text>
      </View>
    </View>
  );
};

export default StorageComponent;
