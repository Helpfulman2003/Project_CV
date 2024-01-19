/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useRef, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { IoCartOutline } from 'react-icons/io5'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineMessage } from 'react-icons/ai'
import ProductDetailInfo from './ProductDetailInfo.tsx'
import RelativeProduct from './RelativeProduct.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { currentProduct, rootState } from '../../interface.ts'
import { toast } from 'react-toastify'
import { addToCart } from '../../redux/cartSlice.ts'

const ProductDetail = () => {
    const [selected, setSelected] = useState<boolean>(false)
    const [value, setValue] = useState<number>(1)
    const { currentProduct } = useSelector((state: rootState) => state.allProduct.allProduct)
    const cart = useSelector((state: rootState) => state.cart.cart)
    const dispatch = useDispatch()
    const { id } = useParams<string>()
    const ref = useRef<HTMLImageElement>(null)

    const getProduct = useMemo(() => {
        const product = currentProduct.find((item) => item._id === id)
        return product
    }, [id])

    const handleBtn = (value: string) => {
        switch (value) {
            case 'increase':
                setValue(prev => prev + 1)
                break
            case 'decrease':
                setValue(prev => prev > 1 ? prev - 1 : prev)
                break
            default:
        }
    }

    const handleAddToCart = (product: currentProduct) => {
        const isItemExists = cart && cart.find((i) => i._id === product._id);
        if (isItemExists) {
            toast.error('Product already in cart!', { toastId: 'product-in-cart-error' });
        } else {
            if (product.stock < value) {
                toast.error("Product stock limited!", { toastId: 'product-stock-limited-error' });
            } else {
                toast.success('Add to cart success', { toastId: 'add-to-cart-success' });
                dispatch(addToCart({ ...product, quantity: value }));
            }
        }
    };

    const handleChangeImage = (e: React.MouseEvent<HTMLImageElement>) => {
        if (ref.current) {
            ref.current.src = (e.target as HTMLImageElement ).src;
        }
    }


    return (
        <div className='px-[10%] w-full mt-5'>
            <div className='flex items-start justify-start gap-3 mb-5 gap-x-4'>
                <div className='w-[50%]'>
                    <div>
                        <img ref={ref} src={getProduct?.images?.url[0].url} alt="" className='w-[100%] object-cover' />
                    </div>
                    <div className='flex items-center justify-between mt-1'>
                        {
                            getProduct?.images?.url && getProduct.images.url.length > 0 && <div className='w-[50%]'><img onClick={handleChangeImage} src={getProduct?.images?.url[0].url} className='h-[150px] w-full border-solid border-[1px] object-cover' alt="" /></div>
                        }
                        {
                            getProduct?.images?.url && getProduct.images.url.length > 1 && <div className='w-[50%]'><img onClick={handleChangeImage} src={getProduct.images.url[1].url} alt="" className='h-[150px] w-full border-[1px] border-solid object-cover' /></div>
                        }
                    </div>
                </div>
                <div className='w-[50%]'>
                    <h2 className='text-[20px] font-bold text-[#333]'>{getProduct?.name}</h2>
                    <p className='text-[#333] h-[112px]'>{getProduct?.description}</p>
                    <div className='flex items-center justify-start gap-4 mt-3'>
                        <span className='text-[#333] font-bold text-[20px]'>{getProduct?.discountPrice}VND</span>
                        <span className='text-red-500 line-through font-semibold translate-y-[-4px]'>{getProduct?.originalPrice}VND</span>
                    </div>
                    <div className='flex items-center justify-between mt-10'>
                        <div className='flex items-center justify-start rounded-md'>
                            <button onClick={() => handleBtn("decrease")} className='w-[42px] bg-gradient-to-r rounded-l from-teal-400 to-teal-500 px-3 py-2 rounded-md font-bold hover:opacity-75 transition duration-300 ease-in-out shadow-lg text-white'>-</button>
                            <span className='block text-center w-[42px] rounded-md bg-[#e3e5e9] font-semibold text-[#333] px-3 py-2'>{value}</span>
                            <button onClick={() => handleBtn("increase")} className='w-[42px] bg-gradient-to-r from-teal-400 to-teal-500 px-3 py-2 rounded-md font-bold hover:opacity-75 transition duration-300 ease-in-out shadow-lg text-white'>+</button>
                        </div>
                        <div>
                            {
                                selected ? (<FaHeart size={20} className='mr-3 text-red-500' onClick={() => setSelected(!selected)} />) : (<FaRegHeart size={20} className='mr-3' onClick={() => setSelected(!selected)} />)
                            }
                        </div>
                    </div>
                    <button onClick={() => { handleAddToCart(getProduct!) }} className='w-[140px] bg-green-500 text-center px-4 py-3 rounded-md my-5 text-white flex items-center justify-center gap-2 text-[14px] font-semibold'>
                        Add to cart <IoCartOutline size={20} />
                    </button>
                    <div className='flex items-center justify-between mt-3'>
                        <div className='flex items-center justify-start gap-4'>
                            <div>
                                <img src={getProduct?.shopId?.avatar.url[0].url} alt="" className='w-[50px] h-[50px] rounded-full' />
                            </div>
                            <div>
                                <p className='text-[#6cb0fb]'>{getProduct?.shopId?.name}</p>
                                <p>({4}) rating</p>
                            </div>
                        </div>
                        <div className='w-[150px] bg-green-500 text-center px-4 py-3 rounded-md my-3'>
                            <Link to=""><button className='text-white font-bold text-[12px] flex items-center justify-center gap-1'>Send Message <AiOutlineMessage size={16} /></button></Link>
                        </div>
                        <div className='mt-4 text-green-600 translate-y-[-8px]'>
                            <span>({getProduct?.sold_out}) Sold out</span>
                        </div>
                    </div>
                </div>
            </div>
            <ProductDetailInfo getProduct={getProduct!} />
            <RelativeProduct getProduct={getProduct!} />
        </div>
    )
}

export default ProductDetail