import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, Alert, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import OderItem from '../../components/shop/OrderItem'

import * as orderActions from '../../store/actions/orders'

const OrderScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const orders = useSelector(state => state.orders.orders)

  const dispatch = useDispatch()

  const loadOrders = useCallback(async () => {
    setError(null)
    setIsRefreshing(true)
    try {
      await dispatch(orderActions.fetchOrders())
    } catch (err) {
      setError(err.message)
    }
    setIsRefreshing(false)
  }, [dispatch, setError, setIsLoading])

  useEffect(() => {
    setIsLoading(true)
    loadOrders().then(() => {
      setIsLoading(false)
    })
  }, [dispatch])


  if (isLoading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size='large' color="black" />
      </View>
    )
  }

  if (error) {
    Alert.alert('Something is wrong', error, [{ type: 'OK' }])
  }

  if (orders.length === 0) {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
      <Text style={{ fontSize: 15 }}>No orders found.</Text>
    </View>)
  }

  return (
    <FlatList
      onRefresh={loadOrders}
      refreshing={isRefreshing}
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData =>
        <OderItem
          items={itemData.item.items}
          totalAmount={itemData.item.totalAmount}
          date={itemData.item.readableDate} />
      } />
  )
}


OrderScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: (() =>
      <HeaderButtons
        HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.toggleDrawer()
          }} />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default OrderScreen;