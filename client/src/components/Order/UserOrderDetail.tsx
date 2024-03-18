/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { currentOrderUser, rootState } from '../../interface.ts'
import { createAxios } from '../../createIntance.ts'
import { loginSuccess } from '../../redux/userSlice.ts'
import { createNewReview, updateOrderStatus } from '../../router/userRouter.ts'
import { ToastContainer, toast } from 'react-toastify'
import { IoBagHandleOutline } from 'react-icons/io5'
import { format } from 'fecha'
import { RxCross1 } from 'react-icons/rx'
import { useFormik } from 'formik'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const UserOrderDetail = () => {
    const { id } = useParams<string>()
    const { currentOrderUser } = useSelector((state: rootState) => state.allOrderUser.allOrderUser)
    const { currentUser } = useSelector((state: rootState) => state.user.user)
    const [open, setOpen] = useState(false)
    const [item, setItem] = useState<currentOrderUser | any>(null)
    const [rating, setRating] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const axiosJWT = createAxios(currentUser, dispatch, loginSuccess)

    const formik = useFormik({
        initialValues: {
          comment: ''
        },
        onSubmit: async (values) => {
            try {
                const {data} = await axiosJWT.put(createNewReview, {rating, comment: values.comment, productId: item._id})
                toast.success(data.message)
                setOpen(false)
            } catch (error) {
                toast.error(error)
            }
        }
    })

    const getOrder = useMemo(() => {
        const order = currentOrderUser.find((item) => item?._id === id)
        return order
    }, [id])

    const orderUpdateHandle = async () => {
        // try {
        //     const { data } = await axiosJWT.put(updateOrderStatus + `/${id}`, { status })
        //     navigate(-1)
        // } catch (error) {
        //     toast.error(error.response.data.message);
        // }
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
                    return <div key={item._id} className='flex items-center justify-between'>
                        <div className='flex items-start justify-start gap-x-2 mb-8'>
                            <div>
                                <img src={item.images?.url[0].url} alt="" className='w-[80px] h-[80px] object-cover' />
                            </div>
                            <div className=''>
                                <div>{item.name}</div>
                                <span className='text-[#00000091]'>{item.discountPrice}VND x {item.quantity}</span>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => {
                                setItem(item)
                                setOpen(true)
                            }} className='w-[120px] shadow text-center px-4 py-3 mb-2 rounded-md text-white bg-gray-800 cursor-pointer text-[12px] font-[600]'>Write a review</button>
                        </div>
                    </div>
                })
            }
            <div className='border-solid border-t text-right'>
                <h2>Total Price: <span className='font-semibold'>{getOrder?.totalPrice}VND</span></h2>
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
            {
                getOrder?.status === "Delivered" && (
                    <div>
                        <button onClick={orderUpdateHandle} className='w-[150px] shadow text-center px-3 py-2 rounded-md bg-[#f63b60] text-[#fff] cursor-pointer text-[18px] font-[600] mt-5 mb-10'>Give a Refund</button>
                    </div>
                )
            }
            {
                open && (
                    <>
                        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center ">
                            <div className="w-[50%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 overflow-y-auto">
                                <div className="w-full flex justify-end">
                                    <RxCross1
                                        size={30}
                                        className="cursor-pointer"
                                        onClick={() => setOpen(false)}
                                    />
                                </div>
                                <h5 className="text-[30px] font-Poppins text-center">
                                    Give a Review
                                </h5>
                                <div className='flex items-start justify-start gap-x-2 mb-8'>
                                    <div>
                                        <img src={item.images?.url[0].url} alt="" className='w-[80px] h-[80px] object-cover' />
                                    </div>
                                    <div className=''>
                                        <div>{item.name}</div>
                                        <span className='text-[#00000091]'>{item.discountPrice}VND x {item.quantity}</span>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="pb-2">
                                        Discount Percentage
                                        <span className="text-red-500">*</span>
                                    </h2>
                                    <div className='flex justify-start items-end'>
                                        {
                                        [1, 2, 3, 4, 5].map(i => {
                                            return (
                                                rating >= i ? (
                                                    <AiFillStar
                                                        key={i}
                                                        className="mr-1 cursor-pointer"
                                                        color="rgb(246,186,0)"
                                                        size={25}
                                                        onClick={() => setRating(i)}
                                                    />
                                                ) : (
                                                    <AiOutlineStar
                                                        key={i}
                                                        className="mr-1 cursor-pointer"
                                                        color="rgb(246,186,0)"
                                                        size={25}
                                                        onClick={() => setRating(i)}
                                                    />
                                                )
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                                {/* create coupoun code */}
                                <form onSubmit={formik.handleSubmit}>
                                    <br />
                                    <div>
                                        <label className="pb-2 font-semibold">
                                            Write a comment <span className="font-[400] text-[12px] text-[#00000052]">(Optional)</span>
                                        </label>
                                        <textarea
                                            name='comment'
                                            cols={20}
                                            rows={5}
                                            value={formik.values.comment}
                                            onChange={formik.handleChange}
                                            required
                                            className="mt-2 appearance-none block w-full px-3 h-[100px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Enter your coupon code name..."
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="submit"
                                            value="Create"
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )
            }
            <ToastContainer />
        </div>
    )
}

export default UserOrderDetail