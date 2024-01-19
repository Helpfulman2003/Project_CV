import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RxAvatar } from "react-icons/rx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import { registerRoute } from '../router/userRouter.ts';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            files: null,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .min(8, "Minimum 8 characters")
                .required("Required!"),
            files: Yup.mixed().required("At least one file is required")
        }),
        onSubmit: async (values) => {
            let formData = new FormData()
            formData.append('name', values.name)
            formData.append('email', values.email)
            formData.append('password', values.password)
            if (values.files) {
                for (let i = 0; i < values.files['length']; i++) {
                    formData.append('files', values.files[i])
                }
            }

            const { data } = await axios.post(registerRoute, formData);
            if (data.success === false) {
                toast.error(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            } else {
                navigate('/login')
            }
        }
    });

    return (
        <div className='flex flex-col items-center justify-center w-full h-screen'>
            <h1 className='mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8'>Register as new user</h1>
            <div className='bg-white py-8 px-10 shadow rounded-lg w-[450px]'>
                <form className='space-y-4' onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <div className='flex flex-col justify-center items-start gap-1'>
                        <label htmlFor="" className='text-[14px] font-medium'>Full name</label>
                        <input value={formik.values.name} name='name' type='text' onChange={formik.handleChange} className='text-[14px] text-gray-800 border border-solid w-full border-gray-300 pl-3 pr-6 py-2 appearance-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ' />
                        {formik.errors.name && formik.touched.name && (
                            <p className='text-red-500'>{formik.errors.name}</p>
                        )}
                    </div>
                    <div className='flex flex-col justify-center items-start gap-1'>
                        <label htmlFor="" className='text-[14px] font-medium'>Email address</label>
                        <input value={formik.values.email} name='email' type='email' onChange={formik.handleChange} className='text-[14px] text-gray-800 border border-solid w-full border-gray-300 pl-3 pr-6 py-2 appearance-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ' />
                        {formik.errors.email && formik.touched.email && (
                            <p className='text-red-500'>{formik.errors.email}</p>
                        )}
                    </div>
                    <div className='flex flex-col justify-center items-start gap-1 relative'>
                        <label htmlFor="" className='text-[14px] font-medium'>Password</label>
                        <input value={formik.values.password} name='password' onChange={formik.handleChange} className='text-[14px] text-gray-800 border border-solid w-full border-gray-300 pl-3 pr-6 py-2 appearance-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ' type={`${visible ? 'text' : 'password'}`} />
                        {
                            visible ? (<AiOutlineEyeInvisible size={24} className='absolute top-8 right-2 cursor-pointer' onClick={() => setVisible(false)} />) : (<AiOutlineEye size={24} className='absolute top-8 right-2 cursor-pointer' onClick={() => setVisible(true)} />)
                        }
                        {formik.errors.password && formik.touched.password && (
                            <p className='text-red-500'>{formik.errors.password}</p>
                        )}
                    </div>
                    <div className='flex justify-start items-center'>
                        {selectedImage ? <img src={selectedImage} alt="Selected" className='w-[30px] h-[30px] object-cover rounded-full' /> : <RxAvatar size={30} />}
                        <label
                            htmlFor="file-input"
                            className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <span>Upload a file</span>
                            <input
                                type="file"
                                name="files"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    formik.setFieldValue("files", event.currentTarget.files);
                                    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
                                        formik.setFieldValue("files", event.currentTarget.files);
                                        setSelectedImage(URL.createObjectURL(event.currentTarget.files[0]));
                                    }
                                }}                                
                                id="file-input"
                                accept=".jpg, .jpeg, .png "
                                className="sr-only"
                                multiple
                            />
                            {formik.errors.files && formik.touched.files && (
                                <p className='text-red-500'>{formik.errors.files}</p>
                            )}
                        </label>
                    </div>
                    <div className='w-full bg-green-500 text-center px-3 py-2 rounded-md'>
                        <button className='text-white font-bold' type='submit'>Submit</button>
                    </div>
                </form>
                <div className='flex justify-center items-center gap-2'>
                    <p>Already have an account?</p>
                    <Link to='/login' className='text-green-500'>Login</Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register