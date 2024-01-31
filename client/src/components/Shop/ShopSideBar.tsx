import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { FiShoppingBag } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { GoTag } from "react-icons/go";
import { AiOutlineFileAdd } from "react-icons/ai";
import { CiMoneyBill } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { GoGift } from "react-icons/go";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";

interface IProps {
    setShow: React.Dispatch<React.SetStateAction<number>>,
    show: number
}

const ShopSizeBar = ({setShow, show}: IProps) => {
    const info: { name: string, icon: JSX.Element }[] = [
        {
            name: 'Dashboard',
            icon: <RxDashboard size={30} />
        },
        {
            name: 'All Orders',
            icon: <FiShoppingBag size={30} />
        },
        {
            name: 'All Products',
            icon: <BsBoxSeam size={30} />
        },
        {
            name: 'Create Product',
            icon: <AiOutlineFolderAdd size={30} />
        },
        {
            name: 'All Events',
            icon: <GoTag size={30} />
        },
        {
            name: 'Create Event',
            icon: <AiOutlineFileAdd size={30} />
        },
        {
            name: 'Withdraw Money',
            icon: <CiMoneyBill size={30} />
        },
        {
            name: 'Shop Inbox',
            icon: <BiMessageSquareDetail size={30} />
        },
        {
            name: 'Discount Codes',
            icon: <GoGift size={30} />
        },
        {
            name: 'Refunds',
            icon: <HiOutlineReceiptRefund size={30} />
        },
        {
            name: 'Settings',
            icon: <IoSettingsOutline size={30} />
        },

    ]
    return (
        <div className='lg:w-[330px] w-[80px] h-screen bg-white shadow-sm p-4 overflow-y-auto'>
            <div className='flex flex-col items-start justify-center gap-8'>
                {
                    info.map((element, index: number) => {
                        return (
                            <div key={index} className={`flex items-center justify-start gap-2 cursor-pointer ${index === show ? 'text-[#49c593]': ''} `} onClick={() => setShow(index)}>
                                {element.icon}
                                <span className={`lg:block hidden text-[18px] ${index === show ? 'text-[#49c593]': 'text-gray-800'}`}>{element.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ShopSizeBar
