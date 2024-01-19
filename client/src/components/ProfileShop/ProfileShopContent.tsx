import React from 'react'
import { Link } from 'react-router-dom'

const ProfileShopContent = () => {
    return (
        <div className='flex-1 h-screen overflow-y-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-end justify-start gap-4'>
                    <h2 className='text-[18px] font-medium cursor-pointer'>Shop Products</h2>
                    <h2 className='text-[18px] font-medium cursor-pointer'>Running Events</h2>
                    <h2 className='text-[18px] font-medium cursor-pointer'>Shop Reviews</h2>
                </div>
                <div>
                    <div className='w-[150px] shadow bg-gradient-to-r from-green-300 via-green-400 to-green-500 text-center px-4 py-3 rounded-md'>
                        <Link to="/shop"><button className='text-white font-bold'>Go Dashboard</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileShopContent