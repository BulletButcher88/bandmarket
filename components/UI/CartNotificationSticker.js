import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const CartNotificationSticker = props => {
  return (
    <View style={styles.notification}>
      <Text style={styles.notificationNumText}>
        {props.children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  notification: {
    height: 15,
    width: 15,
    backgroundColor: 'red',
    position: 'absolute',
    top: -8,
    right: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationNumText: {
    color: 'white',
    fontSize: 11
  }
})

export default CartNotificationSticker;