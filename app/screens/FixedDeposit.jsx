import { StyleSheet, Text, View, TextInput, Platform, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CheckBox from '../components/CheckBox';
import { BarChart } from 'react-native-chart-kit';

const FixedDeposit = () => {
  const [rcard, setRcard] = useState('');

  const data = {
    labels: ["15 months", "3 years","Tax Saver(5 years)",""],
    datasets: [
      {
        data: [7.1, 7, 7,6]
      }
    ]
  };

  const screenWidth = 350; // Define your desired screen width
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    yAxisLabel: '₹',
    yAxisSuffix: '', // Remove the default suffix
    min: 0, // Set the minimum value for the y-axis
    max: 3, // Set the maximum value for the y-axis
    stepSize: 3, // Set the step size for the y-axis labels
  };
  

  return (
    <ScrollView>
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 100 }}>Deposit Amount</Text>
      <TextInput
        style={styles.tinput}
        value={rcard}
        placeholder="Amount to be Deposited"
        onChangeText={(e) => setRcard(e)}
      />
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text>Standard FD</Text>
        <Text>Money Multiplier</Text>
      </View>
      <View>
        <Text>Interest rates</Text>
        <BarChart
          style={{}}
          data={data}
          width={screenWidth}
          height={370}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          yAxisLabel=''
          yAxisSuffix= '%' // Remove the default suffix
          min = {0} // Set the minimum value for the y-axis
          max = {3}
        />
      </View>
      <View>
<Text>Select FD Plan</Text>
<Text>15 months</Text>
<Text>3 yeras</Text>
<Text>5 yeras</Text>
</View>
      <View>
<Text>Interest payout</Text>
<Text>On Maturity</Text>
<Text>Monthly</Text>
<Text>Quaterly</Text>

<TouchableOpacity ><Text>Submit</Text></TouchableOpacity>


      </View>
    </View>
    </ScrollView>
  );
}

export default FixedDeposit;

const styles = StyleSheet.create({
  tinput: {
    width: '90%',
    height: 50,
    borderColor: 'lightgray',
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
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
});
