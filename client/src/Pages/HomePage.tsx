/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Header from '../components/Header/Header.tsx'
import Navbar from '../components/Header/Navbar.tsx'
import Banner from '../components/Banner/Banner.tsx'
import Container from '../components/Container/Container.tsx'
import Event from '../components/Event/Event.tsx'
import FeatureProduct from '../components/FeatureProduct/FeatureProduct.tsx'
import Sponsor from '../components/Sponsor/Sponsor.tsx'
import Footer from '../components/Footer/Footer.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { rootState } from '../interface.ts'
import { createAxios } from '../createIntance.ts'
import { loginSuccess } from '../redux/userSlice.ts'
import { getAllEvent, getAllOrderOfUser, getAllProduct } from '../router/userRouter.ts'
import { getProductError, getProductStart, getProductSuccess } from '../redux/allProductSlice.ts'
import { getEventError, getEventStart, getEventSuccess } from '../redux/allEventSlice.ts'
import axios from 'axios'

const HomePage = () => {
  const { currentUser } = useSelector((state: rootState) => state.user.user)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getProductStart())
        const { data } = await axios.get(getAllProduct)
        const productsWithNames = data.products.products.filter(item => item.name)
        dispatch(getProductSuccess(productsWithNames))
      } catch (error) {
        dispatch(getProductError())
        console.log(error);
      }
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getEventStart())
        const { data } = await axios.get(getAllEvent)
        const eventsWithNames = data.events.events.filter(item => item.name)
        dispatch(getEventSuccess(eventsWithNames))
      } catch (error) {
        dispatch(getEventError())
        console.log(error);
      }
    }
    fetchData()
  }, [dispatch])


  return (
    <div className='bg-[#f6f6f5]'>
      <Header />
      <Navbar />
      <Banner />
      <Container />
      <Event />
      <FeatureProduct />
      <Sponsor />
      <Footer />
    </div>
  )
}

export default HomePage