import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header.tsx';
import Footer from '../components/Footer/Footer.tsx';
import Lottie from 'lottie-react';
import animationData from '../asset/success.json';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { currentProduct, currentUser, shippingAddress } from '../interface.ts';
import { createNewOrder, paymentExecute } from '../router/userRouter.ts';
import { clearCart } from '../redux/cartSlice.ts';
import { useDispatch } from 'react-redux';

interface orderData {
    cart: currentProduct[];
    disCountPercentage: number;
    shipping: number;
    subTotalPrice: number;
    totalPrice: number;
    shippingAddress: shippingAddress;
    user: currentUser;
  }

const OrderSuccessPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get('paymentId');
    const PayerID = queryParams.get('PayerID');
    const [orderData, setOrderData] = useState<orderData>()
    const dispatch = useDispatch()

    useEffect(() => {
        const latestOrder = localStorage.getItem('latestOrder')
        const orderData: orderData = JSON.parse(latestOrder ?? '{}')
        setOrderData(orderData)
      }, [])

      const groupByShop = (cart) => {
        return cart && cart.reduce((groupedItems, item) => {
          const shopId = item.shopId._id;
          if (!groupedItems[shopId]) {
            groupedItems[shopId] = [];
          }
          groupedItems[shopId].push(item);
          return groupedItems;
        }, {});
      }

      const totalPrice = orderData?.cart.reduce(
        (sum, product) => {
            const value = product?.quantity ?? 0
            return sum + value * product.discountPrice
        },
        0
      );

    useEffect(() => {
       const fetchData = async() => {
        const order = {
            cart: groupByShop(orderData?.cart),
            shippingAddress: orderData?.shippingAddress,
            user: orderData?.user,
            totalPrice: orderData?.totalPrice,
            paymentInfo: {
              type: "Cash On Delivery",
            }
          };
        if(paymentId && PayerID && totalPrice) {
            try {
                await axios.post(paymentExecute, {PayerID, paymentId, total: totalPrice})
                const { data } = await axios.post(createNewOrder, order)
                dispatch(clearCart())
                localStorage.setItem('latestOrder', JSON.stringify(''))
            } catch (error) {
                console.log(error);
            }
        }
       }
       fetchData()
    },[])

    return (
        <div>
            <Header />
            <div className='flex justify-center'>
                <Lottie animationData={animationData} loop={true} autoplay={true} style={{ width: 300, height: 300 }} />
            </div>
            <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
                Your order is successful 😍
            </h5>
            <Footer />
        </div>
    );
}

export default OrderSuccessPage;
