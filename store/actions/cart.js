export const ADD_TO_CART = 'ADD_TO-CART';

export const AddToCart = product => {
  return { type: ADD_TO_CART, product: product }
}