import React from 'react';
import { FlatList, View, Text, StyleSheet, Alert } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { Ionicons } from '@expo/vector-icons';
import * as productAction from '../../store/actions/product'

const UserProductsScreen = props => {

  const userProducts = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch()

  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes', style: 'destructive', onPress: () => {
          dispatch(productAction.deleteProduct(id))

        }
      }
    ])
  }

  const editProductHandler = id => {
    props.navigation.navigate('EditProducts', { productId: id })
  }

  if (userProducts.length === 0) {
    return (<View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
      <Text style={{ color: 'white', fontSize: 15 }}>No products found. You can start adding items '+'</Text>
    </View>)
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit / Delete</Text>
      <FlatList
        data={userProducts}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={(itemData) =>

          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              editProductHandler(itemData.item.id)
            }}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={18}
              style={{ marginRight: 12 }}
              color="#75cefa"
              onPress={() => {
                editProductHandler(itemData.item.id)
              }}
            />
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={18}
              color="red"
              onPress={() => { deleteHandler(itemData.item.id) }}
            />
          </ProductItem>
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
    headerRight: (() =>
      <HeaderButtons
        HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Add'
          iconName='ios-add'
          onPress={() => {
            navData.navigation.navigate('EditProducts')
          }} />
      </HeaderButtons>
    ),
  }
}

export default UserProductsScreen;