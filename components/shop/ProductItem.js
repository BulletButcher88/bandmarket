import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProductItem = props => {

  return (
    <View style={styles.container}>

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        style={styles.imageContainer}
        onPress={props.onDetail}>
        <Image style={styles.image} source={{ uri: props.image }} />
      </TouchableHighlight>

      <View style={styles.details}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.actions}>
        <Button title="Details" onPress={props.onDetail} />
        <Button
          style={{ ...styles.price }}
          color='pink'
          title={`BUY $${props.price.toFixed(0)}`}
          onPress={props.onAddToCart} />
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: 'black',
    shadowOpacity: 0.30,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    height: 380,
    margin: 10,
  },
  imageContainer: {
    flex: 1,
    height: '73%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden'
  },
  title: {
    fontSize: 20,
    marginVertical: 4,
    marginHorizontal: 10,
  },
  details: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%'
  },
  actions: {
    height: '12%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

export default ProductItem