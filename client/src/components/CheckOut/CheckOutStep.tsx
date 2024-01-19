import React from 'react'

const CheckOutStep = ({ active }: { active: number }) => {
  return (
    <div className='flex items-center mt-12 justify-center mb-10'>
      <div className='flex items-center'>
        <div className={`w-[150px] shadow bg-[#f63b60] text-center px-4 py-3 rounded-[28px]`}>
          <button className='text-white font-bold'>1.Shipping</button>
        </div>
        <div className={`w-[70px] h-[4px] ${active >= 2 ? 'bg-[#f63b60]' : 'bg-[#f9bac7]'} `}></div>
      </div>
      <div className='flex items-center'>
        <div className={`w-[150px] shadow  ${active >= 2 ? 'bg-[#f63b60]' : 'bg-[#f9bac7]'} text-center px-4 py-3 rounded-[28px]`}>
          <button className={`${active >= 2 ? 'text-white' : 'text-[#b84058]'} font-bold`}>2.Payment</button>
        </div>
        <div className={`w-[70px] h-[4px] ${active === 3 ? 'bg-[#f63b60]' : 'bg-[#f9bac7]'} `}></div>
      </div>
      <div>
        <div className={`w-[150px] shadow  ${active === 3 ? 'bg-[#f63b60]' : 'bg-[#f9bac7]'} text-center px-4 py-3 rounded-[28px]`}>
          <button className={`${active === 3 ? 'text-white' : 'text-[#b84058]'} font-bold`}>3.Success</button>
        </div>
      </div>
    </div>
  )
}

export default CheckOutStep