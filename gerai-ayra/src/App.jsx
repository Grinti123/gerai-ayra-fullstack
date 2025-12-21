import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Product from './pages/Product'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import About from './pages/About'
import Profile from './pages/Profile'
import TermsConditions from './pages/TermsConditions'
import FAQPage from './pages/FAQPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Promotions from './pages/Promotions'
import Wishlist from './pages/Wishlist'
import MyReturns from './pages/MyReturns'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Analytics />
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection/' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/terms-conditions' element={<TermsConditions />} />
        <Route path='/faq' element={<FAQPage />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/:id' element={<BlogDetail />} />
        <Route path='/promotions' element={<Promotions />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/returns' element={<MyReturns />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
