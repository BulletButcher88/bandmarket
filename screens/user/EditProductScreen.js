import React, { useCallback, useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Platform, Alert } from 'react-native';
// import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Input from '../../components/UI/Input';
import * as productAction from '../../store/actions/product';

const FORM_REDUCER_UPDATE = "FORM_REDUCER_UPDATE";

const formReducer = (state, action) => {

  if (action.type === FORM_REDUCER_UPDATE) {

    const updatedState = {
      ...state.inputValues,
      [action.input]: action.value
    };

    const updateValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };

    let updatedFormIsValid = true;
    for (const key in updateValidities) {
      updatedFormIsValid = updatedFormIsValid && updateValidities[key]
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedState,
      inputValidities: updateValidities
    }
  }
  return state;
}

const EditProductScreen = props => {

  const proId = props.navigation.getParam('productId')
  const product = useSelector(state =>
    state.products.availableProducts.find(product => product.id === proId))

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : '',
      imageUrl: product ? product.imageUrl : '',
      description: product ? product.description : '',
      price: ''
    },
    inputValidities: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      description: product ? true : false,
      price: product ? true : false,
    },
    formIsValid: product ? true : false
  })


  const onSubmitHandler = useCallback(() => {

    if (!formState.formIsValid) {
      Alert.alert('Wrong input', "Please check errors in the form", [{
        text: 'OK'
      }])
      return;
    }

    if (product) {
      dispatch(
        productAction.updateProduct(
          proId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl)
      )
    } else {
      dispatch(
        productAction.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price)
      );
    }
    props.navigation.goBack()
  }, [dispatch, proId, formState])


  useEffect(() => {
    props.navigation.setParams({ submit: onSubmitHandler })
  }, [onSubmitHandler])

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_REDUCER_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    })
  }, [dispatchFormState])

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* <WebView
        source={{html: '<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1923419739/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="https://alainjohannes.bandcamp.com/album/hum">Hum by Alain Johannes</a></iframe>'}}
        style={{marginTop: 20}}
        /> */}
      {product ? <Text style={{ padding: 10, color: 'white', backgroundColor: "#333333" }}>product ID {product ? product.id : null}</Text> : null}

      {product ?
        <View style={styles.previewTopBox}>
          <View style={styles.previewContainer}>
            <ProductItem
              image={formState.inputValues.imageUrl}
              title={formState.inputValues.title}
              price={formState.inputValues.price} >
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
        <Input
          label='Title'
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          errorText='* title required'
          onInputChange={inputChangeHandler.bind(this, 'title')}
          initialValue={formState.inputValues ? formState.inputValues.title : ''}
          initiallyValid={!!product}
        ></Input>


        {product ?
          null : <View>
            <Input
              label='Price'
              keyboardType="decimal-pad"
              autoCapitalize='sentences'
              autoCorrect
              errorText='* price required'
            ></Input>
          </View>
        }
        <Input
          label='Description'
          keyboardType="default"
          autoCapitalize='sentences'
          autoCorrect
          errorText='* a description is required'
          numberOfLines={3}
          onInputChange={inputChangeHandler.bind(this, 'description')}
          initialValue={product ? product.description : ''}
          initiallyValid={!!product}
        ></Input>
        <Input
          label='Image URL'
          keyboardType="default"
          autoCapitalize='sentences'
          errorText='* image URL required'
          autoCorrect
          {...Platform.OS === 'android' ? keyboardType = 'default' : keyboardType = 'url'}
          numberOfLines={3}
          returnKeyType='next'
          onInputChange={inputChangeHandler.bind(this, 'imageUrl')}
          initialValue={product ? product.imageUrl : ''}
          initiallyValid={!!product}
        ></Input>
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
  }
})

export default EditProductScreen;