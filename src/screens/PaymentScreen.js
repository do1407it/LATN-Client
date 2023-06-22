import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from './../redux/actions/CartActions'
const PaymentScreen = ({ history }) => {
   window.scrollTo(0, 0)
   const ditpatch = useDispatch()
   const { shippingAddress } = useSelector((state) => state.cart)
   const [paymentMethod, setPaymentMethod] = useState('PayPal')
   
   if (Object.keys(shippingAddress).length === 0) {
      history.push('/shipping')
   }

   const submitHandler = (e) => {
      e.preventDefault()
      ditpatch(savePaymentMethod(paymentMethod))
      history.push('/placeorder')
   }
   return (
      <>
         <Header />
         <div className='container d-flex justify-content-center align-items-center login-center'>
            <form className='Login2 col-md-8 col-lg-4 col-11' onSubmit={submitHandler}>
               <h6>SELECT PAYMENT METHOD</h6>
               <div className='payment-container'>
                  <div className='radio-container'>
                     <input
                        className='form-check-input'
                        type='radio'
                        value={paymentMethod}
                        name='paymentMethod'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.checked)}
                     />
                     <label className='form-check-label'>PayPal or Credit Card</label>
                  </div>
               </div>

               <button type='submit'>
                  <Link to='/placeorder' className='text-white'>
                     Continue
                  </Link>
               </button>
            </form>
         </div>
      </>
   )
}

export default PaymentScreen
