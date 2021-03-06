import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk'

import productsReducer from './store/reducers/product';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';

import AppNavigator from './navigation/AppNavigator';


// import { composeWithDevTools } from 'redux-devtools-extension'
// above debugger react native (app), place composeWithDevTools() within createStore as a second argument.

enableScreens()


const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


const fetchFonts = () => {
  return Font.loadAsync({
    'rufina': require('./assets/fonts/Rufina-Regular.ttf'),
    'rufina-bold': require('./assets/fonts/Rufina-Bold.ttf'),
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
      <AppNavigator />
    </Provider>
  );
}

