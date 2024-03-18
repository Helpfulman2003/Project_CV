import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header.tsx'
import ProfileSidebar from '../components/Profile/ProfileSidebar.tsx'
import ProfileContent from '../components/Profile/ProfileContent.tsx'
import { useSelector } from 'react-redux'
import { rootState } from '../interface.ts'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
    const [show, setShow] = useState<number>(0)
    const { currentUser } = useSelector((state: rootState) => state.user.user)
    const navigate = useNavigate()

    useEffect(() => {
      if(!currentUser._id ) {
        navigate('/login')
      }
    }, [])
  return (
    <div className='bg-[#f6f6f5]'>
        <Header/>
        <div className='px-[10%] my-10 h-full grid grid-cols-4 md:gap-5 gap-0'>
            <ProfileSidebar show={show} setShow={setShow}/>
            <ProfileContent show={show}/>
        </div>
   </div>
  )
}

export default ProfilePage