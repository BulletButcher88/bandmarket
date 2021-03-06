import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      const response = await fetch(`https://bandmusic-expo-app.firebaseio.com//orders/${userId}.json`)
      if (!response.ok) {
        throw new Error('Something went wrong with the API.')
      }
      const resData = await response.json()
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(new Order(
          key,
          resData[key].cartItems,
          resData[key].totalAmount,
          new Date(resData[key].date),
        ))
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders })
    } catch (err) {
      throw err;
    }
  }
}

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const date = new Date()

    const response = await fetch(`https://bandmusic-expo-app.firebaseio.com//orders/${userId}.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString()
      })
    })

    if (!response.ok) {
      throw new Error('Something went wrong.')
    }

    const resData = await response.json()

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date
      }
    });

    //   // Local Notification query. NEEDS refactoring, not hooked up!
    // if (itemsInCartNotification) {
    //   // Notification cancellation //
    //   await Notifications.cancelScheduledNotificationAsync(itemsInCartNotification)
    // } else {
    //   const notificationCartItemWaiting = await Notifications.scheduleNotificationAsync({
    //     content: {
    //       title: "Shopping Cart",
    //       body: 'You have an item waiting for you in the shopping cart',
    //       data: { items: cartItems }
    //     },
    //     trigger: {
    //       seconds: 6
    //     },
    //   })
    //   return notificationCartItemWaiting
    // }

    for (cartItems of cartItems) {
      console.log(pushToken)
      const pushToken = cartItems.productPushToken;
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: pushToken,
          data: { items: cartItems },
          title: 'Order was placed',
          body: cartItems.productTitle
        })
      });
    }
  }
}

