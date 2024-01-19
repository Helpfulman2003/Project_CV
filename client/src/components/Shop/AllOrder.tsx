/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { currentOrder, rootState } from '../../interface.ts';
import { FaArrowRight } from "react-icons/fa";
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

const AllOrder = () => {
    const { currentOrder } = useSelector((state: rootState) => state.allOrder.allOrder)
    const navigate = useNavigate()

    const columns: ColumnsType<currentOrder> = [
        {
            title: 'OrderId',
            dataIndex: '_id',
            key: '_id',
            width: '100',
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
                        navigate(`/order/${record?._id}`)
                    }} />
                </Space>
            ),
            width: '100',
        },
    ];
    return (
        <div>
            <Table columns={columns} dataSource={currentOrder} style={{ width: '100%' }} scroll={{ x: 900 }} />
        </div>
    )
}

export default AllOrder