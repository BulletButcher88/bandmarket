import { ADD_ORDER } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  console.log(action.orders)
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orders.items,
        action.orders.amount,
        new Date()
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder)
      }
  }
  return state;

}