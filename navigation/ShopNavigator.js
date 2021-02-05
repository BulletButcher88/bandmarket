import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as authActions from '../store/actions/auth';

import ProductOverviewScreen, { screenOptions as productOverviewScreenOptions } from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, { screenOptions as detailScreenOptions } from '../screens/shop/ProductDetailScreen';
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/shop/CartScreen';

import OrderScreen, { screenOptions as orderScreenOptions } from '../screens/shop/OrderScreen';
import UserProductsScreen, { screenOptions as userProductScreenOptions } from '../screens/user/UserProductScreen';
import EditProductScreen, { screenOptions as editProductScreenOptions } from '../screens/user/EditProductScreen';
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen';
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


const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductScreenOptions} />
      <AdminStackNavigator.Screen
        name="EditProducts"
        component={EditProductScreen}
        options={editProductScreenOptions} />
    </AdminStackNavigator.Navigator>
  )
};


const OrderStackNavigator = createStackNavigator();

export const OrderNavigator = () => {
  return (
    <OrderStackNavigator.Navigator screenOptions={defaultOptions}>
      <OrderStackNavigator.Screen
        name="Order"
        component={OrderScreen}
        options={orderScreenOptions}
      />
    </OrderStackNavigator.Navigator>
  )
}


const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch()

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => {
        return <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItemList {...props} />
            <Button title='Logout' color='orange' fontSize={10} onPress={() => {
              dispatch(authActions.logout())
              // props.navigation.navigate('Auth')
            }} />
          </SafeAreaView>
        </View>
      }}
      drawerContentOptions={{
        activeTintColor: 'pink'
      }} >
      <ShopDrawerNavigator.Screen
        name="Product"
        component={ProductsNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrderNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
    </ShopDrawerNavigator.Navigator>
  )
}


const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultOptions}>
      <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={authScreenOptions} />
    </AuthStackNavigator.Navigator>
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

// const AuthStackNavigator = createStackNavigator();

// export const OrderNavigator = () => {
//   return (
//     <AuthStackNavigator.Navigator screenOptions={defaultOptions}>
//       <AuthStackNavigator.Screen
//         name="Order"
//         component={OrderScreen}
//         options={orderScreenOptions}
//       />
//     </AuthStackNavigator.Navigator>
//   )
// }

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