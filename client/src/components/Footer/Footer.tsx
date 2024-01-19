import React from 'react'
import { FaFacebookSquare, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { footerProductLinks, footerSupportLinks, footercompanyLinks } from '../../data.ts';
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className='w-full px-[10%] py-7 bg-[#000000] text-white'>
            <div className='grid grid-cols-2'>
                <div>
                    <span className='text-[36px] font-semibold text-[#56d879]'>Subscribe</span>
                    <p className='text-[36px] font-semibold text-white'>us for get news events and offers</p>
                </div>
                <div className='flex justify-center items-center gap-6'>
                    <input className='h-[48px] text-[#333] w-[200px] px-2 focus:outline-none rounded-md' type="text" placeholder='Enter your email...' />
                    <button className='w-[200px] bg-green-500 text-center px-4 py-3 rounded-md my-3 hover:bg-teal-500 duration-300'>Submit</button>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-12 mt-14'>
                <ul className='flex flex-col justify-center gap-2'>
                    <li>
                        <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" style={{filter: 'brightness(0) invert(1)'}} alt="" />
                    </li>
                    <li>The home and elements needed to create beautiful products.</li>
                    <li className='flex items-center justify-start gap-4 mt-4'>
                        <FaFacebookSquare size={20} />
                        <FaTwitter size={20} />
                        <FaInstagram size={20} />
                        <AiOutlineYoutube size={20} />
                    </li>
                </ul>
                <ul>
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
                <ul>
                    <li className='mb-1 font-semibold'>Support</li>
                    {
                        footerSupportLinks.map((element, index: number) => {
                            return (
                                <li key={index} className='text-gray-400 hover:text-teal-400 duration-300'>{element.name}</li>
                            )
                        } )
                    }
                </ul>
                <ul>
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
            <div className='flex items-center justify-between text-gray-400 mt-16'>
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