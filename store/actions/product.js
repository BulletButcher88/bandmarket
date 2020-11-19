import Product from '../../models/product'

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = 'SET_PRODUCT';

export const fetchProduct = () => {
  return async dispatch => {
    //async code 
    const response = await fetch('https://bandmusic-expo-app.firebaseio.com//product.json')
    const resData = await response.json()

    const loadedProducts = [];
    for (const key in resData) {
      loadedProducts.push(new Product(
        key,
        'u1',
        resData[key].title,
        resData[key].imageUrl),
        resData[key].description,
        resData[key].price
      )
    }
    dispatch({
      type: SET_PRODUCT, products: loadedProducts
    })
  }
}

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId }
}

export const createProduct = (title, description, imageUrl, price) => {

  return async dispatch => {
    //async code 
    const response = await fetch('https://bandmusic-expo-app.firebaseio.com//product.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
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
        price
      }
    })
  }
}


export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    }
  }
}