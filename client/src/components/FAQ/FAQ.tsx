import React, { useState } from 'react'
import { fqas } from '../../data.ts'
import { GrFormNext } from "react-icons/gr";
import { IoClose } from "react-icons/io5";

const FAQ = () => {
    const [activeTab, setActiveTab] = useState<number>(-1)

    return (
        <div className='px-[10%] w-full mt-10 text-[#333] pb-4'>
            <h1 className='text-[28px] font-bold mb-4'>FAQ</h1>
            <ul className='flex flex-col justify-center gap-4'>
                {fqas.map((fqa, index: number) => {
                    return (
                        <li className='pb-4 border-b border-solid border-gray-200'>
                            <div className='flex items-center justify-between cursor-pointer'>
                                <p onClick={() => setActiveTab(activeTab === index ? -1 : index)} className='flex-1 text-lg font-medium text-gray-900'>{fqa.question}</p>
                                {activeTab === index ? <IoClose size={20} color='#333' onClick={() => setActiveTab(-1)}/> : <GrFormNext size={20} color='#333' onClick={() => setActiveTab(index)}/>}
                            </div>
                            {
                                activeTab === index ? (<p className='text-base text-gray-500 mt-4'>{fqa.answer}</p>) : null
                            }
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default FAQ