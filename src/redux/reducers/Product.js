import {
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   PRODUCT_LIST_FAILURE,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_DETAILS_FAIL,
} from '../actions/actionTypes'

export const getProductListReducer = (state = { products: [] }, action) => {
   const { type, payload } = action
   switch (type) {
      case PRODUCT_LIST_REQUEST:
         return { loading: true, products: [] }
      case PRODUCT_LIST_SUCCESS:
         return { loading: false, products: payload }
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
