import React, { useState, useEffect } from 'react'

const Banner = ({ intervalTime }) => {
   const [currentIndex, setCurrentIndex] = useState(0)

   // eslint-disable-next-line react-hooks/exhaustive-deps
   const images = ['images/2.png', 'images/4.png', 'images/6.png']
   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, intervalTime)

      return () => {
         clearInterval(interval)
      }
   }, [images, intervalTime])

   const handleScrollToDown = () => {
      window.scrollTo(0, 920)
   }

   return (
      <div className='slideshow-container'>
         {images.map((image, index) => (
            <div
               key={index}
               className={`slide ${index === currentIndex ? 'active' : ''}`}
               style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}
            />
         ))}
         <div className='scroll-down-btn' onClick={handleScrollToDown}>
            <div className='arrow-down' />
         </div>
      </div>
   )
}

export default Banner
