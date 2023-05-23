import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from './../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/actions/UserActions'
import Message from './../components/LoadingError/Error'
import Loading from '../components/LoadingError/Loading'

const Register = ({ history, location }) => {
   window.scrollTo(0, 0)
   const dispatch = useDispatch()
   const { userInfo: registerUser, error, loading } = useSelector((state) => state.userRegister)
   const { userInfo: loginUserInfo } = useSelector((state) => state.userLogin)

   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const redirect = location.search ? location.search.split('=')[1] : '/'
   console.log(redirect)
   const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(register(username, email, password))
   }

   useEffect(() => {
      if (registerUser) {
         history.push(redirect)
      }
      if (loginUserInfo) {
         history.push(redirect)
      }
   }, [dispatch, registerUser, history, redirect, loginUserInfo])
   return (
      <>
         <Header />
         <div className='container d-flex flex-column justify-content-center align-items-center login-center'>
            {error && <Message variant='alert-danger'>{error}</Message>}
            {loading && <Loading />}
            <form className='Login col-md-8 col-lg-4 col-11' onSubmit={handleSubmit}>
               <input
                  type='text'
                  placeholder='Username'
                  onChange={(e) => setUsername(e.target.value)}
               />
               <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
               <input
                  type='password'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
               />

               <button type='submit'>Register</button>
               <p>
                  <Link to={'/login'}>
                     I Have Account <strong>Login</strong>
                  </Link>
               </p>
            </form>
         </div>
      </>
   )
}

export default Register
