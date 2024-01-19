import React from 'react'
import Header from '../components/Header/Header.tsx'
import Navbar from '../components/Header/Navbar.tsx'
import FAQ from '../components/FAQ/FAQ.tsx'
import Footer from '../components/Footer/Footer.tsx'

const FAQPage = () => {
  return (
    <div className='bg-[#f6f6f5]'>
            <Header />
            <Navbar flat={5} />
            <FAQ/>
            <Footer/>
    </div>
  )
}

export default FAQPage