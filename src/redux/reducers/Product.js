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
   REVIEW_CREATE_RESET,
} from '../actions/actionTypes'

export const getProductListReducer = (state = { products: { products: [] } }, action) => {
   const { type, payload } = action
   switch (type) {
      case PRODUCT_LIST_REQUEST:
         return { loading: true, products: { products: [] } }
      case PRODUCT_LIST_SUCCESS:
         return {
            loading: false,
            products: payload,
         }
      case PRODUCT_LIST_FAILURE:
         return { loading: false, error: payload }
      default:
         return state
   }
}

export const getProductDetailsReducer = (state = { product: { reviews: [] } }, action) => {
   const { type, payload } = action
   switch (type) {
      case PRODUCT_DETAILS_REQUEST:
         return { ...state, loading: true }
      case PRODUCT_DETAILS_SUCCESS:
         return { loading: false, product: payload }
      case PRODUCT_DETAILS_FAIL:
         return { loading: false, error: payload }
      default:
         return state
   }
}

export const productReviewReducer = (state = {}, action) => {
   const { type, payload } = action
   switch (type) {
      case REVIEW_CREATE_REQUEST:
         return { loading: true }
      case REVIEW_CREATE_SUCCESS:
         return { loading: false, success: true, review: payload }
      case REVIEW_CREATE_FAILURE:
         return { loading: false, error: payload }
      case REVIEW_CREATE_RESET:
         return {}
      default:
         return state
   }
}
