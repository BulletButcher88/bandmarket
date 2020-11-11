import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OderItem = props => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.date}>{props.date}</Text>
        {showDetails ?
          props.items.map((item, index) =>
            <View key={index} style={styles.orderItems}>
              <Text style={{ flex: 0.05 }}>{item.quantity}</Text>
              <Text style={{ flex: 0.7 }}>{item.productTitle}</Text>
              <Text style={{ flex: 0.25 }}>${item.sum.toFixed(2)}</Text>
            </View>
          ) : null
        }
        <Text style={styles.totalCost}><Text>TOTAL{'  '}</Text>${Math.round(props.totalAmount.toFixed(2) * 100) / 100}</Text>
        <Button
          title={!showDetails ? 'Details' : 'Hide'}
          onPress={() => {
            setShowDetails((state) => !state);
          }}
          color='pink'
        />
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
    padding: 3
  },
  totalCost: {
    margin: 16,
    textAlign: 'right',
    fontWeight: 'bold'

  },
  date: {
    margin: 16,
    color: 'grey',
    textAlign: 'right'
  }
})

export default OderItem