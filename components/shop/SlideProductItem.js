import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';

const ProductCard = props => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <Text style={styles.titleSlide}>{props.title}</Text>
      <View style={styles.priceSticker}>
        <Text style={styles.price}>${props.price.toFixed(0)}</Text>
      </View>
    </View>
  )
}

const SlideProductItem = props => {
  const products = useSelector(state =>
    state.products.availableProducts.filter(product =>
      product.id !== props.productId))

  return (
    <FlatList
      horizontal={true}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData =>
        <ProductCard
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onDetail={() => {
            props.navigation.navigate('ProductDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            })
          }}
          onAddToCart={() => { }}
        />
      } />
  )
};

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.30,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    height: 240,
    margin: 10,
  },
  image: {
    height: '100%',
    width: 280,
    borderRadius: 15,
  },
  titleSlide: {
    borderRadius: 30,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    padding: 4,
    color: 'white',
    position: 'absolute',
    bottom: 0,
    fontSize: 23,
    width: '100%'
  },
  price: {
    color: 'white',
    fontSize: 22,
    position: 'relative',
    textAlign: 'center',
    top: "30%",
  },
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
})

export default SlideProductItem;