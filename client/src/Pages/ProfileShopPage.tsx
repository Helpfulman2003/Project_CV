import React, { useEffect } from 'react'
import HeaderShop from '../components/Header/HeaderShop.tsx'
import ProfileShopInfo from '../components/ProfileShop/ProfileShopInfo.tsx'
import ProfileShopContent from '../components/ProfileShop/ProfileShopContent.tsx'
import { useSelector } from 'react-redux'
import { rootState } from '../interface.ts'
import { useNavigate } from 'react-router-dom'

const ProfileShopPage = () => {
  const {currentShop} = useSelector((state: rootState) => state.shop.shop)
  const navigate =  useNavigate()
  
  useEffect(() => {
    if(!currentShop._id ) {
      navigate('/shop-login')
    }
  }, [])

  return (
    <div>
        <HeaderShop/>
        <div className='flex items-start justify-start px-4 mt-10 gap-8'>
            <ProfileShopInfo currentShop={currentShop}/>
            <ProfileShopContent/>
        </div>
    </div>
  )
}

export default ProfileShopPage