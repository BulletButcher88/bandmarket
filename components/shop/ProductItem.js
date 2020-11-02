import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const ProductItem = props => {

  return (
    <View style={styles.container}>

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        style={styles.imageContainer}
        onPress={props.onSelect}>
        <Image style={styles.image} source={{ uri: props.image }} />
      </TouchableHighlight>
      <LinearGradient
        colors={['rgba(52, 52, 52, 0.7)', 'transparent']}
        style={styles.actions}>
        <View style={styles.children}>
          {props.children}
        </View>
      </LinearGradient>
      <LinearGradient
        colors={['transparent', 'black']}
        style={styles.details} >
        <Text style={styles.title}>{props.title}</Text>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOpacity: 0.20,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 15,
    backgroundColor: 'white',
    height: 270,
    margin: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 6,
    shadowRadius: 2,
    elevation: 8,
    fontFamily: 'ambit',
    fontSize: 17,
    margin: 15,
    color: 'white',
  },
  details: {
    overflow: 'hidden',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: '23%',
  },
  actions: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '15%',
  },
  children: {
    position: 'absolute',
    right: 0,
    width: '38%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})

export default ProductItem