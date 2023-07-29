import axios from 'axios'
import {
   ORDER_CREATE_REQUEST,
   ORDER_CREATE_SUCCESS,
   ORDER_CREATE_FAILURE,
   ORDER_DETAILS_REQUEST,
   ORDER_DETAILS_SUCCESS,
   ORDER_DETAILS_FAILURE,
   ORDER_PAY_REQUEST,
   ORDER_PAY_SUCCESS,
   ORDER_PAY_FAILURE,
   ORDER_LIST_MY_REQUEST,
   ORDER_LIST_MY_SUCCESS,
   ORDER_LIST_MY_FAILURE,
   MAIL_SEND_REQUEST,
   MAIL_SEND_SUCCESS,
   MAIL_SEND_FAILURE,
} from './actionTypes'
import { logout } from './UserActions'
import { removeAllCartItems } from './CartActions'

export const createOrder = (order) => async (dispatch, getState) => {
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

      // Send mail
      dispatch({ type: MAIL_SEND_REQUEST })
      await sendMail(dispatch, userInfo, data, config)

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

export const getOrderDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: ORDER_DETAILS_REQUEST })
      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }
      const { data } = await axios.get(`/api/orders/${id}`, config)

      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
   } catch (error) {
      const message =
         error.response && error.response.data.message ? error.response.data.message : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: ORDER_DETAILS_FAILURE,
         payload: message,
      })
   }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
   try {
      dispatch({ type: ORDER_PAY_REQUEST })
      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }
      const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

      dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
   } catch (error) {
      const message =
         error.response && error.response.data.message ? error.response.data.message : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: ORDER_PAY_FAILURE,
         payload: message,
      })
   }
}

export const listMyOrders = () => async (dispatch, getState) => {
   try {
      dispatch({ type: ORDER_LIST_MY_REQUEST })
      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }
      const { data } = await axios.get(`/api/orders/profile`, config)

      dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data })
   } catch (error) {
      const message =
         error.response && error.response.data.message ? error.response.data.message : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: ORDER_LIST_MY_FAILURE,
         payload: message,
      })
   }
}

const sendMail = async (dispatch, userInfo, orderData, config) => {
   try {
      const { data } = await axios.post(
         `/api/orders/sendmail`,
         {
            name: userInfo?.name,
            email: userInfo?.email,
            message: 'Confirm order',
            order: orderData,
         },
         config
      )
      dispatch({ type: MAIL_SEND_SUCCESS, payload: data })
   } catch (error) {
      // Handle error if sending mail fails
      dispatch({ type: MAIL_SEND_FAILURE, payload: error.message })
   }
}
