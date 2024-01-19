import React from 'react'
import { FiTrash } from 'react-icons/fi'

const ProfileContentAddress = () => {
  return (
    <div className='mt-3'>
            <div className='flex items-center justify-between'>
                <p className='text-gray-800'>My address</p>
                <div className='w-[150px] shadow bg-gradient-to-r from-green-300 via-green-400 to-green-500 text-center px-4 py-3 rounded-md cursor-pointer'>
                    <button className='text-white font-bold'>Add new</button>
                </div>
            </div>
            <div className='bg-white rounded shadow px-3 py-4 mt-9 flex items-center justify-between'>
                <div className='flex items-center justify-start gap-6'>
                    <h4 className='font-semibold text-gray-800'>Default</h4>
                </div>
                <div className='flex items-center justify-start gap-6'>
                    <h4>494 Erdman Pasaagem, New Zoietown, Paraguay</h4>
                    <span>(213) 840-9416</span>
                </div>
                <FiTrash size={20} className='mr-6'/>
            </div>
        </div>
  )
}

export default ProfileContentAddress