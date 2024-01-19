import React from 'react'
import Header from '../components/Header/Header.tsx'
import Navbar from '../components/Header/Navbar.tsx'
import FeatureProduct from '../components/FeatureProduct/FeatureProduct.tsx'

const ProductPage = () => {
  return (
    <div className='bg-[#f6f6f5]'>
        <Header/>
        <Navbar flat={3}/>
        <FeatureProduct/>
   </div>
  )
}

export default ProductPage