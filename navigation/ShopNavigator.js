import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductsScreen from '../screens/user/UserProductScreen'
// import Colors from ''

const defaultOptions = {
  headerStyle: {
    backgroundColor: "white"
  },
  headerTitleStyle: {
    fontFamily: 'ambit'
  },
  headerBackTitle: '',
  headerBackTitleStyle: {
    fontFamily: 'montserrat',
    fontSize: 12,
    color: 'black'
  }
}

const ProductsNavigator = createStackNavigator(
  {
    ProductOverview: {
      screen: ProductOverviewScreen
    },
    ProductDetail: {
      screen: ProductDetailScreen
    },
    Cart: {
      screen: CartScreen
    }
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultOptions
  })

const AdminNavigator = createStackNavigator({
  UserProducts: { screen: UserProductsScreen }
},
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultOptions
  }
);

const OrderNavigator = createStackNavigator({
  Orders: { screen: OrderScreen }
},
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultOptions
  }
);

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrderNavigator,
  Admin: AdminNavigator
}, {
  contentOptions: {
    activeTintColor: 'white'
  }
})

export default createAppContainer(ShopNavigator)