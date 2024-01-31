/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import CreateProduct from './CreateProduct.tsx'
import AllProduct from './AllProduct.tsx'
import CreateEvent from './CreateEvent.tsx'
import AllEvent from './AllEvent.tsx'
import AllCouponCode from './AllCouponCode.tsx'
import AllOrder from './AllOrder.tsx'
import { AiOutlineMoneyCollect } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { MdBorderClear } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { currentOrder, rootState } from '../../interface.ts'
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FaArrowRight } from 'react-icons/fa'
import ShopInbox from './ShopInbox.tsx'

interface IProps {
  show: number
}

const ShopContent = ({ show }: IProps) => {
  const { currentShop } = useSelector((state: rootState) => state.shop.shop)
  const { currentOrder } = useSelector((state: rootState) => state.allOrder.allOrder)
  const order = useMemo(() => {
    const order = currentOrder && currentOrder.filter((item) => item?._id)
    return order
  }, [currentOrder])
  const navigate = useNavigate()

  const columns: ColumnsType<currentOrder> = [
    {
      title: 'OrderId',
      dataIndex: '_id',
      key: '_id',
      width: '100',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '120',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <FaArrowRight size={20} className='cursor-pointer' onClick={() => {
            navigate(`/order/${record?._id}`)
          }} />
        </Space>
      ),
      width: '100',
    },
  ];

  const { currentProduct } = useSelector((state: rootState) => state.allProductShop.allProductShop)

  return (
    <div className='w-[90%] h-screen flex items-center justify-center'>
      {
        show === 0 && (
          <div className="w-[90%] p-8 overflow-y-auto h-full">
            <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
            <div className="w-full block">{/*800px:flex items-center justify-between*/}
              <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                <div className="flex items-center">
                  <AiOutlineMoneyCollect
                    size={30}
                    className="mr-2"
                    fill="#00000085"
                  />
                  <h3
                    className={`text-[18px] leading-5 font-[400] text-[#00000085]`}
                  >
                    Account Balance{" "}
                    <span className="text-[16px]">(with 10% service charge)</span>
                  </h3>
                </div>
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{currentShop.availableBalancer}VND</h5>
                <Link to="/dashboard-withdraw-money">
                  <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
                </Link>
              </div>

              <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                <div className="flex items-center">
                  <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                  <h3
                    className={`text-[18px] leading-5 font-[400] text-[#00000085]`}
                  >
                    All Orders
                  </h3>
                </div>
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{order && order.length}</h5>
                <Link to="/dashboard-orders">
                  <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
                </Link>
              </div>

              <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                <div className="flex items-center">
                  <AiOutlineMoneyCollect
                    size={30}
                    className="mr-2"
                    fill="#00000085"
                  />
                  <h3
                    className={` !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                  >
                    All Products
                  </h3>
                </div>
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{currentProduct && currentProduct.length}</h5>
                <Link to="/dashboard-products">
                  <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
                </Link>
              </div>
            </div>
            <br />
            <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
            <div className="w-full min-h-[45vh] bg-white rounded">
            <Table columns={columns} dataSource={order} style={{ width: '100%' }} scroll={{ x: 900 }} />
            </div>
          </div>
        )
      }
      {
        show === 1 && (
          <AllOrder />
        )
      }
      {
        show === 3 && (
          <CreateProduct />
        )
      }
      {
        show === 2 && (
          <div className=''>
            <AllProduct />
          </div>
        )
      }
      {
        show === 5 && (
          <CreateEvent />
        )
      }
      {
        show === 4 && (
          <AllEvent />
        )
      }
      {
        show === 7 && (
          <ShopInbox/>
        )
      }
      {
        show === 8 && (
          <AllCouponCode />
        )
      }
    </div>
  )
}

export default ShopContent