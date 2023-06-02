import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import Pagination from './pagination'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../redux/actions/ProductActions'
import Message from '../LoadingError/Error'
import Loading from '../LoadingError/Loading'

const ShopSection = ({ keyword, pageNumber }) => {
   const dispatch = useDispatch()
   const { loading, error, products } = useSelector((state) => state.productList)

   useEffect(() => {
      dispatch(listProducts(keyword, pageNumber))
   }, [dispatch, keyword, pageNumber])

   return (
      <>
         <div className='container'>
            {loading ? (
               <Loading />
            ) : error ? (
               <Message variant='alert-danger '>{error}</Message>
            ) : (
               <div className='section'>
                  <div className='row'>
                     <div className='col-lg-12 col-md-12 article'>
                        <div className='shopcontainer row'>
                           {products?.products.map((product) => (
                              <div className='shop col-lg-4 col-md-6 col-sm-6' key={product?._id}>
                                 <div className='border-product'>
                                    <Link to={`/products/${product?._id}`}>
                                       <div className='shopBack'>
                                          <img src={product?.image} alt={product?.name} />
                                       </div>
                                    </Link>
                                    <div className='shoptext'>
                                       <p>
                                          <Link to={`/products/${product?._id}`}>
                                             {product?.name}
                                          </Link>
                                       </p>
                                       <Rating
                                          value={product?.rating}
                                          text={`${product?.numReviews} reviews`}
                                       />
                                       <h3>${product?.price}</h3>
                                    </div>
                                 </div>
                              </div>
                           ))}
                           {/* Pagination */}
                           <Pagination />
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </>
   )
}

export default ShopSection
