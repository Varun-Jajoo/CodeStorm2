import React, { useState,useContext } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { UserContext } from "../App";

const CreditCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const rotation = new Animated.Value(0);
  const rotateY = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handlePress = () => {
    setIsFlipped(!isFlipped);
    Animated.timing(rotation, {
      toValue: isFlipped ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const renderCardFront = () => (
    <View style={styles.flipCardFront}>
      <Text style={styles.heading}>DEBIT CARD</Text>
      <Image
        // source={require('./mastercard-logo.png')}
        style={styles.logo}
      />
      <Image
        source={require('../assets/chip_6404078.png')}
        style={styles.chip}
      />
      <Image
        source={require('../assets/wifi.png')}
        style={styles.contactless}
      />
      <Text style={styles.number}>9759 2484 5269 6576</Text>
      <Text style={styles.validThru}>VALID THRU</Text>
      <Text style={styles.date}>1 2 / 2 4</Text>
      <Text style={styles.name}>{userData.name.toUpperCase()}</Text>
    </View>
  );

  const renderCardBack = () => (
    <View style={styles.flipCardBack}>
      <View style={styles.strip} />
      <View style={styles.mstrip} />
      <View style={styles.sstrip}>
        <Text style={styles.code}>***</Text>
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.flipCard}>
        <Animated.View style={[styles.flipCardInner, { transform: [{ rotateY }] }]}>
          {isFlipped ? renderCardBack() : renderCardFront()}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  flipCard: {
    backgroundColor: 'transparent',
    width: 340,
    height: 204,
    perspective: 1000,
    color: 'white',
    elevation:10
  },
  flipCardInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
  },
  flipCardFront: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    webkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
    backgroundColor: '#171717',
  },
  flipCardBack: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    // webkitBackfaceVisibility: 'hidden',
    // backfaceVisibility: 'hidden',
    borderRadius: 10,
    backgroundColor: '#171717',
    transform: [{ rotateY: '180deg' }],
  },
  heading: {
    position: 'absolute',
    letterSpacing: 0.2,
    fontSize: 14,
    color:"white",
    top: 20,
    left: 208,
  },
  logo: {
    position: 'absolute',
    top: 68,
    left: 117,
    width: 36,
    height: 36,
  },
  chip: {
    position: 'absolute',
    top: 33,
    left: 35,
    width: 50,
    height: 50,
  },
  contactless: {
    position: 'absolute',
    top: 75,
    left: 264,
    width: 20,
    height: 35,
    width:35
  },
  number: {
    position: 'absolute',
    //fontWeight: 'bold',
    color:"white",
    fontSize: 14,
    top: 90,
    left: 20,
  },
  mstrip: {
    position: 'absolute',
    backgroundColor: 'rgb(255, 255, 255)',
    width: 120, 
    height: 20, 
    top: 120, 
    left: 50, 
    borderRadius: 2.5, 
  },
  
  sstrip: {
    position: 'absolute',
    backgroundColor: 'rgb(255, 255, 255)',
    width: 82, 
    height: 20,
    top: 120, 
    left: 205, 
    borderRadius: 2.5, 
  },
  
  validThru: {
    position: 'absolute',
    //fontWeight: 'bold',
    top: 120,
    left:42,
    color:"white",
    fontSize: 13,
    
  },
  date: {
    position: 'absolute',
    //fontWeight: 'bold',
    fontSize: 11,
    color:"white",
    top: 136,
    left: 58,
  },
  name: {
    position: 'absolute',
    color:"white",
    //fontWeight: 'bold',
    fontSize: 12,
    top: 171,
    left: 45,
  },
  strip: {
    position: 'absolute',
    backgroundColor: 'black',
    width: '80%',
    height: 35,
    top: 24,
    left: '10%',
    
  },
  
  code: {
    //fontWeight: 'bold',
    fontSize:16,
    textAlign: 'center',
    margin: 2,
    color: 'black',
  },
});

export default CreditCard;
