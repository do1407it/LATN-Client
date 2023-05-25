import React, { useState, useMemo, useRef } from 'react'

import Header from '../components/Header'
import { useSelector, useDispatch } from 'react-redux'
import { saveShippingAddress } from '../redux/actions/CartActions'
import Toast from '../components/LoadingError/Toast'
import { toast } from 'react-toastify'

const ShippingScreen = ({ history }) => {
   window.scrollTo(0, 0)
   const toastId = useRef(null)

   const Toastobjects = useMemo(
      () => ({
         pauseOnFocusLoss: false,
         draggable: false,
         pauseOnHover: false,
         autoClose: 2000,
      }),
      []
   )

   const dispatch = useDispatch()
   const { shippingAddress } = useSelector((state) => state.cart)
   const [address, setAddress] = useState(shippingAddress?.address ?? '')
   const [city, setCity] = useState(shippingAddress?.city ?? '')
   const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode ?? '')
   const [country, setCountry] = useState(shippingAddress?.country ?? '')

   const submitHandler = (e) => {
      e.preventDefault()
      if (
         address.trim().length === 0 ||
         city.trim().length === 0 ||
         postalCode.trim().length === 0 ||
         country.trim().length === 0
      ) {
         if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error('Please fill all the fields', Toastobjects)
         }
         return
      }

      dispatch(saveShippingAddress({ address, city, postalCode, country }))
      history.push('/payment')
   }

   return (
      <>
         <Toast />
         <Header />
         <div className='container d-flex justify-content-center align-items-center login-center'>
            <form className='Login col-md-8 col-lg-4 col-11' onSubmit={submitHandler}>
               <h6>DELIVERY ADDRESS</h6>
               <input
                  type='text'
                  placeholder='Enter address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
               />
               <input
                  type='text'
                  placeholder='Enter city'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
               />
               <input
                  type='text'
                  placeholder='Enter postal code'
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
               />
               <input
                  type='text'
                  placeholder='Enter country'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
               />
               <button type='submit'>Continue</button>
            </form>
         </div>
      </>
   )
}

export default ShippingScreen
