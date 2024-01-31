import React from 'react'
import CartProduct from '../Cart/CartProduct.tsx'
import { useSelector } from 'react-redux'
import { rootState } from '../../interface.ts'

const FeatureProduct = () => {
    const {currentProduct} = useSelector((state: rootState) => state.allProduct.allProduct)
  return (
    <div className='w-full px-[10%] mt-14'>
        <div>
            <h1 className='text-[28px] font-bold md:text-left text-center'>Feature Products</h1>
            <div className='md:grid md:grid-cols-2 lg:grid-cols-5 gap-7'>
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

export default FeatureProduct