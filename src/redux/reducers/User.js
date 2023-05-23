import {
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGIN_FAILURE,
   USER_LOGOUT,
} from '../actions/actionTypes'

export const userLoginReducer = (state = {}, action) => {
   const { type, payload } = action
   switch (type) {
      case USER_LOGIN_REQUEST:
         return { loading: true }
      case USER_LOGIN_SUCCESS:
         return { loading: false, userInfo: payload }
      case USER_LOGIN_FAILURE:
         return { loading: false, error: payload }
      case USER_LOGOUT:
         return {}
      default:
         return state
   }
}

// REGISTER
export const registerUserReducer = (state = {}, action) => {
   const { type, payload } = action
   switch (type) {
      case 'USER_REGISTER_REQUEST':
         return { loading: true }
      case 'USER_REGISTER_SUCCESS':
         return { loading: false, userInfo: payload }
      case 'USER_REGISTER_FAILURE':
         return { loading: false, error: payload }
      default:
         return state
   }
}
