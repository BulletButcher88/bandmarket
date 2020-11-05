import CartItem from '../../models/cart-item';
import { ADD_TO_CART, REMOVE_FROM_CART, PLUS_ONE_ITEM } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders'
import { DELETE_PRODUCT } from '../actions/product'

const initialState = {
  items: {},
  totalAmount: 0,
  numberOfItems: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title

      let updateNewCartItem;

      if (state.items[addedProduct.id]) {
        updateNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updateNewCartItem },
          totalAmount: state.totalAmount + prodPrice,
          numberOfItems: state.numberOfItems + 1
        }
      } else {
        updateNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updateNewCartItem },
          totalAmount: state.totalAmount + prodPrice,
          numberOfItems: state.numberOfItems + 1
        }
      }
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQuantity = selectedCartItem.quantity
      let updatedCartItems;

      if (currentQuantity > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        )
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem }
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
        numberOfItems: state.numberOfItems - 1
      }
    case PLUS_ONE_ITEM:
      const cartItem = state.items[action.pid.productId];
      const plusCartItems = new CartItem(
        cartItem.quantity + 1,
        cartItem.productPrice,
        cartItem.productTitle,
        cartItem.sum + cartItem.productPrice
      )
      const updatedCart = { ...state.items, [action.pid.productId]: plusCartItems }

      return {
        ...state,
        items: updatedCart,
        totalAmount: state.totalAmount + cartItem.productPrice,
        numberOfItems: state.numberOfItems + 1
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid]
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
        numberOfItems: state.numberOfItems - state.items[action.pid].quantity
      }
  }
  return state;
};