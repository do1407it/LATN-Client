import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { getProductDetailsReducer, getProductListReducer } from './reducers/Product'
import { cartReducer } from './reducers/Cart'
import { userLoginReducer, registerUserReducer } from './reducers/User'

const reducer = combineReducers({
   productList: getProductListReducer,
   productDetail: getProductDetailsReducer,
   cart: cartReducer,
   userLogin: userLoginReducer,
   userRegister: registerUserReducer,
})

// Local Storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
   ? JSON.parse(localStorage.getItem('cartItems'))
   : []

const userInfoFromStorage = localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo'))
   : null

const initialState = {
   cart: { cartItems: cartItemsFromStorage },
   userLogin: { userInfo: userInfoFromStorage },
}
const middeware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middeware)))

export default store
