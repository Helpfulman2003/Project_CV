import React from 'react'
import Header from '../components/Header/Header.tsx'
import Navbar from '../components/Header/Navbar.tsx'
import Event from '../components/Event/Event.tsx'

const EventPage = () => {
    return (
        <div className='bg-[#f6f6f5]'>
            <Header />
            <Navbar flat={4} />
            <Event/>
        </div>
    )
}

export default EventPage