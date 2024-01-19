/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentProduct, currentUser, rootState } from '../../interface'
import { RxCross1 } from 'react-icons/rx'
import axios from 'axios';
import { createNewOrder } from '../../router/userRouter.ts'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { clearCart } from '../../redux/cartSlice.ts'

interface orderData {
  cart: currentProduct[];
  disCountPercentage: number;
  shipping: number;
  subTotalPrice: number;
  totalPrice: number;
  shippingAddress: shippingAddress;
  user: currentUser;
}

export interface shippingAddress {
  name: string;
  email: string;
  phone: number;
  zipCode: number;
  city: string;
  address: string;
}

const Payment = () => {
  // const cart = useSelector((state: rootState) => state.cart.cart)
  const { currentUser } = useSelector((state: rootState) => state.user.user)
  const [orderData, setOrderData] = useState<orderData>()
  const [open, setOpen] = useState(false)
  const [select, setSelect] = useState<number>(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const latestOrder = localStorage.getItem('latestOrder')
    const orderData: orderData = JSON.parse(latestOrder ?? '{}')
    setOrderData(orderData)
  }, [])

  const groupByShop = (cart) => {
    return cart.reduce((groupedItems, item) => {
      const shopId = item.shopId._id;
      if (!groupedItems[shopId]) {
        groupedItems[shopId] = [];
      }
      groupedItems[shopId].push(item);
      return groupedItems;
    }, {});
  }

  const cashOnDeliveryHandle = async () => {
    const order = {
      cart: groupByShop(orderData?.cart),
      shippingAddress: orderData?.shippingAddress,
      user: orderData?.user,
      totalPrice: orderData?.totalPrice,
      paymentInfo: {
        type: "Cash On Delivery",
      }
    };

    try {
      const { data } = await axios.post(createNewOrder, order)
      navigate("/order/success");
      dispatch(clearCart())
      localStorage.setItem('latestOrder', JSON.stringify('{}'))
    } catch (error) {
      toast.error('Order error')
    }

  }
  return (
    <>
      <div className='flex items-start justify-between'>
        <div className="w-[60%] bg-white rounded-md shadow p-5 pb-8">
          <div>
            <div className="flex w-full pb-5 border-b mb-2">
              <div
                className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                onClick={() => setSelect(1)}
              >
                {select === 1 ? (
                  <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                ) : null}
              </div>
              <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                Pay with Debit/credit card
              </h4>
            </div>

            {/* pay with card */}
            {select === 1 ? (
              <div className="w-full flex border-b">
                <form className="w-full">
                  <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                      <label className="block pb-2">Name On Card</label>
                      <input
                        required
                        placeholder={currentUser && currentUser.name}
                        value={currentUser && currentUser.name}
                      />
                    </div>
                    <div className="w-[50%]">
                      <label className="block pb-2">Exp Date</label>
                      {/* <CardExpiryElement
                        className={`${styles.input}`}
                        options={{
                          style: {
                            base: {
                              fontSize: "19px",
                              lineHeight: 1.5,
                              color: "#444",
                            },
                            empty: {
                              color: "#3a120a",
                              backgroundColor: "transparent",
                              "::placeholder": {
                                color: "#444",
                              },
                            },
                          },
                        }}
                      /> */}
                    </div>
                  </div>

                  <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                      <label className="block pb-2">Card Number</label>
                      {/* <CardNumberElement
                        className={`${styles.input} !h-[35px] !w-[95%]`}
                        options={{
                          style: {
                            base: {
                              fontSize: "19px",
                              lineHeight: 1.5,
                              color: "#444",
                            },
                            empty: {
                              color: "#3a120a",
                              backgroundColor: "transparent",
                              "::placeholder": {
                                color: "#444",
                              },
                            },
                          },
                        }}
                      /> */}
                    </div>
                    <div className="w-[50%]">
                      <label className="block pb-2">CVV</label>
                      {/* <CardCvcElement
                        className={`${styles.input} !h-[35px]`}
                        options={{
                          style: {
                            base: {
                              fontSize: "19px",
                              lineHeight: 1.5,
                              color: "#444",
                            },
                            empty: {
                              color: "#3a120a",
                              backgroundColor: "transparent",
                              "::placeholder": {
                                color: "#444",
                              },
                            },
                          },
                        }}
                      /> */}
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="Submit"
                    className={`w-[120px] shadow text-center px-3 py-2 mb-2 rounded-md bg-[#f63b60] text-[#fff] cursor-pointer text-[18px] font-[600]`}
                  />
                </form>
              </div>
            ) : null}
          </div>

          <br />
          {/* paypal payment */}
          <div>
            <div className="flex w-full pb-5 border-b mb-2">
              <div
                className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                onClick={() => setSelect(2)}
              >
                {select === 2 ? (
                  <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                ) : null}
              </div>
              <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                Pay with Paypal
              </h4>
            </div>

            {/* pay with payement */}
            {select === 2 ? (
              <div className="w-full flex border-b">
                <div
                  className={`w-[120px] shadow text-center px-3 py-2 mb-2 rounded-md bg-[#f63b60] text-[#fff] cursor-pointer text-[18px] font-[600]`}
                  onClick={() => setOpen(true)}
                >
                  Pay Now
                </div>
                {open && (
                  <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                    <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                      <div className="w-full flex justify-end p-3">
                        <RxCross1
                          size={30}
                          className="cursor-pointer absolute top-3 right-3"
                          onClick={() => setOpen(false)}
                        />
                      </div>
                      {/* <PayPalScriptProvider
                        options={{
                          "client-id":
                            "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                        }}
                      >
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          onApprove={onApprove}
                          createOrder={createOrder}
                        />
                      </PayPalScriptProvider> */}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <br />
          {/* cash on delivery */}
          <div>
            <div className="flex w-full pb-5 border-b mb-2">
              <div
                className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                onClick={() => setSelect(3)}
              >
                {select === 3 ? (
                  <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                ) : null}
              </div>
              <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                Cash on Delivery
              </h4>
            </div>

            {/* cash on delivery */}
            {select === 3 ? (
              <div className="w-full flex">
                <button onClick={cashOnDeliveryHandle} className={`w-[120px] shadow text-center px-3 py-2 mb-2 rounded-md bg-[#f63b60] text-[#fff] cursor-pointer text-[18px] font-[600]`}>
                  Confirm
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className='w-[30%]'>
          <div className="w-full bg-[#fff] rounded-md shadow p-5 pb-8">
            <div className="flex justify-between">
              <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
              <h5 className="text-[18px] font-[600]">{orderData?.subTotalPrice}VND</h5>
            </div>
            <br />
            <div className="flex justify-between">
              <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
              <h5 className="text-[18px] font-[600]">{orderData?.shipping && orderData?.shipping.toFixed(2)}VND</h5>
            </div>
            <br />
            <div className="flex justify-between border-b pb-3">
              <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
              <h5 className="text-[18px] font-[600]">
                {orderData?.disCountPercentage}
              </h5>
            </div>
            <h5 className="text-[18px] font-[600] text-end pt-3">{orderData?.totalPrice}</h5>
            <br />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Payment