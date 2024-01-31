import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { currentShop, rootState } from '../../interface.ts'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd';
import { createAxios } from '../../createIntance.ts';
import { logOutSuccess } from '../../redux/shopSlice.ts';
import { shopLogoutRoute } from '../../router/userRouter.ts';
import { getCouponCodeSuccess } from '../../redux/allCouponCodeSlice.ts';
import { getEventOfShopSuccess } from '../../redux/allEventOfShopSlice.ts';
import { getOrderSuccess } from '../../redux/allOrderSlice.ts';

interface IProps {
    currentShop: currentShop
}

const ProfileShopInfo = ({ currentShop }: IProps) => {
    const { currentProduct } = useSelector((state: rootState) => state.allProduct.allProduct)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const totalProduct = useMemo(() => {
        const total = currentProduct.reduce((acc, item) => {
            if (item?.shopId?._id && item.shopId._id === currentShop._id) {
                return acc + 1;
            } else {
                return acc;
            }
        }, 0)
        return total
    }, [currentShop._id, currentProduct])

    const handleOk = async () => {
        try {
          const axiosJWT = createAxios(currentShop, dispatch, logOutSuccess)
          const { data } = await axiosJWT.get(shopLogoutRoute)
          navigate("/shop-login");
          dispatch(logOutSuccess())
          dispatch(getCouponCodeSuccess([]))
          dispatch(getEventOfShopSuccess([]))
          dispatch(getOrderSuccess([]))
        } catch (error) {
          console.log(error);
          
        }
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    return (
        <div className='w-[25%] h-screen bg-white shadow rounded px-3 py-6 overflow-y-auto'>
            <div>
                <div className='flex items-center justify-center'>
                    <img src={currentShop.avatar?.url[0]?.url ?? ''} alt="" className='w-[150px] h-[150px] rounded-full object-cover' />
                </div>
                <h2 className='text-center text-[18px] font-semibold text-gray-800'>{currentShop.name}</h2>
                <p className='text-[#555] mt-4'>{currentShop.description}</p>
                <div className='mt-4'>
                    <h2 className='text-gray-800 font-medium'>Address</h2>
                    <h4 className='text-[#555]'>{currentShop.address}</h4>
                </div>
                <div className='mt-4'>
                    <h2 className='text-gray-800 font-medium'>Phone Number</h2>
                    <h4 className='text-[#555]'>{currentShop.phone}</h4>
                </div>
                <div className='mt-4'>
                    <h2 className='text-gray-800 font-medium'>Total Products</h2>
                    <h4 className='text-[#555]'>{totalProduct}</h4>
                </div>
                <div className='mt-4'>
                    <h2 className='text-gray-800 font-medium'>Shop Ratings</h2>
                    <h4 className='text-[#555]'>4/5</h4>
                </div>

                <div className='w-full shadow bg-gradient-to-r mt-4 from-green-300 via-green-400 to-green-500 text-center px-4 py-3 rounded-md'>
                    <Link to="/edit"><button className='text-white font-bold'>Edit Shop</button></Link>
                </div>
                <div className='w-full shadow bg-gradient-to-r mt-4 from-green-300 via-green-400 to-green-500 text-center px-4 py-3 rounded-md'>
                    <button onClick={() => setIsModalOpen(true)} className='text-white font-bold'>Log Out</button>
                </div>
            </div>
            <Modal
                title="Confirmed sign out"
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
                <p>Are you sure you want to sign out? This action cannot be completed.</p>
            </Modal>
        </div>
    )
}

export default ProfileShopInfo