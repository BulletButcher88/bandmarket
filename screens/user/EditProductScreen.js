import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem'

const EditProductScreen = props => {
  const proId = props.navigation.getParam('productId')
  const userProducts = useSelector(state => state.products.availableProducts)
  const product = userProducts.find(product => product.id === proId)
  console.log(product)

  if (!product) {
    return (
      <View>
        <TextInput>Title</TextInput>
        <TextInput>Price</TextInput>
        <TextInput>description</TextInput>
        <TextInput>imageUrl</TextInput>
      </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1 }}>
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
      <View style={styles.inputContainer}>
        <Text>title</Text>
        <TextInput style={styles.inputStyle}>{product.title}</TextInput>
        <Text>price</Text>
        <TextInput style={styles.inputStyle}>{product.price}</TextInput>
        <Text>description</Text>
        <TextInput style={styles.inputStyle}>{product.description}</TextInput>
        <Text>imageUrl</Text>
        <TextInput style={styles.inputStyle}>{product.imageUrl}</TextInput>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  previewContainer: {
    height: 300,
    backgroundColor: 'grey'
  },
  previewText: {
    padding: 10,
    color: 'white'
  },
  inputStyle: {
    fontSize: 18,
    margin: 8,
    backgroundColor: 'white',
    padding: 5,
    height: 60
  },
  inputContainer: {
    padding: 12
  },

})

export default EditProductScreen;