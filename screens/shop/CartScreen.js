import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import * as cartAction from '../../store/actions/cart';
import * as ordersAction from '../../store/actions/orders';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';

const CartScreen = props => {

  const [isLoading, setIsLoading] = useState(false)

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

  const sendOrderHandler = async () => {
    setIsLoading(true)
    await dispatch(ordersAction.addOrder(cartItems, cartAmount))
    setIsLoading(false)
  }

  return (
    <View>
      <View style={styles.screen}>
        <Card style={styles.summary}>
          <Text style={styles.textSummary}>
            {cartAmount > 0 ?
              <Text>Total: $ <Text style={styles.amount}>{cartAmount.toFixed(2)}</Text></Text> :
              <Text style={styles.emptyText}>Cart is empty...</Text>
            }
          </Text>
        </Card>

        {isLoading ? (
          <ActivityIndicator size='small' color='black' />) : (<Button
            title='Pay Now' disabled={cartItems.length === 0}
            onPress={sendOrderHandler} />)
        }

      </View>
      {cartItems.length === 0 ?
        null :
        <View style={styles.screen}>
          <Card style={styles.summary}>
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
          </Card>
        </View>}
    </View>
  )
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Oder'
}

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
    borderRadius: 15,
    backgroundColor: 'white',
  },
  textSummary: {
    fontSize: 20,
    color: 'black',
  },
  amount: {
    fontWeight: 'bold',
    color: '#1cd100'
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