import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Button,
  Share
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import * as cartAction from '../../store/actions/cart';
import * as productActions from '../../store/actions/product';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator';
import CartNotificationSticker from '../../components/UI/CartNotificationSticker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';



const ProductOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [badgeAlert, setBadgeAlert] = useState(null)
  const dispatch = useDispatch();
  ;
  const products = useSelector(state => state.products.availableProducts);
  const numCartItems = useSelector(state => state.cart.numberOfItems);
  const itemsInCart = useSelector(state => state.cart.items)


  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then(statusObj => {
        if (statusObj.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS)
        }
        return statusObj;
      }).then(statusObj => { if (statusObj.status !== 'granted') { return; } })

  }, [])

  useEffect(() => {
    //notifications while the app is NOT running 
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      const cartNotificationData = response.notification.request.content.data
      dispatch(cartAction.NotificationsReloadData(cartNotificationData));
      props.navigation.navigate('Cart')
    })

    //notifications while the app is running in the background 
    const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
      // console.log(notification)
      props.navigation.navigate('Cart')
    })

    Notifications.setNotificationHandler({
      handleNotification: async () => {
        return {
          shouldShowAlert: true
        }
      }
    })
    return () => {
      backgroundSubscription.remove()
      foregroundSubscription.remove()
    }
  }, [])



  const addToCartHandler = async (itemData) => {
    dispatch(cartAction.AddToCart(itemData.item));
    setBadgeAlert(numCartItems + 1);

    // Notification query to refactor this later //
    if (Constants.isDevice) {
      const notificationCartItemWaiting = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Shopping Cart",
          body: 'You have an item waiting for you in the shopping cart',
          data: { items: itemsInCart }
        },
        trigger: {
          seconds: 6
        },
      })
    }
    // Notification cancellation //
    // await Notifications.cancelScheduledNotificationAsync(notificationCartItemWaiting)

  }


  const loadProduct = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchProduct());
    } catch (err) {
      setError(err.message)
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing, setError]);



  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadProduct);
    return () => {
      unsubscribe()
    }
  }, [loadProduct]);


  useEffect(() => {
    setIsLoading(true);
    loadProduct().then(() => {
      setIsLoading(false);
    })
  }, [dispatch, loadProduct, setIsLoading]);

  const selectItemHandler = (id, title, numCartItems) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
      badge: numCartItems && numCartItems > 0 ? numCartItems : null
    })
  }


  useEffect(() => {
    setBadgeAlert(numCartItems)

    props.navigation.setOptions({
      headerLeft: (() =>
        <HeaderButtons
          HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Cart'
            iconName='ios-menu'
            onPress={() => {
              props.navigation.toggleDrawer()
            }} />
        </HeaderButtons>
      ),
      headerRight: (() =>
        <HeaderButtons
          HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Cart'
            iconName='ios-cart'
            onPress={() => {
              props.navigation.navigate('Cart')
            }} />
          {
            numCartItems > 0 ?
              <CartNotificationSticker>{numCartItems}</CartNotificationSticker>
              : null
          }
        </HeaderButtons>
      )
    });

  }, [numCartItems])


  if (error) {
    return (
      <View style={styles.emptyAPI}>
        <Text style={{ color: 'white' }}>
          An error has occurred! {error}
        </Text>
        <Button title='Refresh' onPress={() => {
          loadProduct();
        }
        } />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.spinner}>
        <CustomActivityIndicator />
      </View>
    )
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.emptyAPI}>
        <Text style={{ color: 'white' }}>
          No products have been added yet. You can start adding some
        </Text>
      </View>
    )
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'URL link to share',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={loadProduct}
        refreshing={isRefreshing}
        style={{ marginVertical: 8 }}
        data={products}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={itemData =>

          <ProductItem
            title={itemData.item.title}
            price={itemData.item.price}
            image={itemData.item.imageUrl}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title, numCartItems);
            }}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-share-social' : 'ios-paper-plane'}
              size={18}
              color='black'
              style={{ marginRight: 12 }}
              onPress={onShare}
            />

            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={18}
              color="black"
              onPress={() => { addToCartHandler(itemData) }}
            />
          </ProductItem>
        } />
    </View>
  )
}

export const screenOptions = navData => {
  return {
    headerTitle: 'Products'
  }
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyAPI: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white'
  },
  price: {
    color: 'pink'
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  }
})

export default ProductOverviewScreen;
