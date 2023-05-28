import axios from 'axios'
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILURE } from './actionTypes'
import { logout } from './UserActions'
import { removeAllCartItems } from './CartActions'

export const createOrder = (order) => async (dispatch, getState) => {
   console.log({ order })

   try {
      dispatch({ type: ORDER_CREATE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()
      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post(`/api/orders`, order, config)
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
      dispatch(removeAllCartItems())
      localStorage.removeItem('cartItems')
   } catch (error) {
      const message =
         error.response && error.response.data.message ? error.response.data.message : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: ORDER_CREATE_FAILURE,
         payload: message,
      })
   }
}
