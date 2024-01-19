import React from 'react'
import Header from '../components/Header/Header.tsx'
import Navbar from '../components/Header/Navbar.tsx'
import BestDeal from '../components/BestDeal/BestDeal.tsx'

const BestSelling = () => {
  return (
    <div className='bg-[#f6f6f5]'>
        <Header/>
        <Navbar flat={2}/>
        <BestDeal/>
   </div>
  )
}

export default BestSelling