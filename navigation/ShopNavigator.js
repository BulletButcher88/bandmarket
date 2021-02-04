import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { createDrawerNavigator } from '@react-navigation/drawer'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as authActions from '../store/actions/auth';

import ProductOverviewScreen, { screenOptions as productOverviewScreenOptions } from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, { screenOptions as detailScreenOptions } from '../screens/shop/ProductDetailScreen';
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/shop/CartScreen';

import OrderScreen, { screenOptions as orderScreenOptions } from '../screens/shop/OrderScreen';
import UserProductsScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
// import Colors from ''


const defaultOptions = {
  headerStyle: {
    backgroundColor: "white"
  },
  headerTitleStyle: {
    fontFamily: 'rufina'
  },
  headerBackTitle: '',
  headerBackTitleStyle: {
    fontFamily: 'rufina',
    fontSize: 12,
    color: 'black'
  }
}

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultOptions}>
      <ProductsStackNavigator.Screen
        name="ProductOverview"
        component={ProductOverviewScreen}
        options={productOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={detailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  )
}

// const ProductsNavigator = createStackNavigator(
//   {
//     ProductOverview: {
//       screen: ProductOverviewScreen
//     },
//     ProductDetail: {
//       screen: ProductDetailScreen
//     },
//     Cart: {
//       screen: CartScreen
//     }
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultOptions
//   })

// const AdminNavigator = createStackNavigator({
//   UserProducts: { screen: UserProductsScreen },
//   EditProducts: { screen: EditProductScreen }
// },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultOptions
//   }
// );


const OrderStackNavigator = createStackNavigator();

export const OrderNavigator = () => {
  return (
    <OrderStackNavigator.Navigator>
      <OrderStackNavigator.Screen
        name="Order"
        component={OrderScreen}
        options={orderScreenOptions}
      />
    </OrderStackNavigator.Navigator>
  )
}

// const OrderNavigator = createStackNavigator({
//   Orders: { screen: OrderScreen }
// },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultOptions
//   }
// );

// const ShopNavigator = createDrawerNavigator({
//   Products: ProductsNavigator,
//   Orders: OrderNavigator,
//   Admin: AdminNavigator
// }, {
//   contentOptions: {
//     activeTintColor: 'pink'
//   },
//   contentComponent: props => {
//     const dispatch = useDispatch()

//     return <View style={{ flex: 1, paddingTop: 20 }}>
//       <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//         <DrawerNavigatorItems {...props} />
//         <Button title='Logout' color='orange' fontSize={10} onPress={() => {
//           dispatch(authActions.logout())
//           props.navigation.navigate('Auth')
//         }} />
//       </SafeAreaView>
//     </View>
//   }
// })

// const AuthNavigator = createStackNavigator({
//   Auth: AuthScreen
// }, {
//   defaultNavigationOptions: defaultOptions
// })

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator
// })

// export default createAppContainer(MainNavigator)