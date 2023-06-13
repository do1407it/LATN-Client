import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from './../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../components/LoadingError/Error'
import { login } from '../redux/actions/UserActions'
import Loading from '../components/LoadingError/Loading'

const Login = ({ location, history }) => {
   window.scrollTo(0, 0)
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()
   const redirect = location.search ? location.search.split('=')[1] : '/'
   console.log(redirect)
   const userLogin = useSelector((state) => state.userLogin)
   const { loading, error, userInfo } = userLogin

   useEffect(() => {
      if (userInfo) {
         history.push(redirect)
      }
   }, [dispatch, userInfo, history, redirect])

   const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
   }

   return (
      <>
         <Header />
         <div className='container d-flex flex-column justify-content-center align-items-center login-center'>
            {error && <Message variant='alert-danger'>{error}</Message>}
            {loading && <Loading />}
            <form className='Login col-md-8 col-lg-4 col-11' onSubmit={handleSubmit}>
               <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
               <input
                  type='password'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
               />
               <button type='submit'>Login</button>
               <p>
                  <Link to={redirect ? `/register?register=${redirect}` : '/register'}>
                     Create Account
                  </Link>
               </p>
            </form>
         </div>
      </>
   )
}

export default Login
