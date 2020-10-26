import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Button,
  Image
} from 'react-native';
import { useSelector } from 'react-redux';


const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId')
  const product = useSelector(state =>
    state.products.availableProducts.find(product =>
      product.id === productId))

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
              title='Add to Cart'
              onPress={() => { }} />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  }
}

const styles = StyleSheet.create({
  priceSticker: {
    backgroundColor: 'black',
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    right: 10,
    top: 10,
    borderColor: 'pink',
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
    fontSize: 20,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  description: {
    fontSize: 15,
    marginVertical: 10,
    marginHorizontal: 10
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
  }
})

export default ProductDetailScreen