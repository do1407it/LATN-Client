import {
   COUPON_LIST_REQUEST,
   COUPON_LIST_SUCCESS,
   COUPON_LIST_FAILURE,
   COUPON_APPLY_REQUEST,
   COUPON_APPLY_SUCCESS,
   COUPON_APPLY_FAILURE,
   COUPON_APPLY_RESET,
} from '../actions/actionTypes'

export const couponApplyReducer = (state = {}, action) => {
   const { type, payload } = action
   switch (type) {
      case COUPON_APPLY_REQUEST:
         return { loading: true }
      case COUPON_APPLY_SUCCESS:
         return { loading: false, success: true, coupon: payload }
      case COUPON_APPLY_FAILURE:
         return { loading: false, error: payload }
      case COUPON_APPLY_RESET:
         return {}
      default:
         return state
   }
}

export const couponListReducer = (state = { coupon: [] }, action) => {
   const { type, payload } = action
   switch (type) {
      case COUPON_LIST_REQUEST:
         return { loading: true }
      case COUPON_LIST_SUCCESS:
         return { loading: false, coupon: payload }
      case COUPON_LIST_FAILURE:
         return { loading: false, error: payload }
      default:
         return state
   }
}
