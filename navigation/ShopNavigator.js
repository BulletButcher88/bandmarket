import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
// import { Platform } from 'react-native';

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
// import Colors from ''

const ProductsNavigator = createStackNavigator(
  {
    ProductOverview: {
      screen: ProductOverviewScreen
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "pink"
      },
      headerTintColor: "black"
    }
  })

export default createAppContainer(ProductsNavigator)