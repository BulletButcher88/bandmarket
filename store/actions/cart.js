export const ADD_TO_CART = 'ADD_TO-CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const AddToCart = product => {
  return { type: ADD_TO_CART, product: product }
}

export const RemoveFromCart = productId => {
  return { type: REMOVE_FROM_CART, pid: productId }
}