import axios from 'axios'
import {
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   PRODUCT_LIST_FAILURE,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_DETAILS_FAIL,
   REVIEW_CREATE_REQUEST,
   REVIEW_CREATE_SUCCESS,
   REVIEW_CREATE_FAILURE,
} from './actionTypes'
import { logout } from './UserActions'

export const listProducts =
   (keyword = '', pageNumber = 1) =>
   async (dispatch) => {
      try {
         dispatch({
            type: PRODUCT_LIST_REQUEST,
         })

         const { data } = await axios.get(
            `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
         )

         dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
         })
      } catch (error) {
         dispatch({
            type: PRODUCT_LIST_FAILURE,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
         })
      }
   }

export const productDetail = (id) => async (dispatch) => {
   try {
      const { data } = await axios.get(`/api/product/${id}`)
      dispatch({
         type: PRODUCT_DETAILS_REQUEST,
      })
      dispatch({
         type: PRODUCT_DETAILS_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_DETAILS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const productReview = (productId, review) => async (dispatch, getState) => {
   try {
      dispatch({ type: REVIEW_CREATE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      await axios.post(`/api/${productId}/reviews`, review, config)
      dispatch({ type: REVIEW_CREATE_SUCCESS, payload: 'Review Added' })
   } catch (error) {
      const message =
         error.response && error.response.data.message ? error.response.data.message : error.message
      if (message === 'Not authorized, token failed') {
         dispatch(logout())
      }
      dispatch({
         type: REVIEW_CREATE_FAILURE,
         payload: message,
      })
   }
}


