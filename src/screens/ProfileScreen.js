import React, { useEffect } from 'react'
import Header from '../components/Header'
import ProfileTabs from '../components/profileComponents/ProfileTabs'
import Orders from './../components/profileComponents/Orders'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../redux/actions/UserActions'
import Message from './../components/LoadingError/Error'
import Loading from '../components/LoadingError/Loading'
import { listMyOrders } from '../redux/actions/OrderActions'
import moment from 'moment'

const ProfileScreen = () => {
   window.scrollTo(0, 0)
   const dispatch = useDispatch()
   const { loading, userInfo, error } = useSelector((state) => state.userLogin)

   const {
      loading: loadingList,
      error: errorList,
      orders,
   } = useSelector((state) => state.orderListMy)

   useEffect(() => {
      dispatch(getUserDetails())
      dispatch(listMyOrders())
   }, [dispatch])

   return (
      <>
         <Header />
         <div className='container mt-lg-5 mt-3'>
            {loading ? (
               <Loading />
            ) : error ? (
               <Message variant='alert-danger '>{error}</Message>
            ) : (
               <div className='row align-items-start'>
                  <div className='col-lg-4 p-0 shadow '>
                     <div className='author-card pb-0 pb-md-3'>
                        <div className='author-card-cover'></div>
                        <div className='author-card-profile row'>
                           <div className='author-card-avatar col-md-5'>
                              <img
                                 src={userInfo?.image ?? './images/user.png'}
                                 alt='userprofileimage'
                              />
                           </div>
                           <div className='author-card-details col-md-7'>
                              <h5 className='author-card-name mb-2'>
                                 <strong>{userInfo?.name}</strong>
                              </h5>
                              <span className='author-card-position'>
                                 <>Joined: {moment(userInfo?.createdAt).format('LL')}</>
                              </span>
                           </div>
                        </div>
                     </div>
                     <div className='wizard pt-3 '>
                        <div className='d-flex align-items-start'>
                           <div
                              className='nav align-items-start flex-column col-12 nav-pills me-3 '
                              id='v-pills-tab'
                              role='tablist'
                              aria-orientation='vertical'
                           >
                              <button
                                 className='nav-link active'
                                 id='v-pills-home-tab'
                                 data-bs-toggle='pill'
                                 data-bs-target='#v-pills-home'
                                 type='button'
                                 role='tab'
                                 aria-controls='v-pills-home'
                                 aria-selected='true'
                              >
                                 Profile Settings
                              </button>
                              <button
                                 className='nav-link d-flex justify-content-between'
                                 id='v-pills-profile-tab'
                                 data-bs-toggle='pill'
                                 data-bs-target='#v-pills-profile'
                                 type='button'
                                 role='tab'
                                 aria-controls='v-pills-profile'
                                 aria-selected='false'
                              >
                                 Orders List
                                 {orders?.length > 0 && (
                                    <span className='badge2'>{orders?.length}</span>
                                 )}
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* panels */}
                  <div class='tab-content col-lg-8 pb-5 pt-lg-0 pt-3' id='v-pills-tabContent'>
                     <div
                        class='tab-pane fade show active'
                        id='v-pills-home'
                        role='tabpanel'
                        aria-labelledby='v-pills-home-tab'
                     >
                        <ProfileTabs />
                     </div>
                     <div
                        class='tab-pane fade'
                        id='v-pills-profile'
                        role='tabpanel'
                        aria-labelledby='v-pills-profile-tab'
                     >
                        <Orders data={orders} loading={loadingList} error={errorList} />
                     </div>
                  </div>
               </div>
            )}
         </div>
      </>
   )
}

export default ProfileScreen
