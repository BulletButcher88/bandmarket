import AsyncStorage from '@react-native-async-storage/async-storage';

// export const SIGN_UP = 'SIGN_UP';
// export const LOG_IN = 'LOG_IN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT'

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  }
};

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
    dispatch(authenticate(
      resData.localId,
      resData.idToken,
      parseInt(resData.expiresIn) * 1000
    ));
    const expirationData = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationData)
  }
};

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
    console.log("login action redux = ", resData)

    dispatch(authenticate(
      resData.localId,
      resData.idToken,
      parseInt(resData.expiresIn) * 1000
    ));
    const expirationData = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationData)
  }
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData')
  return dispatch => {
    dispatch({ type: LOGOUT })
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
}

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }
}

const saveDataToStorage = (token, userId, expirationData) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationData.toISOString()
    })
  )
}