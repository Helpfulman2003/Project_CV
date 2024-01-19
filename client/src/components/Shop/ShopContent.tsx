/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import CreateProduct from './CreateProduct.tsx'
import AllProduct from './AllProduct.tsx'
import CreateEvent from './CreateEvent.tsx'
import AllEvent from './AllEvent.tsx'
import AllCouponCode from './AllCouponCode.tsx'
import AllOrder from './AllOrder.tsx'

interface IProps {
  show: number
}

const ShopContent = ({ show }: IProps) => {
  
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      {
        show === 1 && (
          <AllOrder/>
        )
      }
      {
        show === 3 && (
          <CreateProduct/>
        )
      }
      {
        show === 2 && (
          <div className=''>
            <AllProduct/>
          </div>
        )
      }
      {
        show === 5 && (
          <CreateEvent/>
        )
      }
      {
        show === 4 && (
          <AllEvent/>
        )
      }
      {
        show === 8 && (
          <AllCouponCode/>
        )
      }
    </div>
  )
}

export default ShopContent