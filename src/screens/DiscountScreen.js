import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Message from './../components/LoadingError/Error'
import Loading from '../components/LoadingError/Loading'
import { listCoupon } from '../redux/actions/CouponActions'
import moment from 'moment'

const DiscountSreen = () => {
   const dispatch = useDispatch()
   const { coupon, loading, error } = useSelector((state) => state.couponList)
   const today = new Date()
   useEffect(() => {
      dispatch(listCoupon())
   }, [dispatch])

   const handleApply = (item) => {
      dispatch({ type: 'COUPON_APPLY_RESET' })

      dispatch({ type: 'COUPON_APPLY_SUCCESS', payload: item })
   }
   return (
      <>
         {/* create box discount apply*/}
         <div className='col-lg-12 col-sm-4 mb-lg-4 mb-5 mb-sm-0'>
            {loading ? (
               <Loading />
            ) : error ? (
               <Message variant='alert-danger '>{error}</Message>
            ) : (
               <div className='row'>
                  {coupon &&
                     coupon.map((item) => (
                        <div
                           className='col-md-4 center'
                           style={{
                              marginBottom: '30px',
                           }}
                        >
                           <div>
                              <p>Code name: {item?.code}</p>
                              <h5>
                                 Discount <strong>{item?.discount}%</strong>
                              </h5>
                              <p>
                                 Expiration Date:
                                 {moment(item?.expirationDate).format('DD/MM/YYYY')}
                              </p>
                              {console.log(Date)}
                              <p>Count In Stock: {item?.countInStock}</p>
                              {console.log(item?.expirationDate)}
                              {item?.countInStock <= 0 ||
                              new Date(item?.expirationDate) <= new Date() ? (
                                 <button disabled>Apply</button>
                              ) : (
                                 <button onClick={() => handleApply(item)}>Apply</button>
                              )}
                           </div>
                        </div>
                     ))}
               </div>
            )}
         </div>
      </>
   )
}

export default DiscountSreen
