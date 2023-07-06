import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Message from './../components/LoadingError/Error'
import Loading from '../components/LoadingError/Loading'
import { listCoupon } from '../redux/actions/CouponActions'
import moment from 'moment'

const DiscountSreen = () => {
   const dispatch = useDispatch()
   const { coupon, loading, error } = useSelector((state) => state.couponList)

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
                        <div className='col-md-4 center'>
                           <div>
                              <p>Code name: {item?.code}</p>
                              <h5>
                                 Discount <strong>{item?.discount}%</strong>
                              </h5>
                              <p>
                                 Expiration Date:
                                 {moment(item?.expirationDate).format('DD/MM/YYYY')}
                              </p>
                              <p>Count In Stock: {item?.countInStock}</p>
                              {item?.countInStock > 0 ? (
                                 <button onClick={() => handleApply(item)}>Apply</button>
                              ) : (
                                 <button disabled>Apply</button>
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
