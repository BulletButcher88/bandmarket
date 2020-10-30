import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.titleText}>{props.productTitle}</Text>
      </Text>
      <View style={styles.itemDataQuantity}>
        <TouchableOpacity
          onPress={props.addItem}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            size={27}
            color='black' />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{props.quantity}</Text>
        <TouchableOpacity
          onPress={props.onRemove}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-remove' : 'ios-remove'}
            size={27}
            color='pink' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cartItem: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  itemData: {
    width: '79%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  itemDataQuantity: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10
  },
  quantityText: {
    fontFamily: 'open-san',
    color: '#888',
    fontSize: 21,
  },
  titleText: {
    color: '#e07b7b',
    fontSize: 17,
  },
  amount: {
    margin: 15
  }

})

export default CartItem