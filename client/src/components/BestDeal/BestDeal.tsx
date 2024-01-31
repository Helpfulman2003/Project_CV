import React, { useMemo } from 'react'
import CartProduct from '../Cart/CartProduct.tsx'
import { rootState } from '../../interface.ts'
import { useSelector } from 'react-redux'

const BestDeal = () => {
    const {currentProduct} = useSelector((state: rootState) => state.allProduct.allProduct)
    
    const data = useMemo(() => {
        const data = currentProduct && [...currentProduct].sort((a, b) => b.sold_out - a.sold_out)
        return data.slice(0,5)
    }, [currentProduct])
    
  return (
    <div className='w-full px-[10%] mt-14'>
        <div>
            <h1 className='text-[28px] text-center md:text-left  font-bold'>Best Deals</h1>
            <div className='md:grid md:grid-cols-2 lg:grid-cols-5 gap-7'>
                {
                    data.map((product, index) => {
                        return <CartProduct key={index} product={product}/>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default BestDeal