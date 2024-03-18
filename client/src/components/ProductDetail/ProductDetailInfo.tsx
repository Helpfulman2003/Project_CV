/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';
import { currentProduct } from '../../interface';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { format } from 'fecha'

interface IProps {
  getProduct: currentProduct
}

const ProductDetailInfo = ({ getProduct }: IProps) => {
  const [active, setActive] = useState<number>(1);

//   const getOrder = useMemo(() => {
//     const order = currentOrder.find((item) => item._id === id)
//     return order
// }, [id])

  return (
    <div className='w-full bg-[#f5f6fb] mb-12 rounded shadow px-10 py-12'>
      <div className='flex items-center justify-between border-b border-gray-200 border-solid pb-1'>
        <h2 onClick={() => setActive(1)} className={`text-[20px] font-semibold cursor-pointer ${active === 1 ? 'rounded-[2px] border-b-[3px] border-[crimson] border-solid' : null}`}>Product Details</h2>
        <h2 onClick={() => setActive(2)} className={`text-[20px] font-semibold cursor-pointer ${active === 2 ? 'rounded-[2px] border-b-[3px] border-[crimson] border-solid' : null}`}>Product Review</h2>
        <h2 onClick={() => setActive(3)} className={`text-[20px] font-semibold cursor-pointer ${active === 3 ? 'rounded-[2px] border-b-[3px] border-[crimson] border-solid' : null}`}>Seller Information</h2>
      </div>
      {active === 1 && (
        <div>
          <p className='mt-3 text-gray-800'>
            {getProduct.description}
          </p>
        </div>
      )}
      {
        active === 2 && (
          getProduct.reviews.length > 0 ? (
            <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
              {getProduct.reviews.map((item, index) => (
                <div key={index} className="w-full flex my-2"> {/* Added a key prop for each item */}
                  <img
                    src={item.userId.avatar.url[0].url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="pl-2">
                    <div className="w-full flex items-center">
                      <h1 className="font-[500] mr-3">{item.userId.name}</h1>
                      {/* Assuming you want to display the rating dynamically */}
                      <span>
                        <div className='flex justify-start items-end'>
                          {
                            [1, 2, 3, 4, 5].map(i => {
                              return (
                                item.rating >= i ? (
                                  <AiFillStar
                                    key={i}
                                    className="mr-1 cursor-pointer"
                                    color="rgb(246,186,0)"
                                    size={25}

                                  />
                                ) : (
                                  <AiOutlineStar
                                    key={i}
                                    className="mr-1 cursor-pointer"
                                    color="rgb(246,186,0)"
                                    size={25}

                                  />
                                )
                              )
                            })
                          }
                        </div>
                      </span> 
                    </div>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='min-h-[192px] flex items-center justify-center'>
              <span className='text-gray-800'>No Review yet!</span>
            </div>
          )
        )
      }

      {
        active === 3 && (
          <div className='grid grid-cols-2 mt-5'>
            <div>
              <div className='flex items-center justify-start gap-4'>
                <div>
                  <img src={getProduct?.shopId?.avatar.url[0].url} alt="" className='w-[50px] h-[50px] rounded-full' />
                </div>
                <div>
                  <p className='text-[#6cb0fb]'>{getProduct?.shopId?.name}</p>
                  <p>({getProduct?.shopId?.ratings ?? 0}) rating</p>
                </div>
              </div>
              <p className='text-gray-800 mt-2'>{getProduct.shopId?.description}</p>
            </div>

            <div className='flex flex-col items-end justify-center'>
              <h2 className='font-medium text-gray-800'>Joined on :{format(new Date(getProduct.shopId?.createdAt ?? ''))}</h2>
              <h2 className='font-medium text-gray-800'>Total Products :{getProduct.stock + getProduct.sold_out}</h2>
              <h2 className='font-medium text-gray-800'>Total Review :{getProduct.reviews.length}</h2>
              <div className="w-[150px] bg-black my-3 flex items-center justify-center cursor-pointer rounded h-[40px] mt-3">
                <h4 className="text-white"> Visit Shop</h4>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ProductDetailInfo;
