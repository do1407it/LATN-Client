import { CART_ADD_ITEM, CART_REMOVE_ITEM, REMOVE_ALL_CART_ITEMS } from '../actions/actionTypes'

export const cartReducer = (state = { cartItems: [] }, action) => {
   const { type, payload } = action

   switch (type) {
      case CART_ADD_ITEM:
         const item = payload
         const existItem = state.cartItems.find((x) => x.product === item.product)

         if (existItem) {
            return {
               ...state,
               cartItems: state.cartItems.map((x) => (x.product === existItem.product ? item : x)),
            }
         } else {
            return {
               ...state,
               cartItems: [...state.cartItems, item],
            }
         }
      case CART_REMOVE_ITEM:
         return {
            ...state,
            cartItems: state.cartItems.filter((x) => x.product !== payload),
         }
      case REMOVE_ALL_CART_ITEMS:
         return {
            ...state,
            cartItems: [],
         }
      default:
         return state
   }
}
