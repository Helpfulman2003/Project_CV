/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { currentOrderUser, rootState } from '../../interface';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';


const ProfileContentOrder = () => {
  const { currentOrderUser } = useSelector((state: rootState) => state.allOrderUser.allOrderUser)
  const navigate = useNavigate()

  const columns: ColumnsType<currentOrderUser> = [
      {
          title: 'OrderId',
          dataIndex: '_id',
          key: '_id',
          width: '100',
          render: (_id: string) => {
            return _id.substring(0, 10)+'...'
          }
      },
      {
          title: 'Total Price',
          dataIndex: 'totalPrice',
          key: 'totalPrice',
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
                      navigate(`/profile/order/${record?._id}`)
                  }} />
              </Space>
          ),
          width: '80',
      },
  ];
  return (
      <div className='md:translate-x-[0px] translate-x-[-20px]'>
          <Table columns={columns} dataSource={currentOrderUser}  />
      </div>
  )
}

export default ProfileContentOrder