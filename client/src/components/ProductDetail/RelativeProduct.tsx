/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import CartProduct from '../Cart/CartProduct.tsx'
import { currentProduct, rootState } from '../../interface.ts'
import { useSelector } from 'react-redux'

interface IProps {
    getProduct: currentProduct
  }

const RelativeProduct = ({getProduct}: IProps) => {
    const {currentProduct} = useSelector((state: rootState) => state.allProduct.allProduct)
    const relativeProduct = useMemo(() => {
        const product = currentProduct.filter((item) => item.category === getProduct.category)
        return product
    }, [getProduct.category])
    
  return (
    <div className='mb-12'>
            <h1 className='text-[28px] font-bold border-b border-solid border-gray-200 pb-5 mb-5'>Relative Product</h1>
            <div className='grid grid-cols-5 gap-7'>
                {
                    relativeProduct.map((product, index) => {
                        return <CartProduct key={index} product={product}/>
                    })
                }
            </div>
        </div>
  )
}

export default RelativeProduct