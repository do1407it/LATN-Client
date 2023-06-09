import React from 'react'

const Loading = () => {
   return (
      <>
         <div className='d-flex justify-content-center'>
            <div
               className='spinner-border text-primary'
               role='status'
               style={{ width: '50px', height: '50px' }}
            >
               <span className='sr-only'>Loading...</span>
            </div>
         </div>
         <p className='text-center text-uppercase'>Loading...</p>
      </>
   )
}

export default Loading
