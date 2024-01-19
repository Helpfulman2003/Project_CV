import React, { useState } from 'react'
import { categoriesData } from '../../data.ts'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useFormik } from 'formik'
import { toast, ToastContainer } from 'react-toastify'
import { createAxios } from '../../createIntance.ts'
import { useDispatch, useSelector } from 'react-redux'
import { currentEvent, rootState } from '../../interface.ts'
import { loginSuccess } from '../../redux/shopSlice.ts'
import { createEventRoute } from '../../router/userRouter.ts'
import {getEventSuccess} from '../../redux/allEventSlice.ts'

const CreateEvent = () => {
    const [images, setImages] = useState<string[] | undefined>()
    const {currentShop} = useSelector((state: rootState) => state.shop.shop)
    const {currentEvent} = useSelector((state: rootState) => state.allEvent.allEvent)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(currentShop, dispatch, loginSuccess)

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
            finishDate: '',
            startDate: ''
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
            formData.append('finishDate', values.finishDate)
            formData.append('startDate', values.startDate)
            if (values.files) {
                Array.from(values.files).forEach((file: any) => {
                    formData.append('files', file)
                })
            }

            try {
                const { data } = await axiosJWT.post(createEventRoute, formData)
                console.log(data);
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
                const listEvent: currentEvent[] = [...currentEvent, data.event.event[0]]
                dispatch(getEventSuccess(listEvent))

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
            <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
            {/* create event form */}
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
                        placeholder="Enter your event product name..."
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
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        name="description"
                        className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your event product description..."
                    ></textarea>
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        name='category'
                        className="w-full mt-2 border h-[35px] rounded-[5px]"
                    >
                        <option value="Choose a category">Choose a category</option>
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
                        placeholder="Enter your event product tags..."
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
                        placeholder="Enter your event product price..."
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
                        placeholder="Enter your event product price with discount..."
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
                        placeholder="Enter your event product stock..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Event Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        id="start-date"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                        // value={startDate ? startDate.toISOString().slice(0, 10) : ""}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your event product stock..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Event End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="finishDate"
                        id="finish-date"
                        value={formik.values.finishDate}
                        onChange={formik.handleChange}
                        // value={endDate ? endDate.toISOString().slice(0, 10) : ""}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your event product stock..."
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
                        multiple
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            if (event.currentTarget.files && event.currentTarget.files.length > 0) {
                                const fileArray = Array.from(event.currentTarget.files).map(file => URL.createObjectURL(file))
                                formik.setFieldValue('files', event.currentTarget.files)
                                setImages(fileArray)
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

export default CreateEvent