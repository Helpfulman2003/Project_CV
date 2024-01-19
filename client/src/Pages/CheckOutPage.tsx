import React from 'react'
import Header from "../components/Header/Header.tsx"
import Footer from "../components/Footer/Footer.tsx"
import CheckOut from '../components/CheckOut/CheckOut.tsx'
import CheckOutStep from '../components/CheckOut/CheckOutStep.tsx'

const CheckOutPage = () => {
  return (
    <div>
        <Header/>
        <div className='px-[10%] w-full mb-[120px]'>
            <CheckOutStep active={1}/>
            <CheckOut/>
        </div>
        <Footer/>
    </div>
  )
}

export default CheckOutPage