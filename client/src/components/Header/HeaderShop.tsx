import React from 'react'
import Logo from "../../asset/img/Logo.png"
import { GoGift } from "react-icons/go";
import { GoTag } from "react-icons/go";
import { IoBagOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { BiMessageSquareDetail } from "react-icons/bi";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { rootState } from '../../interface';

const HeaderShop = () => {
    const {currentShop} = useSelector((state: rootState) => state.shop.shop)
    return (
        <div className='w-full px-4 flex justify-between items-center py-3  bg-white shadow'>
            <div>
                <img src={Logo} alt="" className='w-[80px] object-cover' />
            </div>
            <div className='flex justify-end items-center gap-8'>
                <GoGift size={30} className='text-[#555] cursor-pointer md:block hidden' />
                <GoTag size={30} className='text-[#555] cursor-pointer md:block hidden' />
                <IoBagOutline size={30} className='text-[#555] cursor-pointer md:block hidden' />
                <BsBoxSeam size={30} className='text-[#555] cursor-pointer md:block hidden' />
                <BiMessageSquareDetail size={30} className='text-[#555] cursor-pointer md:block hidden' />
                <Link to={`/shop/${currentShop._id}`}>
                    <div>
                        <img src={currentShop.avatar?.url[0]?.url ?? ''} alt="" className='w-[40px] h-[40px] rounded-full object-cover cursor-pointer' />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default HeaderShop