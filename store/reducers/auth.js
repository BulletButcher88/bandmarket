import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null
}

export default (state = initialState, action) => {
  console.log(state)
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId
      };
    case LOGOUT:
      return initialState;

    // case SIGN_UP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   }
    default:
      return state;
  }
}