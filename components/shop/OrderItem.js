import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OderItem = props => {
  return (
    <View style={styles.screen}>
      <Text style={styles.date}>{props.date}</Text>
      <View style={styles.summary}>
        {props.items.map((item) =>
          <View style={styles.orderItems}>
            <Text>{item.quantity}</Text>
            <Text>{item.productTitle}</Text>
            <Text>${item.sum}</Text>
          </View>
        )}
        <Text style={styles.totalCost}><Text>TOTAL{'  '}</Text>${props.totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
    shadowColor: 'black',
    shadowOpacity: 0.30,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 15,
  },
  summary: {
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    paddingTop: 20,
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: 'white',
  },
  orderItems: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
  totalCost: {
    margin: 16,
    textAlign: 'right',
    fontWeight: 'bold'

  },
  date: {
    margin: 4,
    color: 'grey',
    textAlign: 'right'
  }
})

export default OderItem