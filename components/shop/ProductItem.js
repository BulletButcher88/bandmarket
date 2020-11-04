import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
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
        colors={['transparent', 'black']}
        style={styles.gradient}
      >
        <View style={styles.buttons}>
          {props.children}
        </View>
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
    height: 280,
    margin: 4,
    backgroundColor: 'black',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '74%',

  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    shadowColor: 'grey',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 6,
    shadowRadius: 2,
    elevation: 8,
    fontFamily: 'montserrat-bold',
    fontSize: 12,
    margin: 15,
    color: 'white',
    width: '65%',

  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
  },
  buttons: {
    position: 'absolute',
    right: 0,
    width: '30%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    padding: 10
  }
})

export default ProductItem