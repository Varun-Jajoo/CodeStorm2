import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity ,Platform} from 'react-native';
import { Slider } from '@react-native-assets/slider';

const Transfer = () => {
  const [rcard, setRcard] = useState('');
  const [sliderValue, setSliderValue] = useState(0);

  const handleValueChange = (value) => {
    const absoluteValue = Math.round(value);
    setSliderValue(absoluteValue);
  };
  const handleSlidingStart = (value) => {
    // This function is called when the slider is pressed
    console.log('Sliding started:', value);
  };

  const handleSlidingComplete = (value) => {
    // This function is called when the slider press is released
    console.log('Sliding completed:', value);
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Receiver's Card Details</Text>
        <TextInput
          style={styles.tinput}
          value={rcard}
          placeholder="Enter Receiver's card details"
          onChangeText={(e) => setRcard(e)}
        />
        <View style={styles.amountContainer}>
          <Text>Amount to be paid</Text>
          <Text>{sliderValue}</Text>
          <Slider
             value={sliderValue}
             minimumValue={0}
             maximumValue={1200}
             step={1}
             minimumTrackTintColor="grey"
             maximumTrackTintColor="grey"
             thumbTintColor="darkcyan"
             vertical={false}
             onValueChange={handleValueChange}
             onSlidingStart={handleSlidingStart}
             onSlidingComplete={handleSlidingComplete}
            style={{ width: 320 }}
          />
        
        <TouchableOpacity style={styles.btn}><Text>Transfer {sliderValue}</Text></TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height:300
  },
  tinput: {
    width: '90%',
    height: 50,
    borderColor: 'lightgray',
    borderRadius: 10,
    marginTop: 5,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: 'white',
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
  amountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn:{
    height:55,
    width:"70%",
    padding:10,
    display:"flex",
    borderRadius:12,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#F1C93B"
  }
});

export default Transfer;
