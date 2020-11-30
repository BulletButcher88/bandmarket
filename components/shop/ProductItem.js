import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../UI/Card'

const ProductItem = props => {
  return (
    <Card style={styles.container}>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        style={styles.imageContainer}
        onPress={props.onSelect}>
        <Image style={styles.image} source={{ uri: props.image }} />
      </TouchableHighlight>
      <LinearGradient
        colors={['transparent', 'white']}
        style={styles.gradient}
      >
        <View style={styles.buttons}>
          {props.children}
        </View>
        <Text style={styles.title}>{props.title}</Text>
      </LinearGradient>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 240,
    margin: 4,
    backgroundColor: 'black',
    borderRadius: 5,
    overflow: 'hidden'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '75%',

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
    fontFamily: 'montserrat',
    fontSize: 14,
    margin: 10,
    color: 'white',
    width: '70%',

  },
  gradient: {
    position: 'absolute',
    backgroundColor: '#363636',
    bottom: 0,
    width: '100%',
    height: '25%',
  },
  buttons: {
    position: 'absolute',
    right: 15,
    bottom: 5,
    width: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  }
})

export default ProductItem