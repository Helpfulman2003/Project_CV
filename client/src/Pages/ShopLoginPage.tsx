import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { shopLoginRoute } from '../router/userRouter.ts';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/shopSlice.ts';

const ShopLoginPage = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const formik = useFormik({
      initialValues: {
        name: "",
        password: "",
        checkbox: false
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .min(2, "Mininum 2 characters")
          .max(15, "Maximum 15 characters")
          .required("Required!"),
        password: Yup.string()
          .min(8, "Minimum 8 characters")
          .required("Required!"),
  
      }),
      onSubmit: async (values) => {
        try {
          const { data } = await axios.post(shopLoginRoute, values);
          dispatch(loginSuccess(data.shop));
          navigate('/shop');
        } catch (error) {
          setMessage(error.response.data.message || 'An error occurred');
        }
      }
  
    });
  
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      <h1 className='mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8'>Login to your shop</h1>
      <div className='bg-white py-8 px-10 shadow rounded-lg w-[450px]'>
        <form action="" className='space-y-4' onSubmit={formik.handleSubmit}>
          <div className='flex flex-col justify-center items-start gap-1'>
            <label htmlFor="" className='text-[14px] font-medium'>Full name</label>
            <input onChange={formik.handleChange} value={formik.values.name} name='name' type='text' className='text-[14px] text-gray-800 border border-solid w-full border-gray-300 pl-3 pr-6 py-2 appearance-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ' />
          </div>
          <div className='flex flex-col justify-center items-start gap-1 relative'>
            <label htmlFor="" className='text-[14px] font-medium'>Password</label>
            <input onChange={formik.handleChange} value={formik.values.password} name='password' className='text-[14px] text-gray-800 border border-solid w-full border-gray-300 pl-3 pr-6 py-2 appearance-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ' type={`${visible ? 'text' : 'password'}`} />
            {
              visible ? (<AiOutlineEyeInvisible size={24} className='absolute top-8 right-2 cursor-pointer' onClick={() => setVisible(false)} />) : (<AiOutlineEye size={24} className='absolute top-8 right-2 cursor-pointer' onClick={() => setVisible(true)} />)
            }
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex items-center justify-center gap-2'>
              <input type="checkbox" name="" id="" className='w-4 h-4 ' />
              <span className='text-[14px] text-[#333]'>Remember me</span>
            </div>
            <Link to="forgot-password"><span className='text-[14px] text-[#333] font-semibold hover:text-green-500'>Forgot password?</span></Link>
          </div>
          {message && <p className='text-red-500'>{message}</p>}
          <button className='text-white font-bold w-full bg-green-500 text-center px-3 py-2 rounded-md' type='submit'>Submit</button>
          <div className='flex justify-center items-center gap-2'>
            <p>Not have any account?</p>
            <Link to='/register' className='text-green-500'>Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ShopLoginPage