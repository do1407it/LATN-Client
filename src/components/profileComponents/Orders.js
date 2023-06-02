import React from 'react'
import Loading from '../LoadingError/Loading'
const Orders = ({ data, loading, error }) => {
   console.log(data)
   return (
      <div className=' d-flex justify-content-center align-items-center flex-column'>
         {loading ? (
            <Loading />
         ) : error ? (
            <div className='alert alert-danger'>{error}</div>
         ) : data.length === 0 ? (
            <div className='alert alert-info'>No Orders</div>
         ) : (
            <div className='table-responsive'>
               <table className='table'>
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                     </tr>
                  </thead>
                  <tbody>
                     {data.map((order) => (
                        <tr
                           key={order._id}
                           className={order.isPaid ? 'alert-success' : 'alert-danger'}
                        >
                           <td>
                              <a href={`/order/${order._id}`} className='link'>
                                 {order._id}
                              </a>
                           </td>
                           <td>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                           <td>{order.createdAt.substring(0, 10)}</td>
                           <td>${order.totalPrice}</td>
                        </tr>
                     ))}
                     {/* <tr className={'alert-success'}>
                        <td>
                           <a href={`/`} className='link'>
                              1
                           </a>
                        </td>
                        <td>Paid</td>
                        <td>Dec 12 2021</td>
                        <td>$234</td>
                     </tr>

                     <tr className={'alert-danger'}>
                        <td>
                           <a href={`/`} className='link'>
                              2
                           </a>
                        </td>
                        <td>Not Paid</td>
                        <td>Dec 12 2021</td>
                        <td>$34</td>
                     </tr> */}
                  </tbody>
               </table>
            </div>
         )}
         {/* <div className="col-12 alert alert-info text-center mt-3">
        No Orders
        <Link
          className="btn btn-success mx-2 px-3 py-2"
          to="/"
          style={{
            fontSize: "12px",
          }}
        >
          START SHOPPING
        </Link>
      </div> */}
      </div>
   )
}

export default Orders
