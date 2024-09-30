import { StyleSheet, Text, View ,Image ,ScrollView} from 'react-native'
import React from 'react'

const Videotut = () => {
  return (
    <ScrollView >
      <Image source={require('../assets/articmap.png')}style={{position:"relative",width:"100%"}} />
    </ScrollView>
  )
}

export default Videotut

const styles = StyleSheet.create({})