/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react'
import { IoBagHandleOutline } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../interface';
import { format } from 'fecha';
import { createAxios } from '../../createIntance.ts';
import { loginSuccess } from '../../redux/shopSlice.ts';
import { updateOrderStatus } from '../../router/userRouter.ts'
import { toast, ToastContainer } from 'react-toastify'

const OrderDetail = () => {
    const { id } = useParams<string>()
    const { currentOrder } = useSelector((state: rootState) => state.allOrder.allOrder)
    const { currentShop } = useSelector((state: rootState) => state.shop.shop)
    const [status, setStatus] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const axiosJWT = createAxios(currentShop, dispatch, loginSuccess)

    const options = [
        "Processing",
        "Transferred to delivery partner",
        "Shipping",
        "On the way",
        "Delivered",
    ]

    const getOrder = useMemo(() => {
        const order = currentOrder.find((item) => item?._id === id)
        return order
    }, [id])

    console.log(getOrder);


    const orderUpdateHandle = async () => {
        try {
            const { data } = await axiosJWT.put(updateOrderStatus + `/${id}`, { status })
            navigate(-1)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='px-[10%] w-full'>
            <div className='mt-10 flex items-center justify-between mb-8'>
                <div className='flex items-center justify-start gap-2'>
                    <IoBagHandleOutline size={30} color='#f63b60' />
                    <h2 className='text-[25px]'>Order Details</h2>
                </div>
                <div>
                    <button className='w-[120px] shadow text-center px-3 py-2 mb-2 rounded-md text-[#b84058] bg-[#f9bac7] cursor-pointer text-[18px] font-[600]'>Order List</button>
                </div>
            </div>
            <div className='flex items-center justify-between mb-8'>
                <div className='text-[#00000084]'>Order ID: <span>#{getOrder?._id?.slice(0, 8)}</span></div>
                <div className='text-[#00000084]'>Placed on: {format(new Date(getOrder?.createdAt ?? ''), 'dddd MMMM Do, YYYY')}</div>
            </div>
            {
                getOrder?.cart.map((item) => {
                    return <div key={item._id}>
                        <div className='flex items-start justify-start gap-x-2 mb-8'>
                            <div>
                                <img src={item.images?.url[0].url} alt="" className='w-[80px] h-[80px] object-cover' />
                            </div>
                            <div className=''>
                                <div>{item.name}</div>
                                <span className='text-[#00000091]'>{item.discountPrice}VND x {item.quantity}</span>
                            </div>
                        </div>
                    </div>
                })
            }
            <div className='border-solid border-t text-right'>
                <h2>Total Price: <span className='font-semibold'>{getOrder?.cart && getOrder?.cart.reduce((acc, item) => {
                    let quantity = item.quantity ?? 0
                    return acc + quantity * item.discountPrice
                }, 0)}VND</span></h2>
            </div>
            <br />
            <br />
            <div className='flex items-start'>
                <div className='w-[60%]'>
                    <h2 className='pt-2 text-[20] font-semibold'>Shipping Address</h2>
                    <h4 className='pt-2'>{getOrder?.shippingAddress.city}</h4>
                    <h4 className='pt-2'>{getOrder?.shippingAddress.address}</h4>
                    <h4 className='pt-2'>{getOrder?.shippingAddress.phone}</h4>
                </div>
                <div className='w-[40%]'>
                    <h2 className='pt-2 text-[20] font-semibold'>Payment Info</h2>
                    <h4 className='pt-2'>Status: {getOrder?.status}</h4>
                </div>
            </div>
            <div>
                <h2 className='pt-2 text-[20] font-semibold'>Order Status:</h2>
                <select value={status} onChange={(e: React.ChangeEvent) => setStatus((e.target as HTMLInputElement).value)} className="w-[200px] mt-2 border h-[35px] rounded-[5px]">
                    {
                        options./*slice(options.indexOf(getOrder?.status ?? '')).*/map((option, index) => {
                            return <option key={index} value={option}>{option}</option>
                        })
                    }

                </select>
            </div>
            <div>
                <button onClick={orderUpdateHandle} className='w-[150px] shadow text-center px-3 py-2 rounded-md bg-[#f63b60] text-[#fff] cursor-pointer text-[18px] font-[600] mt-5 mb-10'>Update Status</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default OrderDetail