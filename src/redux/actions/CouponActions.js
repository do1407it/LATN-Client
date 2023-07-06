import axios from 'axios'
import {
   COUPON_LIST_REQUEST,
   COUPON_LIST_SUCCESS,
   COUPON_LIST_FAILURE,
   COUPON_APPLY_REQUEST,
   COUPON_APPLY_SUCCESS,
   COUPON_APPLY_FAILURE,
} from './actionTypes'

export const applyCoupon = (coupon) => async (dispatch) => {
   try {
      dispatch({ type: COUPON_APPLY_REQUEST })
      const { data } = await axios.post(`/api/coupon`, coupon)
      dispatch({ type: COUPON_APPLY_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: COUPON_APPLY_FAILURE,
         payload: error.response.data.message ? error.response.data.message : error.message,
      })
   }
}

export const listCoupon = () => async (dispatch) => {
   try {
      dispatch({ type: COUPON_LIST_REQUEST })
      const { data } = await axios.get(`/api/coupon`)
      dispatch({ type: COUPON_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: COUPON_LIST_FAILURE,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}
