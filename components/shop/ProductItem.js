import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ProductItem = props => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.image }} />
      </View>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.price}>{props.price.toFixed(2)}</Text>
      <View style={styles.actions}>
        <Button title="Details" onPress={props.onDetail} />
        <Button title="To cart" onPress={props.onAddToCart} />
      </View>
    </View>
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
    height: 400,
    margin: 10
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '78%'
  },
  title: {
    fontSize: 20,
    marginVertical: 4
  },
  price: {
    fontSize: 10,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

export default ProductItem