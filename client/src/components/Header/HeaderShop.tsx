import React from 'react'
import Logo from "../../asset/img/Logo.png"
import { GoGift } from "react-icons/go";
import { GoTag } from "react-icons/go";
import { IoBagOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { BiMessageSquareDetail } from "react-icons/bi";
import { Link } from 'react-router-dom'

const HeaderShop = () => {
    return (
        <div className='w-full px-4 flex justify-between items-center py-3  bg-white shadow'>
            <div>
                <img src={Logo} alt="" className='w-[80px] object-cover' />
            </div>
            <div className='flex justify-end items-center gap-8'>
                <GoGift size={30} className='text-[#555] cursor-pointer' />
                <GoTag size={30} className='text-[#555] cursor-pointer' />
                <IoBagOutline size={30} className='text-[#555] cursor-pointer' />
                <BsBoxSeam size={30} className='text-[#555] cursor-pointer' />
                <BiMessageSquareDetail size={30} className='text-[#555] cursor-pointer' />
                <Link to='/shop/id'>
                    <div>
                        <img src="https://res.cloudinary.com/dgqyxp0vu/image/upload/v1697864835/pbxubapqec1ptrfvdckd.jpg" alt="" className='w-[50px] h-[50px] rounded-full object-cover cursor-pointer' />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default HeaderShop