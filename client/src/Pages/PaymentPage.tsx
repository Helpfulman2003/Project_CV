import React from 'react'
import Header from '../components/Header/Header.tsx'
import CheckOutStep from '../components/CheckOut/CheckOutStep.tsx'
import Footer from '../components/Footer/Footer.tsx'
import Payment from '../components/Payment/Payment.tsx'

const PaymentPage = () => {
  return (
    <div>
        <Header/>
        <div className='px-[10%] w-full mb-[120px]'>
            <CheckOutStep active={2}/>
            <Payment/>
        </div>
        <Footer/>
    </div>
  )
}

export default PaymentPage