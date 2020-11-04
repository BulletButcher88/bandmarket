import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EditProductScreen = props => {
  const proId = props.navigation.getParam('productId')
  console.log(proId)
  return (
    <View>
      <Text>EDIT SCREEN props: {proId}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default EditProductScreen;