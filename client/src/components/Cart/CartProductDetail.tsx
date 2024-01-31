import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { currentProduct, rootState } from '../../interface.ts';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList } from '../../redux/wishListSlice.ts';

interface IProps {
    data: currentProduct
    setOpen: React.Dispatch<React.SetStateAction<Boolean>>
}

const CartProductDetail = ({ data, setOpen }: IProps) => {
    const wishList = useSelector((state: rootState) => state.wishList.wishList)
    const [value, setValue] = useState<number>(1)
    const dispatch = useDispatch()

    const handleBtn = (value: string) => {
        switch (value) {
            case 'increase':
                setValue(prev => prev + 1)
                break
            case 'decrease':
                setValue(prev => prev > 1 ? prev - 1 : prev)
                break
            default:
        }
    }

    const handleAddToWishList = () => {
        dispatch(addToWishList(data))
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-[#00000030] z-10'>
            <div className='bg-white z-20 overflow-y-auto rounded-md absolute w-[60%] h-[75%] opacity-100 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 block md:grid grid-cols-2'>
                <div className='flex justify-end absolute top-2 right-4'>
                    <IoMdClose size={30} onClick={() => setOpen(false)} />
                </div>
                <div className=''>
                    <div className=''>
                        <img src={data.images && data.images?.url && data.images?.url.length > 0 ? data.images?.url[0].url : ''} alt="" className='w-full object-cover' />
                    </div>
                    <div className='flex items-center justify-start gap-4 mt-4'>
                        <div>
                            <img src={data.shopId && data.shopId.avatar ? data.shopId?.avatar?.url[0].url : ''} alt="" className='w-[50px] h-[50px] rounded-full' />
                        </div>
                        <div>
                            <p className='text-[#6cb0fb]'>{data.shopId?.name}</p>
                            <p>(4) rating</p>
                        </div>
                    </div>
                    <div className='w-[150px] bg-green-500 text-center px-4 py-3 rounded-md my-3'>
                        <Link to=""><button className='text-white font-bold text-[12px] flex items-center justify-center gap-1'>Send Message <AiOutlineMessage size={16} /></button></Link>
                    </div>
                    <div className='mt-4 text-green-600'>
                        <span>({data.sold_out}) Sold out</span>
                    </div>
                </div>
                <div className='md:ml-2'>
                    <h2 className='text-[20px] font-bold text-[#333]'>{data.name}</h2>
                    <p className='text-[#333]'>{data.description}</p>
                    <div className='flex items-center justify-start gap-4 mt-3'>
                        <span className='text-[#333] font-bold text-[20px]'>{data.discountPrice}VND</span>
                        <span className='text-red-500 line-through font-semibold translate-y-[-4px]'>{data.originalPrice}VND</span>
                    </div>
                    <div className='flex items-center justify-between mt-10'>
                        <div className='flex items-center justify-start rounded-md'>
                            <button onClick={() => handleBtn("decrease")} className='w-[42px] bg-gradient-to-r rounded-l from-teal-400 to-teal-500 px-3 py-2 rounded-md font-bold hover:opacity-75 transition duration-300 ease-in-out shadow-lg text-white'>-</button>
                            <span className='block text-center w-[42px] rounded-md bg-[#e3e5e9] font-semibold text-[#333] px-3 py-2'>{value}</span>
                            <button onClick={() => handleBtn("increase")} className='w-[42px] bg-gradient-to-r from-teal-400 to-teal-500 px-3 py-2 rounded-md font-bold hover:opacity-75 transition duration-300 ease-in-out shadow-lg text-white'>+</button>
                        </div>
                        <div>
                            {
                                wishList && wishList.find((item) => item._id === data._id) ? (<FaHeart size={20} className='mr-3 text-red-500' />) : (<FaRegHeart size={20} className='mr-3' onClick={handleAddToWishList} />)
                            }
                        </div>
                    </div>
                    <button className='w-[140px] bg-green-500 text-center px-4 py-3 rounded-md my-3 text-white flex items-center justify-center gap-2 text-[14px] font-semibold'>Add to cart <IoCartOutline size={20} /></button>
                </div>
            </div>
        </div>
    )
}

export default CartProductDetail