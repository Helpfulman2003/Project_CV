import React from 'react'
import { productData } from '../../data.ts'
import CartProduct from '../Cart/CartProduct.tsx'

const FeatureProduct = () => {
  return (
    <div className='w-full px-[10%] mt-14'>
        <div>
            <h1 className='text-[28px] font-bold'>Feature Products</h1>
            <div className='grid grid-cols-5 gap-7'>
                {
                    productData.map((product, index) => {
                        return <CartProduct key={index} product={product}/>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default FeatureProduct