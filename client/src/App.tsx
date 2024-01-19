import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from './Pages/HomePage.tsx';
import BestSelling from './Pages/BestSelling.tsx';
import ProductPage from './Pages/ProductPage.tsx';
import EventPage from './Pages/EventPage.tsx';
import FAQPage from './Pages/FAQPage.tsx';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';
import ProfilePage from './Pages/ProfilePage.tsx';
import ProductDetailPage from './Pages/ProductDetailPage.tsx';
import ShopPage from './Pages/ShopPage.tsx';
import ProfileShopPage from './Pages/ProfileShopPage.tsx';
import CheckOutPage from './Pages/CheckOutPage.tsx';
import ShopRegisterPage from './Pages/ShopRegisterPage.tsx';
import ShopLoginPage from './Pages/ShopLoginPage.tsx';
import PaymentPage from './Pages/PaymentPage.tsx';
import OrderSuccessPage from './Pages/OrderSuccessPage.tsx';
import ShopOrderDetailPage from './Pages/ShopOrderDetailPage.tsx';
import UserOrderDetailPage from './Pages/UserOrderDetailPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/best-selling' element={<BestSelling/>}/>
        <Route path='/product' element={<ProductPage/>}/>
        <Route path='/event' element={<EventPage/>}/>
        <Route path='/faq' element={<FAQPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/product/:id' element={<ProductDetailPage/>}/>
        <Route path='/shop' element={<ShopPage/>}/>
        <Route path='/shop/:id' element={<ProfileShopPage/>}/>
        <Route path='/checkout' element={<CheckOutPage/>}/>
        <Route path='/payment' element={<PaymentPage/>}/>
        <Route path='/order/success' element={<OrderSuccessPage/>}/>
        <Route path='/shop-create' element={<ShopRegisterPage/>}/>
        <Route path='/shop-login' element={<ShopLoginPage/>}/>
        <Route path='/order/:id' element={<ShopOrderDetailPage/>}/>
        <Route path='/profile/order/:id' element={<UserOrderDetailPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
