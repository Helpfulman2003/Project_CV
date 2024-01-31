/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { currentEvent, rootState } from '../../interface.ts';
import { createAxios } from '../../createIntance.ts';
import { loginSuccess } from '../../redux/shopSlice.ts';
import { AiOutlineDelete } from 'react-icons/ai';
import { Modal } from 'antd';
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { deleteEventOfShop } from '../../router/userRouter.ts';
import { getEventOfShopSuccess } from '../../redux/allEventOfShopSlice.ts';

const AllEvent = () => {
  const { currentEventOfShop } = useSelector((state: rootState) => state.allEventOfShop.allEventOfShop)
  const { currentShop } = useSelector((state: rootState) => state.shop.shop)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventId, setEventId] = useState<string | undefined>('')
  const dispatch = useDispatch()

  const axiosJWT = createAxios(currentShop, dispatch, loginSuccess)

  const handleOk = async () => {
    const listEvent = currentEventOfShop.filter((event: currentEvent) => event._id !== eventId)
    dispatch(getEventOfShopSuccess(listEvent))
    setIsModalOpen(false);
    try {
      const { data } = await axiosJWT.delete(`${deleteEventOfShop}/${eventId}`)
    } catch (error) {
      console.log(error);
    }

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<currentEvent> = [
    {
      title: 'ProductId',
      dataIndex: '_id',
      key: '_id',
      // render: (text) => <a>{text}</a>,
      width: '100',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // render: (text) => <a>{text}</a>,
      width: '120',
    },
    {
      title: 'Price',
      dataIndex: 'originalPrice',
      key: 'originalPrice',
      width: '100',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: '80',
    },
    {
      title: 'Sold out',
      dataIndex: 'sold_out',
      key: 'sold',
      width: '130',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <AiOutlineDelete size={20} className='cursor-pointer' onClick={() => {
            setIsModalOpen(true)
            setEventId(record?._id)
          }} />
        </Space>
      ),
      width: '100',
    },
  ];
  return (
    <div className='w-[90%]'>
      <Table columns={columns} dataSource={currentEventOfShop} style={{ width: '100%' }} scroll={{ x: 900 }} />
      <Modal
        title="Confirmed deletion"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          style: {
            backgroundColor: 'green',
            borderColor: 'green',
            color: 'white',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
          }
        }}
        cancelButtonProps={{
          style: {
            borderColor: 'green',
            color: 'black'
          },
        }}
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </Modal>


    </div>
  )
}

export default AllEvent