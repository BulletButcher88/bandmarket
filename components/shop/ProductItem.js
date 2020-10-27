import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';


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
      <LinearGradient
        colors={['rgba(52, 52, 52, 0.7)', 'transparent']}
        style={styles.details} >
        <Text style={styles.title}>{props.title}</Text>
      </LinearGradient>
      <LinearGradient
        colors={['transparent', 'rgba(52, 52, 52, 0.57)', 'rgba(52, 52, 52, 0.7)']}
        style={styles.actions}>
        <Button
          color="#94bdff"
          title="Details"
          onPress={props.onDetail} />
        <Button
          style={{ ...styles.price }}
          color='pink'
          title={`BUY $${props.price.toFixed(0)}`}
          onPress={props.onAddToCart} />
      </LinearGradient>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
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
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 6,
    shadowRadius: 2,
    elevation: 15,
    fontFamily: 'ambit',
    fontSize: 22,
    marginVertical: 4,
    marginHorizontal: 10,
    color: 'white'
  },
  details: {
    overflow: 'hidden',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '18%'
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

export default ProductItem