import React, { useEffect, useState } from 'react'
import Header from './../components/Header'
import Rating from '../components/homeComponents/Rating'
import { Link } from 'react-router-dom'
import Message from './../components/LoadingError/Error'
import { useDispatch, useSelector } from 'react-redux'
import { productDetail } from '../redux/actions/ProductActions'
import Loading from '../components/LoadingError/Loading'
import { productReview } from '../redux/actions/ProductActions'
import moment from 'moment'

const SingleProduct = ({ history, match }) => {
   const [qty, setQty] = useState(1)
   const [rating, setRating] = useState(0)
   const [comment, setComment] = useState('')

   const dispatch = useDispatch()
   const productId = match?.params?.id
   const { loading, error, product } = useSelector((state) => state.productDetail)
   const { userInfo } = useSelector((state) => state.userLogin)

   const {
      success: successCreateReview,
      error: errorCreateReview,
      review,
   } = useSelector((state) => state.productReview)
   useEffect(() => {
      dispatch(productDetail(productId))
   }, [dispatch, productId, successCreateReview, errorCreateReview])
   useEffect(() => {
      if (successCreateReview) {
         alert(review)
         setRating(0)
         setComment('')
         dispatch({ type: 'REVIEW_CREATE_RESET' })
      } else if (errorCreateReview) {
         alert(errorCreateReview)
         dispatch({ type: 'REVIEW_CREATE_RESET' })
      }
   }, [dispatch, successCreateReview, errorCreateReview, review])

   const handleAddCard = (e) => {
      e.preventDefault()
      history.push(`/cart/${productId}?qty=${qty}`)
   }
   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(
         productReview(productId, {
            rating,
            comment,
         })
      )
   }
   return (
      <>
         <Header />
         {loading ? (
            <Loading />
         ) : error ? (
            <Message variant='alert-danger '>{error}</Message>
         ) : (
            <div className='container single-product'>
               {/* DETAIL */}
               <div className='row'>
                  <div className='col-md-6'>
                     <div className='single-image'>
                        <img src={product?.image} alt={product?.name} />
                     </div>
                  </div>
                  <div className='col-md-6'>
                     <div className='product-dtl'>
                        <div className='product-info'>
                           <div className='product-name'>{product?.name}</div>
                        </div>
                        <p>{product?.description}</p>

                        <div className='product-count col-lg-7 '>
                           <div className='flex-box d-flex justify-content-between align-items-center'>
                              <h6>Price</h6>
                              <span>${product?.price}</span>
                           </div>
                           <div className='flex-box d-flex justify-content-between align-items-center'>
                              <h6>Status</h6>
                              {product?.countInStock > 0 ? (
                                 <span>In Stock</span>
                              ) : (
                                 <span>unavailable</span>
                              )}
                           </div>
                           <div className='flex-box d-flex justify-content-between align-items-center'>
                              <h6>Reviews</h6>
                              <Rating
                                 value={product?.rating}
                                 text={`${product?.numReviews} reviews`}
                              />
                           </div>
                           {product?.countInStock > 0 ? (
                              <>
                                 <div className='flex-box d-flex justify-content-between align-items-center'>
                                    <h6>Quantity</h6>
                                    <select onChange={(e) => setQty(parseInt(e.target.value))}>
                                       {[...Array(product?.countInStock).keys()].map((x) => (
                                          <option key={x + 1} value={x + 1}>
                                             {x + 1}
                                          </option>
                                       ))}
                                    </select>
                                 </div>
                                 <button onClick={handleAddCard} className='round-black-btn'>
                                    Add To Cart
                                 </button>
                              </>
                           ) : (
                              <div className='flex-box  center-text  align-items-center'>
                                 <h6 style={{ color: 'red' }}>Sold out</h6>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>

               {/* RATING */}
               <div className='row my-5'>
                  <div className='col-md-6'>
                     <h6 className='mb-3'>REVIEWS</h6>
                     {product?.reviews.length === 0 && (
                        <Message variant={'alert-info mt-3'}>No Reviews</Message>
                     )}

                     {product.reviews.length > 0 &&
                        product.reviews.map((review) => (
                           <div
                              key={review._id}
                              className='mb-5 mb-md-3 bg-light p-3 shadow-sm rounded'
                           >
                              <strong>{review.name}</strong>
                              <Rating value={review.rating} />
                              <span>{moment(review.createdAt).calendar()}</span>
                              <div className='alert alert-info mt-3'>{review.comment}</div>
                           </div>
                        ))}
                  </div>
                  <div className='col-md-6'>
                     <h6>WRITE A CUSTOMER REVIEW</h6>
                     <div className='my-4'></div>

                     {userInfo ? (
                        <form onSubmit={submitHandler}>
                           <div className='my-4'>
                              <strong>Rating</strong>
                              <select
                                 value={rating}
                                 onChange={(e) => setRating(e.target.value)}
                                 className='col-12 bg-light p-3 mt-2 border-0 rounded'
                              >
                                 <option value=''>Choice...</option>
                                 <option value='1'>1 - Poor</option>
                                 <option value='2'>2 - Fair</option>
                                 <option value='3'>3 - Good</option>
                                 <option value='4'>4 - Very Good</option>
                                 <option value='5'>5 - Excellent</option>
                              </select>
                           </div>
                           <div className='my-4'>
                              <strong>Comment</strong>
                              <textarea
                                 value={comment}
                                 onChange={(e) => setComment(e.target.value)}
                                 row='3'
                                 className='col-12 bg-light p-3 mt-2 border-0 rounded'
                              ></textarea>
                           </div>
                           <div className='my-3'>
                              <button className='col-1 round-black-btn border-0 p-3 rounded text-white'>
                                 COMMENT
                              </button>
                           </div>
                        </form>
                     ) : (
                        <div className='my-3'>
                           <Message variant={'alert-warning'}>
                              Please{' '}
                              <Link to='/login'>
                                 " <strong>Login</strong> "
                              </Link>{' '}
                              to write a review{' '}
                           </Message>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         )}
      </>
   )
}

export default SingleProduct
