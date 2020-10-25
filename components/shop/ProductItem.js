import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ProductItem = props => {

  const { price } = props.price

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.image }} />
      </View>
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
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 380,
    margin: 10,
  },
  imageContainer: {
    flex: 1,
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    marginVertical: 4,
    marginHorizontal: 10,

  },
  details: {
    width: '100%',
    height: '20%'
  },
  actions: {
    height: '10%',
    flexDirection: 'row',
    alignSelf: 'auto',
    justifyContent: 'center',
  }
})

export default ProductItem