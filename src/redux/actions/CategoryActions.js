import axios from 'axios'
import { CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAILURE } from './actionTypes'

export const listCategories = () => async (dispatch, getState) => {
   try {
      dispatch({ type: CATEGORY_LIST_REQUEST })

      const { data } = await axios.get('/api/category')

      dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })
   } catch (error) {
      dispatch({
         type: CATEGORY_LIST_FAILURE,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}
