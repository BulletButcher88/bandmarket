import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import * as cartAction from '../../store/actions/cart'
import CartItem from '../../components/shop/CartItem'


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
    return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1)
  })
  const dispatch = useDispatch();


  return (
    <View>
      <View style={styles.screen}>
        <Text style={styles.summary}>
          <Text style={styles.textSummary}>
            {cartAmount > 0 ?
              <Text style={styles.amount}>Total: ${cartAmount.toFixed(2)}</Text> :
              <Text style={styles.emptyText}>Cart is empty...</Text>
            }
          </Text>
        </Text>
        <Button title='Pay Now' disabled={cartItems.length === 0} />
      </View>
      {cartItems.length === 0 ? null : <View style={styles.screen}>
        <Text style={styles.summary}>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.productId}
            renderItem={itemData => {
              return (
                <CartItem
                  productTitle={itemData.item.productTitle}
                  quantity={itemData.item.quantity}
                  sum={itemData.item.sum}
                  style={styles.itemTitle}
                  onRemove={() => {
                    dispatch(cartAction.RemoveFromCart(itemData.item.productId))
                  }}
                  addItem={() => {
                    dispatch(cartAction.PlusOneToCart(itemData.item))
                  }}
                />
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
    color: 'black',
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
  },
  emptyText: {
    color: 'red',
    opacity: .4
  }
})

export default CartScreen;