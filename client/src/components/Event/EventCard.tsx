/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { currentEvent } from '../../interface'

interface ITime {
    day: number,
    hours: number,
    minute: number,
    second: number
}

interface IProps {
    event: currentEvent
}

const EventCard = ({ event }: IProps) => {
    const [timer, setTimer] = useState<ITime | null>({ day: 0, hours: 0, minute: 0, second: 0 })
    const [select, setSelect] = useState(true)
    let interval = useRef<number | null>(null)

    const startTimer = () => {
        const countdownDate = new Date(`${event.finishDate}`).getTime()
        interval.current = setInterval(() => {
            const now = new Date().getTime()
            const startDate = new Date(`${event.startDate}`).getTime()
            if (startDate > now) {
                setSelect(false)
            }
            const distance = countdownDate - now
            if (distance < 0) {
                clearInterval(interval.current!)
                setTimer(null)
            } else {
                setTimer({
                    day: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
                    minute: Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
                    second: Math.floor(distance % (1000 * 60) / (1000))
                })
            }
        }, 1000)
    }

    useEffect(() => {
        startTimer()
        return () => {
            if (interval.current) clearInterval(interval.current)
        }
    }, [])

    return (
        <>
            {select && (<div className='bg-white rounded-md shadow-md lg:grid grid-cols-2 overflow-hidden p-2 gap-x-2'>
                <div>
                    <img src={event.images?.url[0].url} alt="" />
                </div>
                <div className='flex flex-col justify-center'>
                    <h2 className='text-[#333] text-[25px] font-bold '>{event.name}</h2>
                    <p className='my-3'>{event.description}</p>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center justify-start gap-2'>
                            <span className='text-[20px] font-bold text-[#333]'>{event.discountPrice}VND</span>
                            <span className='text-[16px] font-semibold text-red-500 line-through translate-y-[-8px]'>{event.originalPrice}VND</span>
                        </div>
                        <span className='text-[#3bc177] mr-4'>{event.sold_out} sold</span>
                    </div>
                    <div>
                        {
                            timer ? (<div className="flex items-center justify-start gap-3 mt-3 ">
                                <div className="font-semibold text-xl text-[#333]">
                                    {timer?.day}
                                    <span>days</span>
                                </div>
                                <div className="font-semibold text-xl text-[#333]">
                                    {timer?.hours}
                                    <span>hours</span>
                                </div>
                                <div className="font-semibold text-xl text-[#333]">
                                    {timer?.minute}
                                    <span>minutes</span>
                                </div>
                                <div className="font-semibold text-xl text-[#333]">
                                    {timer?.second}
                                    <span>seconds</span>
                                </div>
                            </div>) : (
                                <div className='font-semibold text-xl text-[#333] mt-3'>Promotion has ended.</div>
                            )
                        }
                    </div>
                </div>
            </div>)}
        </>
    )
}

export default EventCard
