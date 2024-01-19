import React, { useEffect, useMemo, useRef, useState } from 'react'
import Logo from "../../asset/img/Logo.png"
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom"
import { IoClose } from "react-icons/io5";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { HiMinusSmall } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
// import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { currentProduct, rootState } from "../../interface.ts"
import { toast, ToastContainer } from 'react-toastify';
import { addToCart, removeFromCart } from '../../redux/cartSlice.ts';

const Header = () => {
    const [openCart, setOpenCart] = useState<boolean>(false);
    const [openWishlist, setOpenWishlist] = useState<boolean>(false);
    const { currentUser } = useSelector((state: rootState) => state.user.user);
    const { currentProduct } = useSelector((state: rootState) => state.allProduct.allProduct)
    const cart = useSelector((state: rootState) => state.cart.cart);
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [searchData, setSearchData] = useState<currentProduct[] | any>(null)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null);

    const handleChange = (text: string, data: currentProduct, index: number) => {
        let newQuantity: number | undefined = cart[index].quantity ?? 0;

        switch (text) {
            case 'increase':
                if (data.stock <= newQuantity) {
                    toast.error('Product stock limited!');
                } else {
                    newQuantity += 1;
                }
                break;
            case 'decrease':
                newQuantity = newQuantity > 1 ? newQuantity - 1 : 1;
                break;
            default:
                break;
        }

        if (newQuantity !== cart[index].quantity) {
            const updateCartData = { ...data, quantity: newQuantity };
            dispatch(addToCart(updateCartData));
        }
    };

    const totalPrice = useMemo<number>(() => {
        return cart.reduce((acc: number, item) => {
            let value = item?.quantity ?? 0

            return acc + value * item.discountPrice
        }, 0)
    }, [cart])

    const handleDeleteProduct = (item: currentProduct) => {
        dispatch(removeFromCart(item._id))
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value
        setSearchTerm(term)
        const searchData = currentProduct.filter((product) => {
            return product.name.toLowerCase().includes(term.toLowerCase())
        })
        setSearchData(searchData)
    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
            // Nếu dropdown đang mở và click không phải là trên dropdown
            if (open && ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [open]);


    return (
        <div className='w-full px-[10%] flex justify-between items-center py-3 bg-[#fff5e1]'>
            <Link to='/'>
                <div className='w-[80px]'>
                    <img src={Logo} alt="" className='w-full object-cover' />
                </div></Link>
            <div className='w-[50%] relative' >
                <input onChange={handleSearchChange} onClick={() => setOpen(true)} value={searchTerm} type="text" placeholder='Search product...' className='w-full px-3 py-2 rounded-lg focus:outline-none border-[2px] border-solid border-[#5ed2a3]' />
                <CiSearch size={25} className='absolute right-[6px] top-[10px]' />
                {
                    open && searchData && (
                        <div ref={ref} className='absolute top-full rounded-md min-h-[30vh] bg-slate-50 shadow-md z-[9] p-4 w-full overflow-y-auto'>
                            {searchData.map((item: currentProduct, index: number) => {
                                return (
                                    <Link to={`/product/${item._id}`} key={index}>
                                        <div className="w-full flex items-start py-3">
                                            <img
                                                src={`${item.images?.url[0].url}`}
                                                alt=""
                                                className="w-[40px] h-[40px] mr-[10px]"
                                            />
                                            <h1>{item.name}</h1>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    )
                }
            </div>
            <div className='flex items-center justify-between gap-4'>
                <div className='relative' onClick={() => setOpenWishlist(true)}>
                    <IoMdHeartEmpty size={30} />
                    <div className='absolute top-0 right-[-2px] rounded-full flex items-center justify-center w-4 h-4 bg-[#3bc177]'>
                        <span className='text-white text-[12px]'>0</span>
                    </div>
                </div>
                <div className='relative cursor-pointer' onClick={() => setOpenCart(true)} >
                    <IoCartOutline size={30} />
                    <div className='absolute top-0 right-[-2px] rounded-full flex items-center justify-center w-4 h-4 bg-[#3bc177]'>
                        <span className='text-white text-[12px]'>{cart.length}</span>
                    </div>
                </div>
                <div>
                    {
                        currentUser.name ? (
                            <Link to='/profile'>
                                <div className='flex items-center justify-start gap-1'>
                                    <img src={currentUser.avatar?.url[0]?.url} className='h-7 w-7 rounded-full object-cover' alt="" />
                                    <div>{currentUser.name}</div>
                                </div></Link>
                        ) : (<Link to="/login">Login</Link>)
                    }
                </div>
            </div>
            {
                openCart && (
                    <div className='fixed w-full h-full top-0 left-0 bg-[#00000030] z-10'>
                        <div className='absolute top-0 left-[75%] w-[25%] bg-white h-full z-20'>
                            <div className='w-full flex justify-end pt-5 px-4 cursor-pointer'>
                                <IoClose size={30} color='#333' onClick={() => setOpenCart(false)} />
                            </div>
                            <div className='overflow-y-auto h-[80%]'>
                                <div className='flex justify-start gap-3 items-center px-4 mb-2 pb-4 border-solid border-b border-gray-200'>
                                    <IoBagHandleOutline size={24} />
                                    <span className='font-bold text-gray-800 text-[20px] \'>{cart.length} items</span>
                                </div>
                                <div className=''>
                                    {/* map qua từng sản phẩm */}
                                    <div className='py-4 border-solid border-b border-gray-200'>
                                        {
                                            cart?.map((item, index: number) => {
                                                return (
                                                    <div key={item._id} className='mb-2'>
                                                        <div className='flex items-start justify-start px-4 gap-2 '>
                                                            <div>
                                                                <img src={item.images?.url[0].url} className='w-[80px] h-[80px] object-cover' alt="" />
                                                            </div>
                                                            <div>
                                                                <h2 className='text-[#333] text-[14px]'>
                                                                    {item.name}
                                                                </h2>
                                                                <span className='font-bold text-red-500'>
                                                                    {item.discountPrice} VND
                                                                </span>
                                                            </div>
                                                            <div className='flex-1 flex items-center justify-end'>
                                                                <IoClose size={20} className='cursor-pointer' onClick={() => handleDeleteProduct(item)} />
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center justify-between px-4 text-gray-800 mt-2'>
                                                            <div className='flex justify-start gap-3'>
                                                                <div onClick={() => handleChange('decrease', item, index)} className='w-7 h-7 bg-red-600 rounded-full flex items-center justify-center shadow-md cursor-pointer'><HiMinusSmall size={20} color='#fff' /></div>
                                                                <span>{item.quantity ?? 0}</span>
                                                                <div onClick={() => handleChange('increase', item, index)} className='w-7 h-7 bg-red-600 rounded-full flex items-center justify-center shadow-md cursor-pointer'><IoAdd size={20} color='#fff' /></div>
                                                            </div>
                                                            <div className='text-[14px] font-medium text-gray-800'>
                                                                Total Price: {item.discountPrice * (item?.quantity ?? 0)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className='flex items-center justify-start px-4 gap-2'>
                                            <div>
                                                <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" className='w-[80] h-[80px] object-cover' alt="" />
                                            </div>
                                            <div>
                                                <h2 className='text-[#333] text-[14px]'>
                                                    Iphone 14pro max 256 gb ssd and 8gb ram sliver color
                                                </h2>
                                                <span className='font-bold text-red-500'>
                                                    999 VND
                                                </span>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between px-4 text-gray-800 mt-2'>
                                            <div className='flex justify-start gap-3'>
                                                <div className='w-7 h-7 bg-red-600 rounded-full flex items-center justify-center shadow-md'><HiMinusSmall size={20} color='#fff' /></div>
                                                <span>1</span>
                                                <div className='w-7 h-7 bg-red-600 rounded-full flex items-center justify-center shadow-md'><IoAdd size={20} color='#fff' /></div>
                                            </div>
                                            <div className='text-[14px] font-medium text-gray-800'>
                                                Total Price: 999
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link to='/checkout'>
                                <div className='absolute left-4 bottom-4 right-4 bg-red-500 text-center  py-3 rounded-md '>
                                    <button className='text-white text-[18px] font-semibold'>Checkout Now ({totalPrice} VND)</button>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            }

            {
                openWishlist && (
                    <div className='fixed w-full h-full top-0 left-0 bg-[#00000030] z-10'>
                        <div className='absolute top-0 left-[75%] w-[25%] bg-white h-full z-20'>
                            <div className='w-full flex justify-end pt-5 px-4 cursor-pointer'>
                                <IoClose size={30} color='#333' onClick={() => setOpenCart(false)} />
                            </div>
                            <div className='overflow-y-auto h-[80%]'>
                                <div className='flex justify-start gap-3 items-center px-4 mb-2 pb-4 border-solid border-b border-gray-200'>
                                    <IoMdHeartEmpty size={24} />
                                    <span className='font-bold text-gray-800 text-[20px] \'>3 items</span>
                                </div>
                                <div className=''>
                                    {/* map qua từng sản phẩm */}
                                    <div className='py-4 border-solid border-b border-gray-200 flex justify-center items-center'>
                                        <div className='flex items-center justify-between px-4 gap-2 '>
                                            <div>
                                                <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" className='w-[80px] h-[80px] object-cover' alt="" />
                                            </div>
                                            <div>
                                                <h2 className='text-[#333] text-[14px]'>
                                                    Iphone 14pro max 256 gb ssd and 8gb ram sliver color
                                                </h2>
                                                <span className='font-bold text-red-500'>
                                                    999 VND
                                                </span>
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <IoClose size={20} />
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className='absolute left-4 bottom-4 right-4 bg-red-500 text-center  py-3 rounded-md '>
                                <button className='text-white text-[18px] font-semibold'>Add to cart</button>
                            </div>
                        </div>
                    </div>
                )
            }
            <ToastContainer />
        </div>
    )
}

export default Header