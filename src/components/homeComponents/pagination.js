import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Pagination = () => {
   const { products } = useSelector((state) => state.productList)
   const { pages, page, keyword } = products
   return (
      pages > 1 && (
         <nav>
            <ul className='pagination justify-content-center'>
               {[...Array(pages).keys()].map((x) => (
                  <li className={`page-item ${x + 1 === page ? 'active' : ''}`} key={x + 1}>
                     <Link
                        className='page-link'
                        to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}
                     >
                        {x + 1}
                     </Link>
                  </li>
               ))}
            </ul>
         </nav>
      )
   )
}

export default Pagination
