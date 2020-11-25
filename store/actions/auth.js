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
      throw new Error('Something went wrong!', response)
    }

    const resData = await response.json();

    dispatch({ type: SIGN_UP })
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
      throw new Error('Something went wrong!', response)
    }

    const resData = await response.json();

    console.log(resData)

    dispatch({ type: LOG_IN })
  }
}