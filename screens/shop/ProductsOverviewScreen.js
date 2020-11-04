import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import * as cartAction from '../../store/actions/cart'
import { Ionicons } from '@expo/vector-icons';


const ProductOverviewScreen = props => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.availableProducts)

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    })
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
              selectItemHandler(itemData.item.id, itemData.item.title)
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
                dispatch(cartAction.AddToCart(itemData.item))
              }}
            />
          </ProductItem>
        } />
    </View>
  )
}

ProductOverviewScreen.navigationOptions = navData => {
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

})

export default ProductOverviewScreen;
