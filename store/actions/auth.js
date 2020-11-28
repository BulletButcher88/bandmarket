import { AsyncStorage } from 'react-native';

export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';


export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbA_0uaAPtaZoBhbfMKWCfgucNZ0qFW4M', {
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    })
    if (!response.ok) {
      const errorDataRes = await response.json();
      const errorId = errorDataRes.error.message;
      let message = "Something went wrong";
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email already has an account with us'
      } else if (errorId === 'OPERATION_NOT_ALLOWED') {
        message = 'Password sign-in is disabled for this project'
      } else if (errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        message = 'We have blocked all requests from this device due to unusual activity.'
      }
      throw new Error(message)
    }

    const resData = await response.json();
    dispatch({ type: SIGN_UP, token: resData.idToken, userId: resData.localId });
    const expirationData = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationData)
  }
}

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbA_0uaAPtaZoBhbfMKWCfgucNZ0qFW4M', {
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    })
    if (!response.ok) {
      const errorDataRes = await response.json();
      const errorId = errorDataRes.error.message;
      let message = "Something went wrong";
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found, did you sign up?'
      } else if (errorId === 'INVALID_EMAIL') {
        message = 'Invalid email'
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'Invalid password'
      } else if (errorId === 'USER_DISABLED') {
        message = 'This account has been disabled'
      }
      throw new Error(message)
    }

    const resData = await response.json();
    dispatch({ type: LOG_IN, token: resData.idToken, userId: resData.localId })
    const expirationData = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationData)
  }
}

const saveDataToStorage = async (token, userId, expirationData) => {
  try {
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationData.toISOString()
      })
    );
  } catch (error) {
    throw new Error(error)
  }
}