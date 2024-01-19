import React from 'react'
import { Link } from 'react-router-dom'

const ProfileShopInfo = () => {
    return (
        <div className='w-[25%] h-screen bg-white shadow rounded px-3 py-6 overflow-y-auto'>
            <div>
                <div className='flex items-center justify-center'>
                    <img src="https://res.cloudinary.com/dgqyxp0vu/image/upload/v1697864835/pbxubapqec1ptrfvdckd.jpg" alt="" className='w-[150px] h-[150px] rounded-full object-cover' />
                </div>
                <h2 className='text-center text-[18px] font-semibold text-gray-800'>HelpfulMan</h2>
                <p className='text-[#555] mt-4'>Description</p>
                <div className='mt-4'>
                    <h2 className='text-gray-800 font-medium'>Address</h2>
                    <h4 className='text-[#555]'>Help city</h4>
                </div>
                <div className='mt-4'>
                    <h2 className='text-gray-800 font-medium'>Phone Number</h2>
                    <h4 className='text-[#555]'>00000000001</h4>
                </div>
                <div className='mt-4'>
                    <h2 className='text-gray-800 font-medium'>Total Products</h2>
                    <h4 className='text-[#555]'>396</h4>
                </div>
                <div className='mt-4'>
                    <h2 className='text-gray-800 font-medium'>Shop Ratings</h2>
                    <h4 className='text-[#555]'>4/5</h4>
                </div>
                <h2 className='text-gray-800 font-medium mt-4'>Shop Ratings</h2>
                <div className='w-full shadow bg-gradient-to-r mt-4 from-green-300 via-green-400 to-green-500 text-center px-4 py-3 rounded-md'>
                    <Link to="/edit"><button className='text-white font-bold'>Edit Shop</button></Link>
                </div>
                <div className='w-full shadow bg-gradient-to-r mt-4 from-green-300 via-green-400 to-green-500 text-center px-4 py-3 rounded-md'>
                    <Link to="/logout"><button className='text-white font-bold'>Log Out</button></Link>
                </div>
            </div>
        </div>
    )
}

export default ProfileShopInfo