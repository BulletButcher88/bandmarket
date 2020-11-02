import React from 'react';
import { FlatList, View, Text } from 'react-native';
import ProductItem from '../../components/shop/ProductItem'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts)
  console.log(userProducts)
  return (
    <View style={{ flex: 1 }}>
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
          />
        } />
    </View>
  )
}

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