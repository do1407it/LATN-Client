import {
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGIN_FAILURE,
   USER_LOGOUT,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_REGISTER_FAILURE,
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,
   USER_DETAILS_FAILURE,
   USER_DETAILS_RESET,
   USER_UPDATE_PROFILE_REQUEST,
   USER_UPDATE_PROFILE_SUCCESS,
   USER_UPDATE_PROFILE_FAILURE,
   USER_UPDATE_PROFILE_RESET,
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
      case USER_REGISTER_REQUEST:
         return { loading: true }
      case USER_REGISTER_SUCCESS:
         return { loading: false, userInfo: payload }
      case USER_REGISTER_FAILURE:
         return { loading: false, error: payload }
      default:
         return state
   }
}

// GET USER DETAILS
export const userDetailsReducer = (state = { user: {} }, action) => {
   const { type, payload } = action
   switch (type) {
      case USER_DETAILS_REQUEST:
         return { ...state, loading: true }
      case USER_DETAILS_SUCCESS:
         return { loading: false, user: payload }
      case USER_DETAILS_FAILURE:
         return { loading: false, error: payload }
      case USER_DETAILS_RESET:
         return { user: {} }
      default:
         return state
   }
}

// UPDATE USER PROFILE
export const updateUserProfileReducer = (state = {}, action) => {
   const { type, payload } = action
   switch (type) {
      case USER_UPDATE_PROFILE_REQUEST:
         return { loading: true }
      case USER_UPDATE_PROFILE_SUCCESS:
         return { loading: false, success: true, userInfo: payload }
      case USER_UPDATE_PROFILE_FAILURE:
         return { loading: false, error: payload }
      case USER_UPDATE_PROFILE_RESET:
         return {}
      default:
         return state
   }
}
