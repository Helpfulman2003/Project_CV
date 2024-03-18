/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { getAllEventOfShop, getAllOrderOfShop, getAllProductOfShop } from '../router/userRouter.ts'
import { getOrderStart, getOrderSuccess, getOrderError } from '../redux/allOrderSlice.ts'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { getEventOfShopError, getEventOfShopStart, getEventOfShopSuccess } from '../redux/allEventOfShopSlice.ts'

const ShopPage = () => {
  const [show, setShow] = useState<number>(0)
  const { currentShop } = useSelector((state: rootState) => state.shop.shop)

  const dispatch = useDispatch()
  const axiosJWT = createAxios(currentShop, dispatch, loginSuccess)
  const navigate = useNavigate()

  useEffect(() => {
    if(!currentShop._id ) {
      navigate('/shop-login')
    }
  }, [])

  // useEffect(() => {
  //   const checkToken = async () => {
  //     if (currentShop._id === undefined) {
  //       navigate('/shop-login')
  //     } else {
  //       try {
  //         const { data } = await axios.post(`http://localhost:3001/api/shop/refresh-token`, { id: currentShop._id })
  //         const date = new Date()
  //         const decodeToken = jwtDecode(data.refreshToken)
  //         if (decodeToken?.exp && decodeToken.exp < date.getTime() / 1000) {
  //           navigate('/shop-login')
  //         }
  //       } catch (error) {
  //         console.error("An error occurred while refreshing the token: ", error);
  //       }
  //     }
  //     checkToken()
  //   }
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getProductStart())
        const { data } = await axiosJWT.get(getAllProductOfShop)
        if (data && data.products) {
          dispatch(getProductSuccess(data.products))
        } else {
          throw new Error("No products found")
        }
      } catch (error) {
        if (error.response.data.message === 'jwt expired') {
          navigate('/shop-login')
        }
        console.error("An error occurred while fetching products: ", error);
        dispatch(getProductError())
      }
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getEventOfShopStart())
        const { data } = await axiosJWT.get(getAllEventOfShop)
        if (data && data.events) {
          const eventsWithNames = data.events.filter(item => item.name)
          dispatch(getEventOfShopSuccess(eventsWithNames))
        } else {
          throw new Error("No events found")
        }
      } catch (error) {
        if (error.response?.data.message === 'jwt expired') {
          navigate('/shop-login')
        }
        console.error("An error occurred while fetching events: ", error);
        dispatch(getEventOfShopError())
      }
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getOrderStart())
        const { data } = await axiosJWT.get(getAllOrderOfShop)
        if (data && data.orderShop) {
          dispatch(getOrderSuccess(data.orderShop))
        } else {
          throw new Error("No orders found")
        }
      } catch (error) {
        if (error.response.data.message === 'jwt expired') {
          navigate('/shop-login')
        }
        console.error("An error occurred while fetching orders: ", error);
        dispatch(getOrderError())
      }
    }
    fetchData()
  }, [dispatch])


  return (
    <div className='bg-[#f6f6f5]'>
      <HeaderShop />
      <div className='flex items-start justify-start'>
        <ShopSizeBar show={show} setShow={setShow} />
        <ShopContent show={show} />
      </div>
    </div>
  )
}

export default ShopPage