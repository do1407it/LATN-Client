import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
   getProductDetailsReducer,
   getProductListReducer,
   productReviewReducer,
} from './reducers/Product'
import { cartReducer } from './reducers/Cart'
import {
   userLoginReducer,
   registerUserReducer,
   userDetailsReducer,
   updateUserProfileReducer,
} from './reducers/User'

import {
   orderCreateReducer,
   orderDetailsReducer,
   orderPayReducer,
   orderListMyReducer,
   sendMailReducer,
} from './reducers/Orders'

import { categoryListReducer } from './reducers/Category'
import { couponListReducer, couponApplyReducer } from './reducers/Coupon'

const reducer = combineReducers({
   productList: getProductListReducer,
   productDetail: getProductDetailsReducer,
   productReview: productReviewReducer,

   categoryList: categoryListReducer,

   cart: cartReducer,

   userLogin: userLoginReducer,
   userRegister: registerUserReducer,
   userDetails: userDetailsReducer,
   userUpdateProfile: updateUserProfileReducer,

   orderCreate: orderCreateReducer,
   orderDetails: orderDetailsReducer,
   orderPay: orderPayReducer,
   orderListMy: orderListMyReducer,

   couponList: couponListReducer,
   applyCoupon: couponApplyReducer,

   sendMail: sendMailReducer,
})

// Local Storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
   ? JSON.parse(localStorage.getItem('cartItems'))
   : []

const userInfoFromStorage = localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo'))
   : null

const shippingAddressLocalStorage = localStorage.getItem('shippingAddress')
   ? JSON.parse(localStorage.getItem('shippingAddress'))
   : {}

const paymentMethodLocalStorage = localStorage.getItem('paymentMethod')
   ? JSON.parse(localStorage.getItem('paymentMethod'))
   : 'PayPal'

const initialState = {
   cart: {
      cartItems: cartItemsFromStorage,
      shippingAddress: shippingAddressLocalStorage,
      paymentMethod: paymentMethodLocalStorage,
   },
   userLogin: { userInfo: userInfoFromStorage },
}
const middeware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middeware)))

export default store
