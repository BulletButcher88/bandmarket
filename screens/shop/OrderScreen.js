import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'

const OrderScreen = props => {
  const orders = useSelector(state => state.orders.orders)

  return <FlatList data={orders} keyExtractor={item => item.id} renderItem={itemData =>
    <Text>{itemData.item.totalAmount}</Text>
  } />
}
OrderScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Order',
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