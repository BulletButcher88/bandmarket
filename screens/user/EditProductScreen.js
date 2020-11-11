import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'

import * as productAction from '../../store/actions/product'

const EditProductScreen = props => {

  const proId = props.navigation.getParam('productId')
  const product = useSelector(state =>
    state.products.availableProducts.find(product => product.id === proId))

  const dispatch = useDispatch();

  const [title, setTitle] = useState(product ? product.title : '')
  const [description, setDescription] = useState(product ? product.description : '')
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : '')
  const [price, setPrice] = useState('')

  const onSubmitHandler = useCallback(() => {
    if (product) {
      dispatch(
        productAction.updateProduct(proId, title, description, imageUrl)
      )
    } else {
      dispatch(
        productAction.createProduct(title, description, imageUrl, +price)
      );
    }
    props.navigation.goBack()
  }, [dispatch, proId, title, description, imageUrl, price])


  useEffect(() => {
    props.navigation.setParams({ submit: onSubmitHandler })
  }, [onSubmitHandler])

  return (
    <ScrollView style={{ flex: 1 }}>
      {product ? <Text style={{ padding: 10, color: 'white', backgroundColor: "#333333" }}>product ID {product ? product.id : null}</Text> : null}

      {product ?
        <View style={styles.previewTopBox}>
          <View style={styles.previewContainer}>
            <ProductItem
              image={product.imageUrl}
              title={product.title}
              price={product.price} >
              <Ionicons
                name={Platform.OS === 'android' ? 'md-eye' : 'ios-eye'}
                size={23}
                color="grey"
              />
              <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color="grey"
              />
            </ProductItem>
          </View>
          <View style={styles.emptySpaceBox}>
            <Text style={styles.previewText}>OTHER PRODUCT</Text>
            <View style={styles.emptySpaceIcons}>
              <Ionicons
                name={Platform.OS === 'android' ? 'md-eye' : 'ios-eye'}
                size={23}
                color="grey"
                style={{ paddingBottom: 3 }}
              />
              <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color="grey"
              />
            </View>
          </View>
        </View>
        : null}

      <View style={styles.inputContainer}>
        <Text>title</Text>
        <TextInput
          style={styles.inputStyle}
          value={title}
          onChangeText={text => setTitle(text)}></TextInput>

        {product ?
          null : <View>
            <Text>price</Text>
            <TextInput
              style={styles.inputStyle}
              value={price}
              onChangeText={text => setPrice(text)}></TextInput>
          </View>
        }

        <Text>description</Text>
        <TextInput
          style={styles.inputStyle}
          value={description}
          onChangeText={text => setDescription(text)}
        ></TextInput>
        <Text>imageUrl</Text>
        <TextInput
          style={styles.inputStyle}
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
        ></TextInput>
      </View>
    </ScrollView>
  )
}

EditProductScreen.navigationOptions = navData => {
  const submitFm = navData.navigation.getParam('submit')
  return {
    headerTitle: navData.navigation.getParam('productId') ? "Edit Product" : "Add Product",
    headerRight: (() =>
      <HeaderButtons
        HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName='ios-checkmark'
          onPress={submitFm} />
        {alert ?
          <View style={styles.notification}>
          </View> : null}
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  previewTopBox: {
    width: '100%',
    height: 300,
    flexDirection: 'row',
    backgroundColor: '#333333',
    justifyContent: 'space-around',
    alignContent: 'center'

  },
  previewContainer: {
    flex: 2,
    height: '100%',
    backgroundColor: '#333333',
    padding: 5,
  },
  emptySpaceBox: {
    opacity: 0.3,
    flex: 2,
    backgroundColor: 'black',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    color: 'grey',
    padding: 10,
  },
  emptySpaceIcons: {
    position: 'absolute',
    bottom: 20,
    right: 12
  },
  inputStyle: {
    fontSize: 18,
    margin: 5,
    backgroundColor: 'white',
    padding: 10,
    height: 60,
    borderColor: 'grey',
    borderBottomWidth: 1
  },
  inputContainer: {
    margin: 20
  },

})

export default EditProductScreen;