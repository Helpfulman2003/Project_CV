/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react'
import { IoCartOutline } from "react-icons/io5";
import { FaStar, FaRegStar, FaRegHeart, FaHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { MdRemoveRedEye } from "react-icons/md";
import CartProductDetail from './CartProductDetail.tsx';
import { Link } from 'react-router-dom';
import { currentProduct, rootState } from '../../interface.ts';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice.ts';
import { toast } from 'react-toastify';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface IProps {
  product: currentProduct
}

const CartProduct = (props: IProps) => {
  const { product } = props
  const [selected, setSelected] = useState<Boolean>(false)
  const [open, setOpen] = useState<Boolean>(false)
  const cart = useSelector((state: rootState) => state.cart.cart)
  const dispatch = useDispatch()

  const handleAddToCart = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error('Product already in cart!', { toastId: 'product-in-cart-error' });
    } else {
      if (product.stock < 1) {
        toast.error("Product stock limited!", { toastId: 'product-stock-limited-error' });
      } else {
        toast.success('Add to cart success', { toastId: 'add-to-cart-success' });
        dispatch(addToCart({ ...product, quantity: 1 }));
      }
    }
  };
  

  return (
    <div className='mt-[10px]'>
      <div className='bg-white rounded-md px-3 shadow-md py-4 relative'>
        <Link to={`/product/${product._id}`}>
          <div>
            <img src={product.images?.url[0].url} alt="product" className='w-[200px] h-[150px] object-cover'/>
          </div>
        </Link>
        <h3 className='text-blue-400 text-[14px] font-[400] mt-4'>{product.shopId?.name}</h3>
        <p className='font-bold mt-3 h-12'>{product.name.length > 35 ? product.name.slice(0, 35) + "..." : product.name}</p>
        <div>
        <div className='flex justify-start items-end'>
                                        {
                                        [1, 2, 3, 4, 5].map(i => {
                                            return (
                                                product.ratings >= i ? (
                                                    <AiFillStar
                                                        key={i}
                                                        className="mr-1 cursor-pointer"
                                                        color="rgb(246,186,0)"
                                                        size={20}
                                                      
                                                    />
                                                ) : (
                                                    <AiOutlineStar
                                                        key={i}
                                                        className="mr-1 cursor-pointer"
                                                        color="rgb(246,186,0)"
                                                        size={20}
                                                        
                                                    />
                                                )
                                            )
                                        })
                                    }
                                    </div>
        </div>
        <div className='mt-4 flex items-center justify-between'>
          <span className='text-[14px] font-semibold'>{product.discountPrice === 0 ? product.originalPrice : product.discountPrice}VND</span>
          <span className='text-[14px] text-red-500 font-[500] translate-y-[-8px] line-through'>{product.originalPrice ? product.originalPrice + "VND" : null}</span>
          <span className='text-[14px] text-[#4fa56f]'>{product.sold_out} sold</span>
        </div>

        <div className='absolute top-5 right-2 flex flex-col justify-center gap-2'>
          <div>
            {
              selected ? (<FaHeart size={20} color='#d55b45' className='cursor-pointer' onClick={() => { setSelected(!selected) }} />) : (<FaRegHeart size={20} color='#484848' className='cursor-pointer' /*onClick={() => { setSelected(!selected) }}*/ />)
            }
          </div>
          <div>
            {
              open && <MdRemoveRedEye size={20} color='#484848' />
            }
            {
              open ? (<CartProductDetail data={product} setOpen={setOpen} />) : (<FiEye size={20} color='#484848' onClick={() => setOpen(true)} />)
            }
          </div>
          <div>
            <IoCartOutline size={22} color='#484848' className='cursor-pointer' onClick={() => handleAddToCart(product._id)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartProduct