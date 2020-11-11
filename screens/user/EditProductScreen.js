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
  }, [dispatch, proId, title, description, imageUrl, price])


  useEffect(() => {
    props.navigation.setParams({ submit: onSubmitHandler })
  }, [onSubmitHandler])

  return (
    <ScrollView style={{ flex: 1 }}>

      {product ?
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>preview</Text>
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
  previewContainer: {
    height: 300,
    backgroundColor: 'grey',
    padding: 8,
    width: '50%'
  },
  previewText: {
    padding: 10,
    color: 'white'
  },
  inputStyle: {
    fontSize: 18,
    margin: 5,
    backgroundColor: 'white',
    padding: 5,
    height: 60,
    borderColor: 'grey',
    borderBottomWidth: 1
  },
  inputContainer: {
    margin: 20
  },

})

export default EditProductScreen;