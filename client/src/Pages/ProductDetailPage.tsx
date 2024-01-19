import React from 'react'
import Header from '../components/Header/Header.tsx'
import Navbar from '../components/Header/Navbar.tsx'
import Footer from '../components/Footer/Footer.tsx'
import ProductDetail from '../components/ProductDetail/ProductDetail.tsx'

const ProductDetailPage = () => {
  return (
    <div className='bg-[#fff]'>
        <Header/>
        <Navbar/>
        <ProductDetail/>
        <Footer/>
   </div>
  )
}

export default ProductDetailPage