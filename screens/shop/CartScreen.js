import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'


const CartScreen = props => {
  const cartAmount = useSelector(state => state.cart.totalAmount)
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productTitle: state.cart.items[key].productTitle,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      })
    }
    return transformedCartItems
  })


  return (
    <View>
      <View style={styles.screen}>
        <Text style={styles.summary}>
          <Text style={styles.textSummary}>
            Total: <Text style={styles.amount}>${cartAmount.toFixed()}</Text>
          </Text>
        </Text>
        <Button title='Pay Now' disabled={cartItems.length === 0} />
      </View>
      {cartItems.length === 0 ? null : <View style={styles.screen}>
        <Text style={styles.summary}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={itemData => {
              console.log(itemData.item)
              const { productTitle } = itemData.item
              return (
                <Text style={styles.itemTitle}>{console.log(productTitle)} empty?</Text>
              )
            }}
          />
        </Text>
      </View>}
    </View>
  )
};


const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOpacity: 0.30,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 15,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  textSummary: {
    fontSize: 20,
    color: 'black'
  },
  amount: {
    fontWeight: 'bold',
    color: '#ffed21'
  },
  itemTitle: {
    flex: 1,
    fontSize: 20,
    backgroundColor: 'white',
    height: 20
  }
})

export default CartScreen;