import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';


const CustomActivityIndicator = () => {
  return (
    <View style={styles.screen}>
      <Image source={require('../../assets/rocketman.gif')} style={styles.image} />
    </View>

  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200
  }
})

export default CustomActivityIndicator;