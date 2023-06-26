import {
   ORDER_CREATE_REQUEST,
   ORDER_CREATE_SUCCESS,
   ORDER_CREATE_FAILURE,
   ORDER_CREATE_RESET,
   ORDER_DETAILS_REQUEST,
   ORDER_DETAILS_SUCCESS,
   ORDER_DETAILS_FAILURE,
   ORDER_PAY_REQUEST,
   ORDER_PAY_SUCCESS,
   ORDER_PAY_FAILURE,
   ORDER_PAY_RESET,
   ORDER_LIST_MY_REQUEST,
   ORDER_LIST_MY_SUCCESS,
   ORDER_LIST_MY_FAILURE,
   ORDER_LIST_MY_RESET,
   MAIL_SEND_REQUEST,
   MAIL_SEND_SUCCESS,
   MAIL_SEND_FAILURE,
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

export const orderDetailsReducer = (
   state = { loading: true, orderItems: [], shippingAddress: {} },
   action
) => {
   const { type, payload } = action
   switch (type) {
      case ORDER_DETAILS_REQUEST:
         return { ...state, loading: true }
      case ORDER_DETAILS_SUCCESS:
         return { loading: false, order: payload }
      case ORDER_DETAILS_FAILURE:
         return { loading: false, error: payload }
      default:
         return state
   }
}

export const orderPayReducer = (state = {}, action) => {
   const { type, payload } = action
   switch (type) {
      case ORDER_PAY_REQUEST:
         return { loading: true }
      case ORDER_PAY_SUCCESS:
         return { loading: false, success: true }
      case ORDER_PAY_FAILURE:
         return { loading: false, error: payload }
      case ORDER_PAY_RESET:
         return {}
      default:
         return state
   }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
   const { type, payload } = action
   switch (type) {
      case ORDER_LIST_MY_REQUEST:
         return { loading: true }
      case ORDER_LIST_MY_SUCCESS:
         return { loading: false, orders: payload }
      case ORDER_LIST_MY_FAILURE:
         return { loading: false, error: payload }
      case ORDER_LIST_MY_RESET:
         return { orders: [] }
      default:
         return state
   }
}

export const sendMailReducer = (state = {}, action) => {
   const { type, payload } = action
   switch (type) {
      case MAIL_SEND_REQUEST:
         return { loading: true }
      case MAIL_SEND_SUCCESS:
         return { loading: false, success: true }
      case MAIL_SEND_FAILURE:
         return { loading: false, error: payload }
      default:
         return state
   }
}
