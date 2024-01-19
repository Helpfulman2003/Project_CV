/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import HeaderShop from '../components/Header/HeaderShop.tsx'
import ShopSizeBar from '../components/Shop/ShopSideBar.tsx'
import ShopContent from '../components/Shop/ShopContent.tsx'
import { rootState } from '../interface.ts'
import { useDispatch, useSelector } from 'react-redux'
import { createAxios } from '../createIntance.ts'
import { loginSuccess } from '../redux/shopSlice.ts'
import { getProductError, getProductStart, getProductSuccess } from '../redux/allProductShopSlice.ts'
import { getAllEvent, getAllOrderOfShop, getAllProductOfShop } from '../router/userRouter.ts'
import { getEventError, getEventStart, getEventSuccess } from '../redux/allEventSlice.ts'
import { getOrderStart, getOrderSuccess, getOrderError } from '../redux/allOrderSlice.ts'
import { useNavigate } from 'react-router-dom'

const ShopPage = () => {
  const [show, setShow] = useState<number>(0)
  const { currentShop } = useSelector((state: rootState) => state.shop.shop)
  const dispatch = useDispatch()
  const axiosJWT = createAxios(currentShop, dispatch, loginSuccess)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentShop.accessToken) {
      navigate('/shop-login')
    } 
   }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getProductStart())
        const { data } = await axiosJWT.get(getAllProductOfShop)
        dispatch(getProductSuccess(data.products))
      } catch (error) {
        console.log(error);
        dispatch(getProductError())
      }
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getEventStart())
        const { data } = await axiosJWT.get(getAllEvent)
        const eventsWithNames = data.events.events.filter(item => item.name)
        dispatch(getEventSuccess(eventsWithNames))
      } catch (error) {
        dispatch(getEventError())
        console.log(error);
      }
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getOrderStart())
        const { data } = await axiosJWT.get(getAllOrderOfShop)
        dispatch(getOrderSuccess(data.orderShop))
      } catch (error) {
        dispatch(getOrderError())
        console.log(error);
      }
    }
    fetchData()
  }, [dispatch])

  return (
    <div className='bg-[#f6f6f5]'>
      <HeaderShop />
      <div className='flex items-start'>
        <ShopSizeBar show={show} setShow={setShow} />
        <ShopContent show={show} />
      </div>
    </div>
  )
}

export default ShopPage