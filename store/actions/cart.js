export const ADD_TO_CART = 'ADD_TO-CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const PLUS_ONE_ITEM = 'PLUS_ONE_ITEM';
export const NOTIFICATIONS_DATA_RELOAD = "NOTIFICATIONS_DATA_RELOAD";

export const AddToCart = product => {
  return { type: ADD_TO_CART, product: product }
}

export const RemoveFromCart = productId => {
  return { type: REMOVE_FROM_CART, pid: productId }
}

export const PlusOneToCart = productId => {
  return { type: PLUS_ONE_ITEM, pid: productId }
}

export const NotificationsReloadData = data => {
  return { type: NOTIFICATIONS_DATA_RELOAD, data: data }
}