/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoCameraOutline } from "react-icons/io5";
import ProfileContentOrder from './ProfileContentOrder.tsx';
import ProfilePaymentMethod from './ProfilePaymentMethod.tsx';
import ProfileContentAddress from './ProfileContentAddress.tsx';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../interface.ts';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/cartSlice.ts';
import { logOutSuccess, loginSuccess } from '../../redux/userSlice.ts';
import { getAllOrderOfUser, logoutRoute, upDateUserRoute } from '../../router/userRouter.ts';
import { createAxios } from '../../createIntance.ts';
import { getOrderError, getOrderStart, getOrderSuccess } from '../../redux/allOrderUserSlice.ts'
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';

interface IProps {
  show: number;
}

const ProfileContent = ({ show }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [image, setImage] = useState<string | null>('')
  const { currentUser } = useSelector((state: rootState) => state.user.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess)

  const formik = useFormik({
    initialValues: {
      name: currentUser.name ?? '',
      email: currentUser.email ?? '',
      phone: currentUser.phone ?? 0,
      zipCode: currentUser.address?.zipCode ?? 0,
      city: currentUser.address?.city ?? '',
      address: currentUser.address?.address ?? '',
      files: currentUser?.avatar?.url?.[0]?.url ?? '',
    },
    onSubmit: async (values) => {
      let formData = new FormData()
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('phone', values.phone.toString())
      formData.append('zipCode', values.zipCode.toString())
      formData.append('city', values.city)
      formData.append('address', values.address)
      if(values.files) {
        for(let file of values.files) {
          formData.append('files', file)
        }
      }
      try {
        const {data} = await axiosJWT.put(upDateUserRoute, formData)
        dispatch(loginSuccess(data.userUpdate.user))
        toast.success('Update success!')
      } catch (error) {
        toast.error(error.responsive.data.message)
      }
    }
  })


  useEffect(() => {
    const fetchData = async () => {
      const axiosJWT = createAxios(currentUser, dispatch, loginSuccess)
      try {
        dispatch(getOrderStart())
        const { data } = await axiosJWT.get(getAllOrderOfUser)
        dispatch(getOrderSuccess(data.orderUser))
      } catch (error) {
        dispatch(getOrderError())
        console.log(error);
      }
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    setIsModalOpen(show === 7)
  }, [show])

  const handleOk = async () => {
    try {
      const axiosJWT = createAxios(currentUser, dispatch, logOutSuccess)
      const { data } = await axiosJWT.get(logoutRoute)
      navigate("/login");
      dispatch(getOrderSuccess([]))
      dispatch(clearCart())
      localStorage.setItem('latestOrder', JSON.stringify('{}'))
    } catch (error) {
      navigate('/login')
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className='col-span-3'>
      {show === 0 && (
        <form onSubmit={formik.handleSubmit}>
          <div className='flex items-center justify-center mb-12'>
            <div className='relative'>
              {
                image ? (<img src={image} className='w-[150px] h-[150px] object-cover border-[3px] border-[#3ad132] rounded-full' alt="" />) : (
                  <img src={currentUser && currentUser.avatar && currentUser.avatar.url && currentUser.avatar.url.length > 0 && currentUser.avatar.url[0].url ? currentUser.avatar.url[0].url : ''} className='w-[150px] h-[150px] object-cover border-[3px] border-[#3ad132] rounded-full' alt="" />
                )
              }
              <div className='absolute bg-[#e3e9ee] w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer bottom-[5px] right-[5px]'>
                <div className='w-full relative'>
                  <IoCameraOutline className='absolute top-[50%] translate-y-[-50%] right-[6px]' />
                  <input type="file" className='w-full h-full opacity-0 cursor-pointer' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
                      formik.setFieldValue('files', e.currentTarget.files)
                      setImage(URL.createObjectURL(e.currentTarget.files[0]))
                    }
                  }} name="files" multiple accept='.jpg, .png, .jpeg' />
                </div>
              </div>

            </div>
          </div>
          <div>
            <div className='grid grid-cols-2 grid-rows-4 gap-x-5 '>
              <div className='flex flex-col justify-center gap-1'>
                <label htmlFor="" className='text-gray-800'>Full Name</label>
                <input type="text" name='name' value={formik.values.name} onChange={formik.handleChange} className='w-full text-[16px] p-1 rounded-md border border-solid border-gray-200' />
              </div>
              <div className='flex flex-col justify-center gap-1'>
                <label htmlFor="" className='text-gray-800'>Email Address</label>
                <input type="email" name='email' value={formik.values.email} onChange={formik.handleChange} className='w-full text-[16px] p-1 rounded-md border border-solid border-gray-200' />
              </div>
              <div className='flex flex-col justify-center gap-1'>
                <label htmlFor="" className='text-gray-800'>Phone Number</label>
                <input type="number" name='phone' value={formik.values.phone} onChange={formik.handleChange} className='w-full text-[16px] p-1 rounded-md border border-solid border-gray-200' />
              </div>
              <div className='flex flex-col justify-center gap-1'>
                <label htmlFor="" className='text-gray-800'>Zip Code</label>
                <input type="text" name='zipCode' value={formik.values.zipCode} onChange={formik.handleChange} className='w-full text-[16px] p-1 rounded-md border border-solid border-gray-200' />
              </div>
              <div className='flex flex-col justify-center gap-1'>
                <label htmlFor="" className='text-gray-800'>Address 1</label>
                <input type="text" name='city' value={formik.values.city} onChange={formik.handleChange} className='w-full text-[16px] p-1 rounded-md border border-solid border-gray-200' />
              </div>
              <div className='flex flex-col justify-center gap-1'>
                <label htmlFor="" className='text-gray-800'>Address 2</label>
                <input type="text" name='address' value={formik.values.address} onChange={formik.handleChange} className='w-full text-[16px] p-1 rounded-md border border-solid border-gray-200' />
              </div>
              <div>
                <button type='submit' className='w-[250px] text-center border border-solid border-[#3ad132] text-[#34ba2d] mt-8 py-2 rounded cursor-pointer'>Update</button>
              </div>
            </div>
          </div>
        </form>)
      }
      {
        show === 1 && (<ProfileContentOrder />)
      }
      {
        show === 5 && (<ProfilePaymentMethod />)
      }
      {
        show === 6 && (<ProfileContentAddress />)
      }
      {
        show === 7 && (
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
        )
      }
      <ToastContainer/>
    </div>
  )
}

export default ProfileContent