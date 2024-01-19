import React from 'react'
import HeaderShop from '../components/Header/HeaderShop.tsx'
import ProfileShopInfo from '../components/ProfileShop/ProfileShopInfo.tsx'
import ProfileShopContent from '../components/ProfileShop/ProfileShopContent.tsx'

const ProfileShopPage = () => {
  return (
    <div>
        <HeaderShop/>
        <div className='flex items-start justify-start px-4 mt-10 gap-8'>
            <ProfileShopInfo/>
            <ProfileShopContent/>
        </div>
    </div>
  )
}

export default ProfileShopPage