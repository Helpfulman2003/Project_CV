import React from 'react'
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import { BiSolidShare } from "react-icons/bi";
import { AiOutlineMessage } from "react-icons/ai";
import { MdTrackChanges } from "react-icons/md";
import { BsCreditCard2Back } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

interface IProps {
    setShow: React.Dispatch<React.SetStateAction<number>>,
    show: number
}

const ProfileSidebar = ({setShow, show}: IProps) => {
    const info: {name: string, icon: JSX.Element}[] = [
        {
            name:  'Profile',
            icon: <FaRegUser size={25} />
        },
        {
            name:  'Orders',
            icon: <MdOutlineShoppingBag size={25} />
        },
        {
            name:  'Refound',
            icon: <BiSolidShare size={25} />
        },
        {
            name:  'Inbox',
            icon: <AiOutlineMessage size={25} />
        },
        {
            name:  'Track Order',
            icon: <MdTrackChanges size={25} />
        },
        {
            name:  'Payment Methods',
            icon: <BsCreditCard2Back size={25} />
        },
        {
            name:  'Address',
            icon: <FaRegAddressBook size={25} />
        },
        {
            name:  'Log out',
            icon: <LuLogOut size={25} />
        },
      ]

  return (
    <div className='col-span-1 md:w-full w-[60px] bg-white shadow-md md:px-[20px] md:py-9 py-4 flex flex-col justify-center md:gap-8 gap-6'>
        {
            info.map((element, index: number) => {
                return (
                    <div key={index} className={`flex items-center md:justify-start justify-center gap-2 cursor-pointer ${index === show ? 'text-[#49c593]': ''}`} onClick={() => setShow(index)}>
                        {element.icon}
                        <span className={` ${index === show ? 'text-[#49c593]': 'text-gray-800'} md:block hidden`}>{element.name}</span>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ProfileSidebar