import React from 'react'
import EventCard from './EventCard.tsx'
import { useSelector } from 'react-redux'
import { rootState } from '../../interface.ts'

const Event = () => {
  const {currentEvent} = useSelector((state: rootState) => state.allEvent.allEvent)
  return (
    <div className='px-[10%] w-full mt-10 text-[#333]'>
        <h1 className='text-[28px] font-bold mb-4'>Popular Events</h1>
        {
          currentEvent.map((item, index:number) => {
            return (
              <div key={index}>
                <EventCard event={item}/>
              </div>
            )
          })
        }
    </div>
  )
}

export default Event