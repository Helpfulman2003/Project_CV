import React from 'react'
import { FaFacebookSquare, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { footerProductLinks, footerSupportLinks, footercompanyLinks } from '../../data.ts';
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className='w-full px-[10%] py-7 bg-[#000000] text-white'>
            <div className='block md:grid grid-cols-2'>
                <div>
                    <span className='lg:text-[36px] text-[24px] font-semibold text-[#56d879]'>Subscribe</span>
                    <p className='md:text-[36px] text-[24px] font-semibold text-white'>us for get news events and offers</p>
                </div>
                <div className='flex justify-center items-center gap-6'>
                    <input className='h-[48px] text-[#333] w-[230px] md:w-[200px] px-2 focus:outline-none rounded-md' type="text" placeholder='Enter your email...' />
                    <button className='w-[230px] md:w-[200px] bg-green-500 text-center px-4 py-3 rounded-md my-3 hover:bg-teal-500 duration-300'>Submit</button>
                </div>
            </div>
            <div className='grid md:grid-cols-4 grid-cols-1 gap-12 mt-14'>
                <ul className='flex flex-col justify-center items-center text gap-2'>
                    <li>
                        <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" style={{filter: 'brightness(0) invert(1)'}} alt="" />
                    </li>
                    <li className='md:text-center text-left'><span>The home and elements needed to create beautiful products.</span></li>
                    <li className='flex items-center justify-start gap-4 mt-4'>
                        <FaFacebookSquare size={20} />
                        <FaTwitter size={20} />
                        <FaInstagram size={20} />
                        <AiOutlineYoutube size={20} />
                    </li>
                </ul>
                <ul className='md:block flex flex-col items-center'>
                    <li className='mb-1 font-semibold'>Shop</li>
                    {
                        footerProductLinks.map((element, index: number) => {
                            return (
                                <div key={index}>
                                    {
                                        element.link ? <Link to={element.link}><li className='text-gray-400 hover:text-teal-400 duration-300'>{element.name}</li></Link> : <li className='text-gray-400 hover:text-teal-400 duration-300'>{element.name}</li>
                                    }
                                </div>
                            )
                        })
                    }
                </ul>
                <ul className='md:block flex flex-col items-center'>
                    <li className='mb-1 font-semibold'>Support</li>
                    {
                        footerSupportLinks.map((element, index: number) => {
                            return (
                                <li key={index} className='text-gray-400 hover:text-teal-400 duration-300'>{element.name}</li>
                            )
                        } )
                    }
                </ul>
                <ul className='md:block flex flex-col items-center'>
                    <li className='mb-1 font-semibold'>Company</li>
                    {
                        footercompanyLinks.map((element, index: number) => {
                            return (
                                <li key={index} className='text-gray-400 hover:text-teal-400 duration-300'>{element.name}</li>
                            )
                        } )
                    }
                </ul>
            </div>
            <div className='flex md:flex-row flex-col items-center justify-between text-gray-400 mt-16 md:gap-0 gap-4'>
                <div>@ 2020 Becodemy. All rights reserved.</div>
                <div>Term . Privacy policy</div>
                <div>
                    <img src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Footer