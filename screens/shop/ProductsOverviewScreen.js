import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import * as cartAction from '../../store/actions/cart'
import { Ionicons } from '@expo/vector-icons';


const ProductOverviewScreen = props => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.availableProducts)
  const badgeNum = useSelector(state => state.cart.items)
  const alert = Object.keys(badgeNum).length

  const selectItemHandler = (id, title, alert) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
      badge: alert ? alert + 1 : null
    })
  }
  const badgeAlert = (alert) => {
    props.navigation.setParams({ badge: alert + 1 })
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginVertical: 8 }}
        data={products}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={itemData =>
          <ProductItem
            title={itemData.item.title}
            price={itemData.item.price}
            image={itemData.item.imageUrl}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title, alert);
            }}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-eye' : 'ios-eye'}
              size={20}
              color="grey"
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title)
              }}
            />
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={20}
              color="grey"
              onPress={() => {
                dispatch(cartAction.AddToCart(itemData.item));
                badgeAlert(alert)
              }}
            />
          </ProductItem>
        } />
    </View>
  )
}

ProductOverviewScreen.navigationOptions = navData => {
  const alert = navData.navigation.getParam('badge')
  return {
    headerTitle: 'Products',
    headerLeft: (() =>
      <HeaderButtons
        HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.toggleDrawer()
          }} />
      </HeaderButtons>
    ),
    headerRight: (() =>
      <HeaderButtons
        HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName='ios-cart'
          onPress={() => {
            navData.navigation.navigate('Cart')
          }} />
        {alert ?
          <View style={styles.notification}>
          </View> : null}
      </HeaderButtons>
    )
  }
};

const styles = StyleSheet.create({
  price: {
    color: 'pink'
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
  notification: {
    height: 12,
    width: 12,
    backgroundColor: 'red',
    position: 'absolute',
    right: 4,
    borderRadius: 10
  }
})

export default ProductOverviewScreen;
