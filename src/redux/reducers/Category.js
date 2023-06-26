import {
   CATEGORY_LIST_REQUEST,
   CATEGORY_LIST_SUCCESS,
   CATEGORY_LIST_FAILURE,
} from '../actions/actionTypes'

export const categoryListReducer = (state = { categories: [] }, action) => {
   const { type, payload } = action
   switch (type) {
      case CATEGORY_LIST_REQUEST:
         return { loading: true, categories: [] }
      case CATEGORY_LIST_SUCCESS:
         return { loading: false, categories: payload }
      case CATEGORY_LIST_FAILURE:
         return { loading: false, error: payload }
      default:
         return state
   }
}
