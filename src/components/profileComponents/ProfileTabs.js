import React, { useState, useEffect, useRef, useMemo, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../LoadingError/Error'
import Loading from '../LoadingError/Loading'
import Toast from '../LoadingError/Toast'
import { toast } from 'react-toastify'
import { updateUserProfile } from '../../redux/actions/UserActions'
import convertBase64 from '../../utils/converBase64'

const ProfileTabs = () => {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [phone, setPhone] = useState('')
   const [url, setUrl] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')

   const dispatch = useDispatch()
   const { user } = useSelector((state) => state.userDetails)
   const {
      loading: loadingUpdate,
      error: errorUpdate,
      success,
   } = useSelector((state) => state.userUpdateProfile)
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

   useEffect(() => {
      if (user) {
         setName(user.name ?? '')
         setEmail(user.email ?? '')
         setPhone(user.phone ?? '')
      }
   }, [dispatch, user])

   useEffect(() => {
      if (success) {
         toastId.current = toast.success('Profile Updated Successfully', Toastobjects)
      }
   }, [success, toastId, Toastobjects])

   const submitHandler = (e) => {
      e.preventDefault()
      if (password !== confirmPassword) {
         // if (!toast.isActive(toastId.current)) {
         toastId.current = toast.error('Password does not match', Toastobjects)
         // }
      } else {
         dispatch(updateUserProfile({ id: user._id, name, email, phone, image: url, password }))
      }
   }
   const handleImageUpload = async (e) => {
      const file = e.target.files[0]
      const base64 = await convertBase64(file)
      setUrl(base64)
   }
   return (
      <>
         <Toast />
         {loadingUpdate && <Loading />}
         {errorUpdate && <Message variant='alert-danger'>{errorUpdate}</Message>}
         <form className='row  form-container' onSubmit={submitHandler}>
            <div className='col-md-12'>
               <div className='form'>
                  <label htmlFor='account-fn'>UserName</label>
                  <input
                     id='account-fn'
                     className='form-control'
                     type='text'
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     required
                  />
               </div>
            </div>

            <div className='col-md-12'>
               <div className='form'>
                  <label htmlFor='account-email'>E-mail Address</label>
                  <input
                     id='account-email'
                     className='form-control'
                     type='email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
            </div>
            <div className='col-md-12'>
               <div className='form'>
                  <label htmlFor='account-phone'>Phone</label>
                  <input
                     id='account-phone'
                     className='form-control'
                     type='text'
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     required
                  />
               </div>
            </div>
            <div className='col-md-6'>
               <div className='form'>
                  <label htmlFor='account-pass'>New Password</label>
                  <input
                     className='form-control'
                     type='password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
            </div>
            <div className='col-md-6'>
               <div className='form'>
                  <label htmlFor='account-confirm-pass'>Confirm Password</label>
                  <input
                     className='form-control'
                     type='password'
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                  />
               </div>
            </div>
            {/* file */}
            <input
               className='form-control mt-3'
               type='file'
               required
               onChange={handleImageUpload}
            />
            <button type='submit'>Update Profile</button>
         </form>
      </>
   )
}

export default memo(ProfileTabs)
