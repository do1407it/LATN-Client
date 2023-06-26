import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import Pagination from './pagination'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../redux/actions/ProductActions'
import Message from '../LoadingError/Error'
import Loading from '../LoadingError/Loading'
import { listCategories } from '../../redux/actions/CategoryActions'

const ShopSection = ({ keyword, pageNumber }) => {
   const dispatch = useDispatch()
   const [category, setCategory] = useState('')

   const { loading, error, products } = useSelector((state) => state.productList)
   const { categories } = useSelector((state) => state.categoryList)

   useEffect(() => {
      dispatch(listProducts(keyword, pageNumber, category))
      dispatch(listCategories())
   }, [dispatch, keyword, pageNumber, category])

   return (
      <>
         <div className='container'>
            <div className='col-lg-6 col-md-6 article'>
               <select
                  className='form-select'
                  aria-label='Default select example'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
               >
                  <option value=''>All Category</option>
                  {categories &&
                     categories.map((category) => (
                        <option key={category._id} value={category._id}>
                           {category.title}
                        </option>
                     ))}
               </select>
            </div>
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
