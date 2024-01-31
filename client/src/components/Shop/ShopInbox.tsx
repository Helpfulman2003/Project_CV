/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import { AiOutlineArrowRight, AiOutlineSend } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, messageState, rootState } from '../../interface.ts';
import { createAxios } from '../../createIntance.ts';
import { loginSuccess } from '../../redux/shopSlice.ts';
import { addMessageRoute, getAllMessageRoute, getAllUserRoute } from '../../router/userRouter.ts';
import { useNavigate } from 'react-router-dom';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { format } from 'fecha';
import { io } from "socket.io-client";

const ShopInbox = () => {
    const [open, setOpen] = useState(false)
    const [select, setSelect] = useState(false)
    const [active, setActive] = useState(0)
    const [online, setOnline] = useState(true)
    const { currentShop } = useSelector((state: rootState) => state.shop.shop)
    const [users, setUsers] = useState<currentUser[]>([])
    const [user, setUser] = useState<currentUser | null>(null)
    const [messages, setMessages] = useState<messageState[]>([])
    const [arrivalMessage, setArrivalMessage] = useState<messageState | null>(null)
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const axiosJWT = createAxios(currentShop, dispatch, loginSuccess)
    const navigate = useNavigate()
    const socket = useRef<any>()
    const scroll = useRef<any>(null)

    useEffect(() => {
        if (scroll.current) {
            scroll.current.scrollIntoView({ behavior: "smooth", block: "end" })
        }

    }, [messages, value])

    useEffect(() => {
        socket.current = io('http://localhost:3001');
        socket.current.emit('add-user', currentShop._id)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosJWT.get(getAllUserRoute)
                setUsers(data.allUsers)
            } catch (error) {
                if (error.response.data.message === 'jwt expired') {
                    navigate('/login')
                }

            }
        }
        fetchData()
    }, [currentShop._id, user?._id])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosJWT.post(getAllMessageRoute, {
                    from: currentShop._id,
                    to: user?._id,
                })

                setMessages(data.allMessages)
            } catch (error) {
                if (error.response.data.message === 'jwt expired') {
                    navigate('/login')
                }

            }
        }
        if (user?._id) {
            fetchData()
        }
    }, [currentShop?._id, user?._id])

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.current.emit('sendMessage', { from: currentShop._id, to: user?._id, message: value })
        const msgs = [...messages]
        msgs.push({ message: value, senderId: currentShop._id!, })
        setMessages(msgs)
        try {
            const { data } = await axiosJWT.post(addMessageRoute, {
                from: currentShop?._id,
                to: user?._id,
                message: value
            })
            setValue('')

        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
        setValue(prev => prev + emojiData.emoji)
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on('message-receive', ({ to, message }) => {
                setArrivalMessage({ message: message, senderId: to === user?._id ? to : user?._id })
            })
        }
    }, [socket.current])

    useEffect(() => {
        if (arrivalMessage) {
            const msgs = [...messages]
            msgs.push(arrivalMessage)
            setMessages(msgs)
        }
    }, [arrivalMessage])

    return (
        <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
            {!select && (
                <>
                    <h1 className="text-center text-[30px] py-3 font-Poppins">
                        All Messages
                    </h1>
                    {/* All messages list */}
                    {users &&
                        users.map((item, index) => (
                            <div
                                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                                    setUser(item)
                                    setSelect(true)
                                }}
                                className={`w-full flex p-3 px-3 }  cursor-pointer`}
                            // ${active === index ? "bg-[#00000010]" : "bg-transparent"
                            >
                                <div className="relative">
                                    <img
                                        src={`${item.avatar?.url[0]?.url ?? ''}`}
                                        alt=""
                                        className="w-[50px] h-[50px] rounded-full"
                                    />
                                    {/* {online ? (
                                        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
                                    ) : (
                                        <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
                                    )} */}
                                </div>
                                <div className="pl-3">
                                    <h1 className="text-[18px]">{item?.name ?? ''}</h1>
                                </div>
                            </div>
                        ))}
                </>
            )}

            {select && (
                <div className="w-[full] min-h-full flex flex-col justify-between p-5">
                    <div className="w-full flex p-3 items-center justify-between bg-slate-200">
                        <div className="flex">
                            {user && user.avatar && user.avatar?.url ? (<img
                                src={user?.avatar?.url[0]?.url}
                                alt=""
                                className="w-[60px] h-[60px] rounded-full"
                            />) : (
                                <img
                                    src={''}
                                    alt=""
                                    className="w-[60px] h-[60px] rounded-full"
                                />
                            )}
                            <div className="pl-3">
                                <h1 className="text-[18px] font-[600]">{user && user?.name}</h1>
                                <h1>"Active Now" </h1>
                            </div>
                        </div>
                        <AiOutlineArrowRight
                            size={20}
                            className="cursor-pointer"
                            onClick={() => setSelect(false)}
                        />
                    </div>

                    <div className="px-3 h-[75vh] py-3 overflow-y-scroll">
                        {messages &&
                            messages.map((item, index) => (
                                <div
                                    key={item._id}
                                    ref={index === messages.length - 1 ? scroll : null}
                                    className={`flex w-full my-2 ${item.senderId === currentShop._id ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    {item.senderId !== currentShop._id && (
                                        <img
                                            src={`${user?.avatar?.url[0]?.url ?? ''}`}
                                            className="w-[40px] h-[40px] rounded-full mr-3"
                                            alt=""
                                        />
                                    )}
                                    {item.message !== "" && (
                                        <div>
                                            <div
                                                className={`w-max p-2 rounded ${item.senderId === currentShop._id ? "bg-[#000]" : "bg-[#38c776]"
                                                    } text-[#fff] h-min`}
                                            >
                                                <p>{item.message}</p>
                                            </div>

                                            <p className="text-[12px] text-[#000000d3] pt-1">
                                                {item?.createdAt ? format(new Date(item?.createdAt)) : ''}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                    <form onSubmit={handleSendMessage}
                        className="p-3 relative w-full flex justify-between items-center"
                    >
                        <div className="w-[30px] absolute">
                            <label htmlFor="">
                                <MdOutlineEmojiEmotions className="cursor-pointer" size={20} onClick={() => setOpen(!open)} />
                            </label>
                            {open && <EmojiPicker onEmojiClick={handleChangeEmoji} height={350} style={{ position: 'absolute', bottom: '28px', left: '0px' }} />}
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                required
                                className='w-full py-1 pl-6 pr-8 border rounded-sm'
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                                value={value}
                                placeholder="Enter your message..."
                            />
                            <input type="submit" value="Send" className="hidden" id="send" />
                            <label htmlFor="send">
                                <AiOutlineSend
                                    size={20}
                                    className="absolute right-4 top-5 cursor-pointer"
                                />
                            </label>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default ShopInbox