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
            icon: <FaRegUser size={20} />
        },
        {
            name:  'Orders',
            icon: <MdOutlineShoppingBag size={20} />
        },
        {
            name:  'Refound',
            icon: <BiSolidShare size={20} />
        },
        {
            name:  'Inbox',
            icon: <AiOutlineMessage size={20} />
        },
        {
            name:  'Track Order',
            icon: <MdTrackChanges size={20} />
        },
        {
            name:  'Payment Methods',
            icon: <BsCreditCard2Back size={20} />
        },
        {
            name:  'Address',
            icon: <FaRegAddressBook size={20} />
        },
        {
            name:  'Log out',
            icon: <LuLogOut size={20} />
        },
      ]

  return (
    <div className='col-span-1 bg-white shadow-md px-[20px] py-9 flex flex-col justify-center gap-8'>
        {
            info.map((element, index: number) => {
                return (
                    <div key={index} className={`flex items-center justify-start gap-2 cursor-pointer ${index === show ? 'text-[#49c593]': ''}`} onClick={() => setShow(index)}>
                        {element.icon}
                        <span className={` ${index === show ? 'text-[#49c593]': 'text-gray-800'}`}>{element.name}</span>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ProfileSidebar