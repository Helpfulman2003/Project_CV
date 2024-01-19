import React from 'react'
import CartProduct from '../Cart/CartProduct.tsx'
import { rootState } from '../../interface.ts'
import { useSelector } from 'react-redux'

const BestDeal = () => {
    const {currentProduct} = useSelector((state: rootState) => state.allProduct.allProduct)
    
  return (
    <div className='w-full px-[10%] mt-14'>
        <div>
            <h1 className='text-[28px] font-bold'>Best Deals</h1>
            <div className='grid grid-cols-5 gap-7'>
                {
                    currentProduct.map((product, index) => {
                        return <CartProduct key={index} product={product}/>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default BestDeal