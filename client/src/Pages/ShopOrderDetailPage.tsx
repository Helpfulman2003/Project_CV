import React from 'react'
import HeaderShop from '../components/Header/HeaderShop.tsx'
import Footer from '../components/Footer/Footer.tsx'
import OrderDetail from '../components/Order/OrderDetail.tsx'

const ShopOrderDetailPage = () => {
  return (
    <div className='bg-[#f6f6f5]'>
      <HeaderShop />
      <OrderDetail/>
      <Footer/>
    </div>
  )
}

export default ShopOrderDetailPage