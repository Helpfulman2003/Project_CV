import React, { useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useFormik } from "formik";
import { categoriesData } from '../../data.ts';
import { createAxios } from '../../createIntance.ts';
import { useDispatch, useSelector } from 'react-redux';
import { currentProduct, rootState } from '../../interface.ts';
import { loginSuccess } from '../../redux/shopSlice.ts'
import { createProductRoute } from '../../router/userRouter.ts'
import { ToastContainer, toast } from 'react-toastify';
import { getProductSuccess } from '../../redux/allProductShopSlice.ts';
// import {useNavigate} from 'react-router-dom'

const CreateProduct = () => {
    const [images, setSelectedImage] = useState<string[] | undefined>()
    const { currentShop } = useSelector((state: rootState) => state.shop.shop)
    const { currentProduct } = useSelector((state: rootState) => state.allProductShop.allProductShop)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(currentShop, dispatch, loginSuccess)
    // const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            category: '',
            tags: '',
            originalPrice: '',
            discountPrice: '',
            stock: '',
            files: '',
        },
        onSubmit: async (values) => {
            let formData = new FormData()
            formData.append('name', values.name)
            formData.append('description', values.description)
            formData.append('category', values.category)
            formData.append('tags', values.tags)
            formData.append('originalPrice', values.originalPrice)
            formData.append('discountPrice', values.discountPrice)
            formData.append('stock', values.stock)
            if (values.files) {
                Array.from(values.files).forEach((file: any) => {
                    formData.append('files', file)
                })
            }

            try {
                const { data } = await axiosJWT.post(createProductRoute, formData)
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
                const listProduct: currentProduct[] = [...currentProduct, data.product.product[0]]
                dispatch(getProductSuccess(listProduct))

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

    return (
        <div className=" w-[50%] bg-white h-[80%] shadow rounded-[4px] p-3 overflow-y-scroll">
            <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
            {/* create product form */}
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
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your product name..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        cols={30}
                        required
                        rows={8}
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your product description..."
                    ></textarea>
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="w-full mt-2 border h-[35px] rounded-[5px]"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                    >
                        <option value="">Choose a category</option>
                        {categoriesData &&
                            categoriesData.map((i) => (
                                <option value={i.title} key={i.title}>
                                    {i.title}
                                </option>
                            ))}
                    </select>
                </div>
                <br />
                <div>
                    <label className="pb-2">Tags</label>
                    <input
                        type="text"
                        name="tags"
                        value={formik.values.tags}
                        onChange={formik.handleChange}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your product tags..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">Original Price</label>
                    <input
                        type="number"
                        name="originalPrice"
                        value={formik.values.originalPrice}
                        onChange={formik.handleChange}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your product price..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Price (With Discount) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="discountPrice"
                        value={formik.values.discountPrice}
                        onChange={formik.handleChange}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your product price with discount..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Product Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="stock"
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your product stock..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Upload Images <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        name="files"
                        id="upload"
                        className="hidden"
                        accept=".jpg, .jpeg, .png "
                        multiple
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            if (event.currentTarget.files && event.currentTarget.files.length > 0) {
                                const fileArray = Array.from(event.currentTarget.files).map(file => URL.createObjectURL(file));
                                formik.setFieldValue('files', event.currentTarget.files);
                                setSelectedImage(fileArray);
                            }
                        }}
                    />
                    <div className="w-full flex items-center flex-wrap">
                        <label htmlFor="upload">
                            <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                        </label>
                        {images &&
                            images.map((i) => (
                                <img
                                    src={i}
                                    key={i}
                                    alt=""
                                    className="h-[120px] w-[120px] object-cover m-2"
                                />
                            ))}
                    </div>
                    <br />
                    <div>
                        <input
                            type="submit"
                            value="Create"
                            className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default CreateProduct