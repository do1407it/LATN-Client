import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from './../components/Header'
import { useSelector, useDispatch } from 'react-redux'
import { createOrder } from './../redux/actions/OrderActions'
import Message from '../components/LoadingError/Error'
import DiscountSreen from './DiscountScreen'

const PlaceOrderScreen = ({ history }) => {
   window.scrollTo(0, 0)
   const dispatch = useDispatch()
   const cart = useSelector((state) => state.cart)
   const { cartItems, shippingAddress, paymentMethod } = cart
   const { userInfo } = useSelector((state) => state.userLogin)
   const { order, success, error } = useSelector((state) => state.orderCreate)
   const { coupon } = useSelector((state) => state.applyCoupon)

   //Calculate Price
   const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
   }

   cart.itemsPrice = addDecimals(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
   )

   cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 30)
   cart.taxPrice = addDecimals(Number((0.2 * cart.itemsPrice).toFixed(2)))
   cart.totalPrice =
      Number(cart.itemsPrice ?? 0) +
      Number(cart.shippingPrice ?? 0) +
      Number(cart.taxPrice ?? 0) -
      Number(coupon?.discount ? cart?.itemsPrice * (coupon?.discount / 100) : 0)

   useEffect(() => {
      if (!userInfo) {
         history.push('/login')
      }
      if (success) {
         history.push(`/order/${order._id}`)
         dispatch({ type: 'ORDER_CREATE_RESET' })
      }
   }, [dispatch, history, userInfo, success, order, cart])

   const placeOrderHandler = (e) => {
      e.preventDefault()
      dispatch(createOrder({ ...cart, orderItems: cart.cartItems, coupon: coupon?._id }))
   }

   return (
      <>
         <Header />
         <div className='container'>
            {cartItems.length > 0 && <DiscountSreen />}

            <div className='row  order-detail'>
               <div className='col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0'>
                  <div className='row '>
                     <div className='col-md-4 center'>
                        <div className='alert-success order-box'>
                           <i class='fas fa-user'></i>
                        </div>
                     </div>
                     <div className='col-md-8 center'>
                        <h5>
                           <strong>Customer</strong>
                        </h5>
                        <p>user: {userInfo?.name ?? 'N/A'}</p>
                        <p>email: {userInfo?.email ?? 'N/A'}</p>
                        <p>number: {userInfo?.phone ?? 'N/A'}</p>
                     </div>
                  </div>
               </div>
               {/* 2 */}
               <div className='col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0'>
                  <div className='row'>
                     <div className='col-md-4 center'>
                        <div className='alert-success order-box'>
                           <i className='fas fa-truck-moving'></i>
                        </div>
                     </div>
                     <div className='col-md-8 center'>
                        <h5>
                           <strong>Order info</strong>
                        </h5>
                        <p>Shipping: {shippingAddress?.address ?? 'N/A'}</p>
                        <p>Pay method: {paymentMethod ?? 'N/A'}</p>
                     </div>
                  </div>
               </div>
               {/* 3 */}
               <div className='col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0'>
                  <div className='row'>
                     <div className='col-md-4 center'>
                        <div className='alert-success order-box'>
                           <i className='fas fa-map-marker-alt'></i>
                        </div>
                     </div>
                     <div className='col-md-8 center'>
                        <h5>
                           <strong>Deliver to</strong>
                        </h5>
                        <p>
                           Address: {shippingAddress?.city ?? 'N/A'},
                           {shippingAddress?.country ?? 'N/A'}
                        </p>
                        <p>Code: {shippingAddress?.postalCode ?? 'N/A'}</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className='row order-products justify-content-between'>
               <div className='col-lg-8'>
                  {/* <Message variant="alert-info mt-5">Your cart is empty</Message> */}
                  {cartItems.length === 0
                     ? 'Your cart is empty'
                     : cartItems.map((item, index) => (
                          <div key={index} className='order-product row'>
                             <div className='col-md-3 col-6'>
                                <img src={item.image} alt={item.name} />
                             </div>
                             <div className='col-md-5 col-6 d-flex align-items-center'>
                                <Link to={`/products/${item.product}`}>
                                   <h6>
                                      {item.name.length > 20
                                         ? item.name.slice(0, 20) + '...'
                                         : item.name}
                                   </h6>
                                </Link>
                             </div>
                             <div className='mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center '>
                                <h4>QUANTITY</h4>
                                <h6>{item?.qty}</h6>
                             </div>
                             <div className='mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center '>
                                <h4>SUBTOTAL</h4>
                                <h6>${item?.qty * item?.price}</h6>
                             </div>
                          </div>
                       ))}
               </div>
               {/* total */}

               <div className='col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order'>
                  <table className='table table-bordered'>
                     <tbody>
                        <tr>
                           <td>
                              <strong>Products</strong>
                           </td>
                           <td>${cart?.itemsPrice}</td>
                        </tr>
                        <tr>
                           <td>
                              <strong>Shipping</strong>
                           </td>
                           <td>${cart?.shippingPrice}</td>
                        </tr>
                        <tr>
                           <td>
                              <strong>Tax</strong>
                           </td>
                           <td>${cart?.taxPrice}</td>
                        </tr>
                        <tr>
                           <td>
                              <strong>Discount</strong>
                           </td>
                           <td>
                              {coupon?.code}
                              {coupon?.code && (
                                 <button onClick={() => dispatch({ type: 'COUPON_APPLY_RESET' })}>
                                    No use coupon
                                 </button>
                              )}
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <strong>Total</strong>
                           </td>
                           <td>${cart?.totalPrice}</td>
                        </tr>
                     </tbody>
                  </table>
                  {cartItems.length === 0 ? null : (
                     <button type='submit' onClick={placeOrderHandler}>
                        Confirm order
                     </button>
                  )}

                  {error && (
                     <div className='my-3 col-12'>
                        <Message variant='alert-danger'>{error}</Message>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </>
   )
}

export default PlaceOrderScreen
