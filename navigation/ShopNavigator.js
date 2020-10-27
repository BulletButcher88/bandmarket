import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
// import { Platform } from 'react-native';

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
// import Colors from ''

const ProductsNavigator = createStackNavigator(
  {
    ProductOverview: {
      screen: ProductOverviewScreen
    },
    ProductDetail: {
      screen: ProductDetailScreen
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "pink"
      },
      headerTitleStyle: {
        fontFamily: 'ambit'
      },
      headerBackTitle: '',
      headerBackTitleStyle: {
        fontFamily: 'open-san',
        fontSize: 11,
        color: 'black'
      }
    }
  })

export default createAppContainer(ProductsNavigator)