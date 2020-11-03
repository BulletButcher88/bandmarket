import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { Ionicons } from '@expo/vector-icons';


const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit / Delete</Text>
      <FlatList
        data={userProducts}
        keyExtractor={item => item.id}
        renderItem={itemData =>
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onDetail={() => { }}
            onAddToCart={() => { }}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color="#75cefa"
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title)
              }}
            />
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color="red"
              onPress={() => {
                dispatch(cartAction.AddToCart(itemData.item))
              }}
            /></ProductItem>
        } />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 30,

  },
  text: {
    flex: 1,
    color: 'grey',
    fontSize: 18,
    position: 'absolute',
    right: 20,
    top: 10
  }
})

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Products',
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

export default UserProductsScreen;