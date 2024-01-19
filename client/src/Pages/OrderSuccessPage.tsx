import React from 'react';
import Header from '../components/Header/Header.tsx';
import Footer from '../components/Footer/Footer.tsx';
import Lottie from 'lottie-react';
import animationData from '../asset/success.json';

const OrderSuccessPage = () => {
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
