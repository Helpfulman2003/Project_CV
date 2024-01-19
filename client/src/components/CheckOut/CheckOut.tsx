/* eslint-disable jsx-a11y/heading-has-content */
import React, { useMemo, useState } from 'react'
import { country } from '../../data.ts'
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../interface.ts';
import { createAxios } from '../../createIntance.ts'
import { loginSuccess } from '../../redux/userSlice.ts'
import { getCouponValue } from '../../router/userRouter.ts'
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

interface couponCode {
    name: string;
    shopId: string;
    value: number;
    productSelected: string;
    minAmount: number;
    maxAmount: number;
    _id: string;
}

const CheckOut = () => {
    const [name, setName] = useState<string>('')
    const { currentUser } = useSelector((state: rootState) => state.user.user)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(currentUser, dispatch, loginSuccess)
    const cart = useSelector((state: rootState) => state.cart.cart)
    const [disCountPrice, setDiscountPrice] = useState<number>(0)
    const [couponCodeData, setCouponCodeData] = useState<couponCode>()
    const navigate = useNavigate()
    const subTotalPrice = useMemo<number>(() => {
        return cart.reduce((acc: number, item) => {
            let value = item?.quantity ?? 0
            return acc + value * item.discountPrice
        }, 0)
    }, [cart])

    const handleApplyCode = async () => {
        try {
            const { data } = await axiosJWT.get(getCouponValue + `/${name}`)
            const shopId = data.couponCode.couponCode.shopId
            const couponCodeValue = data.couponCode.couponCode.value
            const minAmount = data.couponCode.couponCode.minAmount
            const maxAmount = data.couponCode.couponCode.maxAmount
            if (couponCodeValue) {
                const isCouponInvalid = cart && cart.filter((item) => item.shopId?._id === shopId)
                if (isCouponInvalid.length === 0) {
                    toast.error('Coupon code is not valid for this shop')
                    setName('')
                    return
                } else {
                    const eligiblePrice = isCouponInvalid.reduce((acc, item) => {
                        let value = item?.quantity ?? 0
                        return acc + value * item.discountPrice
                    }, 0)
                    if (eligiblePrice < minAmount) {
                        toast.error('Minimum order value to apply discount code is ' + minAmount + ' VND.')
                        return
                    }
                    if (eligiblePrice > maxAmount) {
                        toast.error('Maximum order value to apply discount code is ' + maxAmount + ' VND.')
                        return
                    }
                    const disCountPrice = (eligiblePrice * couponCodeValue) / 100
                    setCouponCodeData(data.couponCode.couponCode)
                    setDiscountPrice(disCountPrice)
                    setName('')
                }
            }
        } catch (error) {
            toast.error('Coupon code doesn`t exists!')
            setName('')
        }
    }

    const shipping = useMemo(() => subTotalPrice * 0.1, [subTotalPrice]);

    const disCountPercentage = useMemo(() => {
        return couponCodeData ? disCountPrice : 0;
    }, [couponCodeData, disCountPrice]);

    const totalPrice = useMemo(() => {
        const priceBeforeDiscount = subTotalPrice + shipping;
        return couponCodeData
            ? (priceBeforeDiscount - disCountPercentage).toFixed(2)
            : priceBeforeDiscount.toFixed(2);
    }, [subTotalPrice, shipping, couponCodeData, disCountPercentage]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            zipCode: '',
            city: '',
            address: '',
        },
        onSubmit: async (values) => {
            const orderData = {
                cart,
                totalPrice,
                subTotalPrice,
                shipping,
                disCountPercentage,
                shippingAddress: values,
                user: currentUser
            }
            localStorage.setItem('latestOrder', JSON.stringify(orderData))
            navigate('/payment')
        }
    })

    return (
        <>
            <div className='flex items-start justify-between'>
                <div className="w-[60%] bg-white rounded-md shadow p-5 pb-8">
                    <h5 className="text-[18px] font-[500]">Shipping Address</h5>
                    <br />
                    <form onSubmit={formik.handleSubmit}>
                        <div className="w-full flex pb-3 gap-4">
                            <div className="w-[50%]">
                                <label className="block pb-2">Full Name</label>
                                <input
                                    type="text"
                                    name='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    required
                                    className='text-[14px] text-gray-800 border border-solid w-full border-gray-300 pl-3 pr-6 py-2 appearance-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none '
                                />
                            </div>
                            <div className="w-[50%]">
                                <label className="block pb-2">Email Address</label>
                                <input
                                    type="email"
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    required
                                    className='text-[14px] text-gray-800 border border-solid w-full border-gray-300 pl-3 pr-6 py-2 appearance-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none '
                                />
                            </div>
                        </div>

                        <div className="w-full flex pb-3 gap-4">
                            <div className="w-[50%]">
                                <label className="block pb-2">Phone Number</label>
                                <input
                                    type="number"
                                    required
                                    name='phone'
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    className='text-[14px] text-gray-800 border border-solid w-full border-gray-300 pl-3 pr-6 py-2 appearance-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none '
                                />
                            </div>
                            <div className="w-[50%]">
                                <label className="block pb-2">Zip Code</label>
                                <input
                                    type="number"
                                    name='zipCode'
                                    value={formik.values.zipCode}
                                    onChange={formik.handleChange}
                                    required
                                    className='text-[14px] text-gray-800 border border-solid w-full border-gray-300 pl-3 pr-6 py-2 appearance-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none '
                                />
                            </div>
                        </div>

                        <div className="w-full flex pb-3 gap-4">

                            <div className="w-[50%]">
                                <label className="block pb-2">City</label>
                                <select
                                    className="text-[14px] text-gray-800 border border-solid w-full border-gray-300 pl-3 pr-6 py-2 appearance-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none "
                                    name='city'
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                >
                                    <option className="block pb-2" value="">
                                        Choose your City
                                    </option>
                                    {
                                        country.map((item) => (
                                            <option key={item._id} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="w-[50%]">
                                <label className="block pb-2">Address</label>
                                <input
                                    type="address"
                                    required
                                    name='address'
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    className='text-[14px] text-gray-800 border border-solid w-full border-gray-300 pl-3 pr-6 py-2 appearance-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none '
                                />
                            </div>
                        </div>
                        <input value='Go to Payment' type='submit'
                            className='w-[150px] text-white cursor-pointer shadow bg-gradient-to-r from-green-300 via-green-400 to-green-500 text-center px-4 py-3 rounded-md mt-5'
                        />
                    </form>
                </div>

                <div className='w-[30%]'>
                    <div className="w-full bg-[#fff] rounded-md shadow p-5 pb-8">
                        <div className="flex justify-between">
                            <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
                            <h5 className="text-[18px] font-[600]">{subTotalPrice}VND</h5>
                        </div>
                        <br />
                        <div className="flex justify-between">
                            <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
                            <h5 className="text-[18px] font-[600]">{shipping && shipping.toFixed(2)}VND</h5>
                        </div>
                        <br />
                        <div className="flex justify-between border-b pb-3">
                            <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
                            <h5 className="text-[18px] font-[600]">
                                {disCountPercentage && disCountPercentage.toFixed(2)}
                            </h5>
                        </div>
                        <h5 className="text-[18px] font-[600] text-end pt-3">{totalPrice}</h5>
                        <br />
                        <div >
                            <input
                                type="text"
                                className='text-[14px] text-gray-800 border border-solid w-full border-gray-300 pl-3 pr-6 py-2 appearance-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none'
                                placeholder="Coupon code"
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            />
                            <button
                                className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
                                onClick={handleApplyCode}
                            >
                                Apply code
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default CheckOut