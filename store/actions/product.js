import Product from '../../models/product'

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = 'SET_PRODUCT';

export const fetchProduct = () => {
  return async (dispatch, getState) => {
    //async code 
    const userId = getState().auth.userId;

    try {
      const response = await fetch('https://bandmusic-expo-app.firebaseio.com//product.json')
      if (!response.ok) {
        throw new Error('Something went wrong with the API.')
      }

      const resData = await response.json()
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(new Product(
          key,
          resData[key].ownerId,
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        ))
      }
      dispatch({
        type: SET_PRODUCT,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
      })
    } catch (err) {
      throw err;
    }
  }
}

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://bandmusic-expo-app.firebaseio.com//product/${productId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something is wrong with the API call.')
    }

    dispatch({ type: DELETE_PRODUCT, pid: productId })


  }
}

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(`https://bandmusic-expo-app.firebaseio.com//product.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      })
    })
    const resData = await response.json()

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      }
    })
  }
}

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    console.log("token for updating API ========= ", token)

    const response = await fetch(
      `https://bandmusic-expo-app.firebaseio.com//product/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        //PATCH just edits what has changed PUT overrides it.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        })
      })

    if (!response.ok) {
      console.log(response)
      throw new Error('Something is wrong with the API call.')
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      }
    })
  }
}