import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const CartItem = props => {
  return (
    <View>
      <Text>
        <Text>{props.productTitle}</Text><Text>{props.quantity}</Text>
      </Text>
      <View>
        <Text>{props.sum}</Text>
        <TouchableOpacity
          onPress={props.onRemove}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color='pink' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default CartItem