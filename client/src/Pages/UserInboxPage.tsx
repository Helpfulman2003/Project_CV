/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineArrowRight, AiOutlineSend } from 'react-icons/ai';
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { currentShop, messageState, rootState } from '../interface';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux'
import { createAxios } from '../createIntance.ts'
import { loginSuccess } from '../redux/userSlice.ts'
import { addMessageRoute, getAllMessageRoute } from '../router/userRouter.ts'
import { format } from 'fecha'
import { useNavigate } from 'react-router-dom'
import { io, Socket } from "socket.io-client";

const UserInboxPage = () => {
  const [open, setOpen] = useState(false)
  const [shop, setShop] = useState<currentShop | null>(null)
  const [messages, setMessages] = useState<messageState[]>([])
  const [arrivalMessage, setArrivalMessage] = useState<messageState | null>(null)
  const [value, setValue] = useState('')
  const { currentUser } = useSelector((state: rootState) => state.user.user)
  const dispatch = useDispatch()
  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess)
  const navigate = useNavigate()
  const socket = useRef<any>()
  const scroll =  useRef<any>(null)

  //  mỗi khi component được render lại, socket.current sẽ trỏ đến cùng một đối tượng socket.
  // Nếu bạn không sử dụng useRef(), mỗi lần component render lại, một đối tượng socket mới sẽ được tạo và gán cho biến socket
  // gây ra vấn đề nếu bạn muốn giữ kết nối socket giữa các lần render. có thể gây mất kết nối

  useEffect(() => {
    socket.current = io('http://localhost:3001');
    socket.current.emit('add-user', currentUser._id)
  }, [])

  useEffect(() => {
    if(scroll.current !== null) {
      scroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }

  }, [messages, value])


  useEffect(() => {
    const shop = JSON.parse(localStorage.getItem('shop') || '{}')
    setShop(shop)
  }, [])

  const handleChangeEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
    setValue(prev => prev + emojiData.emoji)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosJWT.post(getAllMessageRoute, {
          from: currentUser._id,
          to: shop?._id,
        })
        setMessages(data.allMessages)
      } catch (error) {
        if (error.response.data.message === 'jwt expired') {
          navigate('/login')
        }

      }
    }
    if (shop) {
      fetchData()
    }
  }, [currentUser._id, shop?._id])


  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.current.emit('sendMessage', { from: currentUser._id, to: shop?._id, message: value })
    const msgs = [...messages]
    msgs.push({ message: value, senderId: currentUser._id })
    setMessages(msgs)
    try {
      const { data } = await axiosJWT.post(addMessageRoute, {
        from: currentUser._id,
        to: shop?._id,
        message: value
      })
    } catch (error) {
      console.log(error);
    }
    setValue('')
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on('message-receive', ({ to, message }) => {
        setArrivalMessage({ message: message, senderId: to === shop?._id ? to : shop?._id })
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
    <div className="w-full">
      <div className="w-[full] min-h-full flex flex-col justify-between p-5">
        <div className="w-full flex p-3 items-center justify-between bg-slate-200">
          <div className="flex">
            {shop && shop.avatar && shop.avatar?.url ? (<img
              src={shop?.avatar?.url[0]?.url}
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
              <h1 className="text-[18px] font-[600]">{shop && shop.name}</h1>
              <h1>"Active Now" </h1>
            </div>
          </div>
          <AiOutlineArrowRight
            size={20}
            className="cursor-pointer"
          />
        </div>

        <div ref={scroll} className="px-3 h-[75vh] py-3 overflow-y-scroll">
          {messages &&
            messages.map((item, index) => (
              <div
                key={item._id}
                ref={index === messages.length - 1 ? scroll : null}
                className={`flex w-full my-2 ${item.senderId === currentUser._id ? "justify-end" : "justify-start"
                  }`}
              >
                {item.senderId !== currentUser._id && (
                  <img
                    src={`${shop?.avatar?.url[0]?.url ?? ''}`}
                    className="w-[40px] h-[40px] rounded-full mr-3"
                    alt=""
                  />
                )}
                {item.message !== "" && (
                  <div>
                    <div
                      className={`w-max p-2 rounded ${item.senderId === currentUser._id ? "bg-[#000]" : "bg-[#38c776]"
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
              className='w-full py-1 pl-6 pr-8'
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
    </div>
  );
};


export default UserInboxPage