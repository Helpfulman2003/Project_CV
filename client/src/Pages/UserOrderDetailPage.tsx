import React from 'react'
import Header from '../components/Header/Header.tsx'
import Footer from '../components/Footer/Footer.tsx'
import UserOrderDetail from '../components/Order/UserOrderDetail.tsx'

const UserOrderDetailPage = () => {
  return (
    <div>
        <Header/>
        <UserOrderDetail/> 
        <Footer/>
    </div>
  )
}

export default UserOrderDetailPage