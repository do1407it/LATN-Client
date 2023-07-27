import React from 'react'
import Header from './../components/Header'
import ShopSection from './../components/homeComponents/ShopSection'
import ContactInfo from './../components/homeComponents/ContactInfo'
import CalltoActionSection from './../components/homeComponents/CalltoActionSection'
import Footer from './../components/Footer'
import Banner from './../components/Banner'

const HomeScreen = ({ match }) => {
   window.scrollTo(0, 0)
   const keyword = match.params.keyword || ''
   const pageNumber = match.params.pageNumber || 1

   return (
      <div>
         <Banner intervalTime={3000} />
         <Header />
         <ShopSection keyword={keyword} pageNumber={pageNumber} />
         {/* <CalltoActionSection /> */}
         {/* <ContactInfo /> */}
         <Footer />
      </div>
   )
}

export default HomeScreen
