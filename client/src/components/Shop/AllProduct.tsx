/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { currentProduct, rootState } from '../../interface';
import { Modal } from 'antd';
import {getProductSuccess} from "../../redux/allProductShopSlice.ts"
import {createAxios} from '../../createIntance.ts'
import {loginSuccess} from '../../redux/shopSlice.ts'
import { deleteProductOfShop } from '../../router/userRouter.ts';

// interface DataType {
//   _id: string;
//   name: string;
//   price: number;
//   stock: number;
//   sold_out: number;
// }

const AllProduct = () => {
  const { currentProduct } = useSelector((state: rootState) => state.allProductShop.allProductShop)
  const { currentShop } = useSelector((state: rootState) => state.shop.shop)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState<string | undefined>('')
  const dispatch = useDispatch()

  const axiosJWT = createAxios(currentShop, dispatch, loginSuccess)

  const handleOk = async() => {
    const listProduct = currentProduct.filter((product: currentProduct) => product._id !== productId)
    dispatch(getProductSuccess(listProduct))
    setIsModalOpen(false);
    try {
      const {data} = await axiosJWT.delete(`${deleteProductOfShop}/${productId}`)
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<currentProduct> = [
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
            setProductId(record?._id)
          }} />
        </Space>
      ),
      width: '100',
    },
  ];

  // const data: currentProduct[] = [
  //   {
  //     _id: '1',
  //     name: 'John Brown',
  //     originalPrice: 32,
  //     stock: 12,
  //     sold_out: 45
  //   },
  //   {
  //     _id: '2',
  //     name: 'Jim Green',
  //     originalPrice: 42,
  //     stock: 32,
  //     sold_out: 21
  //   },
  //   {
  //     _id: '3',
  //     name: 'Joe Black',
  //     originalPrice: 32,
  //     stock: 45,
  //     sold_out: 12
  //   },
  // ];

  return (
    <div>
      <Table columns={columns} dataSource={currentProduct} style={{ width: '100%' }} scroll={{ x: 900 }} />
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

export default AllProduct