import {
   ORDER_CREATE_REQUEST,
   ORDER_CREATE_SUCCESS,
   ORDER_CREATE_FAILURE,
   ORDER_CREATE_RESET,
} from '../actions/actionTypes'

export const orderCreateReducer = (state = { user: {} }, action) => {
   const { type, payload } = action
   switch (type) {
      case ORDER_CREATE_REQUEST:
         return { loading: true }
      case ORDER_CREATE_SUCCESS:
         return { loading: false, success: true, order: payload }
      case ORDER_CREATE_FAILURE:
         return { loading: false, error: payload }
      case ORDER_CREATE_RESET:
         return {}
      default:
         return state
   }
}
