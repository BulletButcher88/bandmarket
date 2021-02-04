import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert, ActivityIndicator } from 'react-native';
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
      inputValues: updatedState,
      inputValidities: updateValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
}

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();


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
  }
  )

  useEffect(() => {
    if (error) {
      Alert.alert("An error has occurred.", error, [{ text: "OK" }])
    }
  }, [error])

  const onSubmitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input', "Please check errors in the form", [
        {
          text: 'OK'
        }
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      if (product) {
        await dispatch(
          productAction.updateProduct(
            proId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          productAction.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      };
      props.navigation.goBack()
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false)

  }, [dispatch, proId, formState]);


  useEffect(() => {
    props.navigation.setParams({ submit: onSubmitHandler })
  }, [onSubmitHandler])

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_REDUCER_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color='black' />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        {product ?
          <View style={styles.previewTopBox}>
            <View style={styles.previewContainer}>
              <ProductItem
                image={formState.inputValues.imageUrl}
                title={formState.inputValues.title}
                price={formState.inputValues.price} >
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-eye' : 'ios-eye'}
                  size={18}
                  color="grey"
                  style={{ marginRight: 12 }}
                />
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                  size={18}
                  color="grey"
                />
              </ProductItem>
            </View>
            <View style={styles.emptySpaceBox}>
              <Text style={styles.previewText}>OTHER PRODUCT</Text>
              <View style={styles.emptySpaceIcons}>
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-eye' : 'ios-eye'}
                  size={18}
                  color="grey"
                  style={{ paddingBottom: 3 }}
                />
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                  size={18}
                  color="grey"
                />
              </View>
            </View>
          </View>
          : null}

        <View style={styles.inputContainer}>
          <Input
            id='title'
            label='Title'
            errorText='* title required'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={product ? product.title : ''}
            initiallyValid={!!product}
            required
          ></Input>

          {product ?
            null : <View>
              <Input
                id='price'
                label='Price'
                keyboardType="decimal-pad"
                autoCapitalize='sentences'
                returnKeyType='next'
                onInputChange={inputChangeHandler}
                errorText='* price required'
                required
                min={0.1}
              ></Input>
            </View>
          }
          <Input
            id='description'
            label='Description'
            keyboardType="default"
            autoCapitalize='sentences'
            autoCorrect
            errorText=' description length'
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={product ? product.description : ''}
            initiallyValid={!!product}
            required
            minLength={5}
          ></Input>
          <Input
            id='imageUrl'
            label='Image URL'
            errorText='* image URL required'
            keyboardType="default"
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={product ? product.imageUrl : ''}
            initiallyValid={!!product}
            required
          ></Input>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export const screenOptions = navData => {
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default EditProductScreen;