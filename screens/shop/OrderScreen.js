import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import OderItem from '../../components/shop/OrderItem'

const OrderScreen = props => {
  const orders = useSelector(state => state.orders.orders)

  return (
    <FlatList
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

export default OrderScreen;