import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div className="bg-[url('https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg')] w-full h-full z-10 px-[10%] mt-0 lg:mt-6 pt-8 pb-24 bg-center bg-cover">
            <div className='flex flex-col justify-center gap-6'>
                <h1 className='md:text-[36px] text-[30px] font-bold text-[#3d3a3a] w-[50%]'>Best Collection For Home Decoration</h1>
                <p className='text-[16px] text-[#3d3a3a] w-[50%]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, assumenda? Quisquam itaque
                    exercitationem labore vel, dolore quidem asperiores, laudantium temporibus soluta optio consequatur
                    aliquam deserunt officia. Dolorum saepe nulla provident.
                </p>
                <div className='w-[150px] shadow bg-gradient-to-r from-green-300 via-green-400 to-green-500 text-center px-4 py-3 rounded-md'>
                    <Link to="/shop"><button className='text-white font-bold'>Shop now</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Banner