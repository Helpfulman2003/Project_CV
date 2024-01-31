import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { rootState } from '../../interface.ts'
import CartProduct from '../Cart/CartProduct.tsx'
import EventCard from '../Event/EventCard.tsx'

const ProfileShopContent = () => {
    const [select, setSelect] = useState(1)
    const { currentProduct } = useSelector((state: rootState) => state.allProductShop.allProductShop)
    const {currentEventOfShop} = useSelector((state: rootState) => state.allEventOfShop.allEventOfShop)
    
    return (
        <div className='flex-1 h-screen overflow-y-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-end justify-start gap-4'>
                    <h2 onClick={() => setSelect(1)} className={`${select === 1 ? 'text-[#3bc177]' : ''} text-[18px] font-medium cursor-pointer`}>Shop Products</h2>
                    <h2 onClick={() => setSelect(2)} className={`${select === 2 ? 'text-[#3bc177]' : ''} text-[18px] font-medium cursor-pointer`}>Running Events</h2>
                    <h2 onClick={() => setSelect(3)} className={`${select === 3 ? 'text-[#3bc177]' : ''} text-[18px] font-medium cursor-pointer`}>Shop Reviews</h2>
                </div>
                <div>
                    <div className='w-[150px] shadow bg-gradient-to-r from-green-300 via-green-400 to-green-500 text-center px-4 py-3 rounded-md'>
                        <Link to="/shop"><button className='text-white font-bold'>Go Dashboard</button></Link>
                    </div>
                </div>
            </div>
            {
                select === 1 && (
                    <div className='grid grid-cols-4 gap-8'>
                        {currentProduct && currentProduct.map((product) => {
                            return (
                                <div key={product._id}>
                                    <CartProduct product={product} />
                                </div>
                            )
                        })}
                    </div>
                )
            }
            {
                select === 2 && (
                    <div className='mt-4'>
                        {
                            currentEventOfShop.map((item, index:number) => {
                                return (
                                  <div key={index}>
                                    <EventCard event={item}/>
                                  </div>
                                )
                              })
                        }
                    </div>
                )
            }

        </div>
    )
}

export default ProfileShopContent