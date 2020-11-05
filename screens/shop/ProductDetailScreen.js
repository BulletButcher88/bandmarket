import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Button,
  Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartAction from '../../store/actions/cart'
import { LinearGradient } from 'expo-linear-gradient';
import SlideProductItem from '../../components/shop/SlideProductItem'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId')
  const product = useSelector(state =>
    state.products.availableProducts.find(product =>
      product.id === productId))

  const numCartItems = useSelector(state => state.cart.numberOfItems)
  const badgeAlert = (numCartItems) => {
    props.navigation.setParams({ badge: numCartItems + 1 })
  }
  const dispatch = useDispatch()

  const { title, price, description, imageUrl, ownerId } = product

  return (
    <ScrollView>
      <View>
        <View style={styles.containerStyle}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <View style={styles.priceSticker}>
              <Text style={styles.price}>${price.toFixed(0)}</Text>
            </View>
          </View>
          <View style={styles.action}>
            <Button
              color='pink'
              title='Add to Cart'
              onPress={() => {
                dispatch(cartAction.AddToCart(product));
                badgeAlert(numCartItems);
              }} />
          </View>
        </View>
      </View>

      <LinearGradient
        colors={['transparent', 'rgba(52, 52, 52, 0.18)', 'transparent']}
        style={styles.moreItemText}>
        <Text style={styles.moreTextStyle}>Others you might like...</Text>
      </LinearGradient>
      <SlideProductItem productId={productId} />
    </ScrollView>
  )
}

ProductDetailScreen.navigationOptions = navData => {
  const alert = navData.navigation.getParam('badge')
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
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
}

const styles = StyleSheet.create({
  priceSticker: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderColor: 'rgba(255, 168, 168, 0.8)',
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    right: 10,
    top: 10,
    borderWidth: 5
  },
  price: {
    color: 'white',
    fontSize: 22,
    position: 'relative',
    textAlign: 'center',
    top: "30%",
  },
  title: {
    fontFamily: 'open-san',
    fontSize: 20,
    marginVertical: 6,
    marginHorizontal: 10,
    height: 50,
    textAlign: 'center'
  },
  description: {
    fontSize: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    height: 60
  },
  containerStyle: {
    shadowColor: 'black',
    shadowOpacity: 0.30,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    height: 550,
    margin: 10,
  },
  imageContainer: {
    height: 350,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  action: {
    height: 60,
    justifyContent: 'center'
  },
  moreItemText: {
    height: 30,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 4 }
  },
  moreTextStyle: {
    color: 'white',
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center'
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

export default ProductDetailScreen