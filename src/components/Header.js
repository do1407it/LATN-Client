import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions/UserActions'
import { removeAllCartItems } from '../redux/actions/CartActions'
import { useHistory } from 'react-router-dom'

const Header = () => {
   window.scrollTo(0, 920)

   const [keyword, setKeyword] = useState()
   const history = useHistory()
   const dispatch = useDispatch()
   const { cartItems } = useSelector((state) => state.cart)
   const { userInfo } = useSelector((state) => state.userLogin)
   const logoutHandler = () => {
      dispatch(logout())
      dispatch(removeAllCartItems())
   }
   const submitHandler = (e) => {
      e.preventDefault()
      if (keyword) {
         history.push(`/search/${keyword}`)
      } else {
         history.push('/')
      }
   }
   return (
      <div>
         {/* Top Header */}
         <div className='Announcement '>
            <div className='container'>
               <div className='row'>
                  <div className='col-md-6 d-flex align-items-center display-none'>
                     <p>+0909399869</p>
                     <p>dotran260@gmail.com</p>
                  </div>
                  <div className=' col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center'>
                     <Link to=''>
                        <i className='fab fa-facebook-f'></i>
                     </Link>
                     <Link to=''>
                        <i className='fab fa-instagram'></i>
                     </Link>
                     <Link to=''>
                        <i className='fab fa-linkedin-in'></i>
                     </Link>
                     <Link to=''>
                        <i className='fab fa-youtube'></i>
                     </Link>
                     <Link to=''>
                        <i className='fab fa-pinterest-p'></i>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
         {/* Header */}
         <div className='header'>
            <div className='container'>
               {/* MOBILE HEADER */}
               <div className='mobile-header'>
                  <div className='container '>
                     <div className='row '>
                        <div className='col-6 d-flex align-items-center'>
                           <Link className='navbar-brand' to='/'>
                              <img alt='logo' src='/images/logo.png' />
                           </Link>
                        </div>
                        <div className='col-6 d-flex align-items-center justify-content-end Login-Register'>
                           {userInfo ? (
                              <div className='btn-group'>
                                 <button
                                    type='button'
                                    className='name-button dropdown-toggle'
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                 >
                                    <i class='fas fa-user'></i>
                                    {userInfo?.name}
                                 </button>
                                 <div className='dropdown-menu'>
                                    <Link className='dropdown-item' to='/profile'>
                                       Profile
                                    </Link>

                                    <Link className='dropdown-item' to='#' onClick={logoutHandler}>
                                       Logout
                                    </Link>
                                 </div>
                              </div>
                           ) : (
                              <div className='btn-group'>
                                 <button
                                    type='button'
                                    className='name-button dropdown-toggle'
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                 >
                                    <i class='fas fa-user'></i>
                                 </button>
                                 <div className='dropdown-menu'>
                                    <Link className='dropdown-item' to='/login'>
                                       Login
                                    </Link>

                                    <Link className='dropdown-item' to='/register'>
                                       Register
                                    </Link>
                                 </div>
                              </div>
                           )}

                           <Link to='/cart' className='cart-mobile-icon'>
                              <i className='fas fa-shopping-bag'></i>
                              <span className='badge'>{cartItems.length}</span>
                           </Link>
                        </div>
                        <div className='col-12 d-flex align-items-center'>
                           <form onSubmit={submitHandler} className='input-group'>
                              <input
                                 type='search'
                                 className='form-control rounded search'
                                 placeholder='Search here'
                                 onChange={(e) => setKeyword(e.target.value)}
                              />
                              <button type='submit' className='search-button'>
                                 <FontAwesomeIcon icon={faMagnifyingGlass} />
                              </button>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>

               {/* PC HEADER */}
               <div className='pc-header'>
                  <div className='row'>
                     <div className='col-md-3 col-4 d-flex align-items-center'>
                        <Link className='navbar-brand' to='/'>
                           <img alt='logo' src='/images/logo.png' />
                        </Link>
                     </div>
                     <div className='col-md-6 col-8 d-flex align-items-center'>
                        <form className='input-group' onSubmit={submitHandler}>
                           <input
                              type='search'
                              className='form-control rounded search'
                              placeholder='Search'
                              onChange={(e) => setKeyword(e.target.value)}
                           />
                           <button type='submit' className='search-button'>
                              search
                           </button>
                        </form>
                     </div>
                     <div className='col-md-3 d-flex align-items-center justify-content-end Login-Register'>
                        {userInfo ? (
                           <div className='btn-group'>
                              <button
                                 type='button'
                                 className='name-button dropdown-toggle'
                                 data-toggle='dropdown'
                                 aria-haspopup='true'
                                 aria-expanded='false'
                              >
                                 Hi, {userInfo.name}
                              </button>
                              <div className='dropdown-menu'>
                                 <Link className='dropdown-item' to='/profile'>
                                    Profile
                                 </Link>

                                 <Link className='dropdown-item' to='#' onClick={logoutHandler}>
                                    Logout
                                 </Link>
                              </div>
                           </div>
                        ) : (
                           <>
                              <Link to='/register'>Register</Link>
                              <Link to='/login'>Login</Link>
                           </>
                        )}

                        <Link to='/cart'>
                           <i className='fas fa-shopping-bag'></i>
                           <span className='badge'>{cartItems?.length ?? '0'}</span>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Header
