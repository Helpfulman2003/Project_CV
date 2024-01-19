import React from 'react'
import { CiViewList } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from 'react-router-dom';

const Navbar = ({flat = 1}) => {
  
  return (
    <div className='w-full px-[10%] flex items-center justify-between mt-9'>
        <div className='w-[270px] flex items-center justify-between shadow-md px-3 py-2'>
            <div>
                <CiViewList />
            </div>
            All Category
            <div>
                <IoMdArrowDropdown />
            </div>
        </div>
        <ul className='flex items-center justify-between gap-4'>
            <Link to='/'><li className={`font-semibold ${flat === 1 ? 'text-[#3bc177]' : null}`}>Home</li></Link>
            <Link to='/best-selling'><li className={`font-semibold ${flat === 2 ? 'text-[#3bc177]' : null}`}>Best Selling</li></Link>
            <Link to='/product'><li className={`font-semibold ${flat === 3 ? 'text-[#3bc177]' : null}`}>Product</li></Link>
            <Link to='/event'><li className={`font-semibold ${flat === 4 ? 'text-[#3bc177]' : null}`}>Event</li></Link>
            <Link to='/faq'><li className={`font-semibold ${flat === 5 ? 'text-[#3bc177]' : null}`}>FAQ</li></Link>
        </ul>
        <div className='w-[150px] shadow bg-gradient-to-r from-green-300 via-green-400 to-green-500 text-center px-4 py-3 rounded-md'>
            <Link to="/shop"><button className='text-white font-bold'>Seller</button></Link>
        </div>
    </div>
  )
}

export default Navbar