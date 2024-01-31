/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineDelete } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { currentCouponCode, rootState } from '../../interface.ts';
import { loginSuccess } from '../../redux/shopSlice.ts';
import { getCouponCodeSuccess } from '../../redux/allCouponCodeSlice.ts'
import { createAxios } from '../../createIntance.ts';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { createCouponRoute, deleteCouponCodeOfShop, getCouponOfShopRoute } from '../../router/userRouter.ts';
import { useNavigate } from 'react-router-dom';

const AllCouponCode = () => {
    const [open, setOpen] = useState(false)
    const { currentCouponCode } = useSelector((state: rootState) => state.allCouponCode.allCouponCode)
    const { currentShop } = useSelector((state: rootState) => state.shop.shop)
    const { currentProduct } = useSelector((state: rootState) => state.allProduct.allProduct)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [couponCodeId, setCouponCodeId] = useState<string | undefined>('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const axiosJWT = createAxios(currentShop, dispatch, loginSuccess)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axiosJWT.get(getCouponOfShopRoute)
            if (data && data.coupons) {
              dispatch(getCouponCodeSuccess(data.coupons))
            } else {
              throw new Error("No products found")
            }
          } catch (error) {
            if (error.response.data.message === 'jwt expired') {
              navigate('/shop-login')
            }
          }
        }
        fetchData()
      }, [dispatch])

    const formik = useFormik({
        initialValues: {
            name: '',
            value: '',
            minAmount: '',
            maxAmount: '',
            productSelected: ''
        },
        onSubmit: async (values) => {
            try {
                const { data } = await axiosJWT.post(createCouponRoute, values)
                toast.success(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                const listCouponCode: currentCouponCode[] = [...currentCouponCode, data.coupon.coupon[0]]
                dispatch(getCouponCodeSuccess(listCouponCode))
                setOpen(false)

            } catch (error) {
                toast.error(error.response.data.message || 'An error occurred', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }

        }

    })

    const handleOk = async () => {
        const listCouponCode = currentCouponCode.filter((couponCode: currentCouponCode) => couponCode._id !== couponCodeId)
        dispatch(getCouponCodeSuccess(listCouponCode))
        setIsModalOpen(false);
        try {
            const { data } = await axiosJWT.delete(`${deleteCouponCodeOfShop}/${couponCodeId}`)
        } catch (error) {
            console.log(error);
        }

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns: ColumnsType<currentCouponCode> = [
        {
            title: 'CouponCodeId',
            dataIndex: '_id',
            key: '_id',
            // render: (text) => <a>{text}</a>,
            width: '100',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // render: (text) => <a>{text}</a>,
            width: '120',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            width: '50',
        },
        {
            title: 'Min amount',
            dataIndex: 'minAmount',
            key: 'minAmount',
            width: '80',
        },
        {
            title: 'Max amount',
            dataIndex: 'maxAmount',
            key: 'maxAmount',
            width: '80',
        },
        {
            title: 'Product Selected',
            dataIndex: 'productSelected',
            key: 'productSelected',
            width: '100'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <AiOutlineDelete size={20} className='cursor-pointer' onClick={() => {
                        setIsModalOpen(true)
                        setCouponCodeId(record?._id)
                    }} />
                </Space>
            ),
            width: '100',
        },
    ];
    return (
        <div className="w-[90%] pt-1  bg-white">
            <div className="w-full flex justify-end">
                <div onClick={() => setOpen(true)} className='w-[150px] shadow bg-gradient-to-r from-green-300 via-green-400 to-green-500 text-center px-3 py-4 text-[12px] cursor-pointer rounded-md mb-3'>
                    <button className='text-white font-bold'>Create Coupon Code</button>
                </div>
            </div>
            <Table columns={columns} dataSource={currentCouponCode} style={{ width: '100%' }} scroll={{ x: 900 }} />
            <Modal
                title="Confirmed deletion"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{
                    style: {
                        backgroundColor: 'green',
                        borderColor: 'green',
                        color: 'white',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
                    }
                }}
                cancelButtonProps={{
                    style: {
                        borderColor: 'green',
                        color: 'black'
                    },
                }}
            >
                <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            </Modal>
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
                                    Create Coupon Code
                                </h5>
                                {/* create coupoun code */}
                                <form onSubmit={formik.handleSubmit}>
                                    <br />
                                    <div>
                                        <label className="pb-2">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            required
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Enter your coupon code name..."
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label className="pb-2">
                                            Discount Percentage
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="value"
                                            value={formik.values.value}
                                            onChange={formik.handleChange}
                                            required
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Enter your coupon code value..."
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label className="pb-2">Min Amount</label>
                                        <input
                                            type="number"
                                            value={formik.values.minAmount}
                                            onChange={formik.handleChange}
                                            name='minAmount'
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Enter your coupon code min amount..."
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label className="pb-2">Max Amount</label>
                                        <input
                                            type="number"
                                            name='maxAmount'
                                            value={formik.values.maxAmount}
                                            onChange={formik.handleChange}
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Enter your coupon code max amount..."
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label className="pb-2">Selected Product</label>
                                        <select
                                            className="w-full mt-2 border h-[35px] rounded-[5px]"
                                            name='productSelected'
                                            value={formik.values.productSelected}
                                            onChange={formik.handleChange}
                                        >
                                            <option value="Choose your selected products">
                                                Choose a selected product
                                            </option>
                                            {currentProduct &&
                                                currentProduct.map((i) => (
                                                    <option value={i.name} key={i._id}>
                                                        {i.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <br />
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

export default AllCouponCode