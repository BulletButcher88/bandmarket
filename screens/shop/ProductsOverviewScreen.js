import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import * as cartAction from '../../store/actions/cart'
import * as productActions from '../../store/actions/product'
import { Ionicons } from '@expo/vector-icons';


const ProductOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.availableProducts
  )
  const numCartItems = useSelector(state => state.cart.numberOfItems)

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      await dispatch(productActions.fetchProduct());
      setIsLoading(false);
    }
    loadProduct()
  }, [dispatch])

  const selectItemHandler = (id, title, numCartItems) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
      badge: numCartItems && numCartItems > 0 ? numCartItems : null
    })
  }
  const badgeAlert = (numCartItems) => {
    props.navigation.setParams({ badge: numCartItems })
  }

  useEffect(() => {
    badgeAlert(numCartItems)
  }, [numCartItems])

  if (isLoading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size='large' color='white' />
      </View>
    )
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
              selectItemHandler(itemData.item.id, itemData.item.title, numCartItems);
            }}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-eye' : 'ios-eye'}
              size={18}
              color="grey"
              style={{ marginRight: 12 }}
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title)
              }}
            />
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={18}
              color="grey"
              onPress={() => {
                dispatch(cartAction.AddToCart(itemData.item));
                badgeAlert(numCartItems + 1)
              }}
            />
          </ProductItem>
        } />
    </View>
  )
}

ProductOverviewScreen.navigationOptions = navData => {
  const alertData = navData.navigation.getParam('badge')
  const alert = alertData ? alertData : null
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
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
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
