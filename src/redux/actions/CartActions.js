import axios from 'axios'
import {
   CART_ADD_ITEM,
   CART_REMOVE_ITEM,
   REMOVE_ALL_CART_ITEMS,
   SAVE_SHIPPING_ADDRESS,
   SAVE_PAYMENT_METHOD,
} from './actionTypes'

export const addToCart = (id, qty) => async (dispatch, getState) => {
   const { data } = await axios.get(`/api/product/${id}`)

   dispatch({
      type: CART_ADD_ITEM,
      payload: {
         product: data?._id,
         name: data?.name,
         image: data?.image,
         price: data?.price,
         countInStock: data?.countInStock,
         qty,
      },
   })
   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
   dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
   })
   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeAllCartItems = () => (dispatch, getState) => {
   dispatch({
      type: REMOVE_ALL_CART_ITEMS,
      payload: [],
   })
   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
   if (data) {
      dispatch({
         type: SAVE_SHIPPING_ADDRESS,
         payload: data,
      })
      localStorage.setItem('shippingAddress', JSON.stringify(data))
   }
}

export const savePaymentMethod = (data) => (dispatch) => {
   dispatch({
      type: SAVE_PAYMENT_METHOD,
      payload: data,
   })
   localStorage.setItem('paymentMethod', JSON.stringify(data))
}
