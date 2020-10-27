import React, { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import productsReducer from './store/reducers/product';
import cartReducer from './store/reducers/cart'
import ShopNavigator from './navigation/ShopNavigator'


// import { composeWithDevTools } from 'redux-devtools-extension'
// above debugger react native (app), place composeWithDevTools() within createStore as a second argument.

enableScreens()

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

const store = createStore(rootReducer);


const fetchFonts = () => {
  return Font.loadAsync({
    'open-san': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-san-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'ambit-bold': require('./assets/fonts/Ambit-Bold.ttf'),
    'ambit': require('./assets/fonts/Ambit-Regular.ttf'),
    'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'roboto': require('./assets/fonts/Roboto-Bold.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Regular.ttf')
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => {
      setFontLoaded(true)
    }} />
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

