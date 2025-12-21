import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Dashboard from './pages/Dashboard'
import Reviews from './pages/Reviews'
import Users from './pages/Users'
import Settings from './pages/Settings'
import Vouchers from './pages/Vouchers'
import Customers from './pages/Customers'
import Shipping from './pages/Shipping'
import Payments from './pages/Payments'
import Stock from './pages/Stock'
import Returns from './pages/Returns'
import Finance from './pages/Finance'
import CRM from './pages/CRM'
import Analytics from './pages/Analytics'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "Rp."

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <Navbar setToken={setToken} token={token} />
          <hr className='border-slate-200 shadow-sm' />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-700 text-base'>
              <Routes>
                <Route path='/' element={<Dashboard token={token} />} />
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
                <Route path='/reviews' element={<Reviews token={token} />} />
                <Route path='/users' element={<Users token={token} />} />
                <Route path='/settings' element={<Settings token={token} />} />
                <Route path='/vouchers' element={<Vouchers token={token} />} />
                <Route path='/customers' element={<Customers token={token} />} />
                <Route path='/shipping' element={<Shipping token={token} />} />
                <Route path='/payments' element={<Payments token={token} />} />
                <Route path='/stock' element={<Stock token={token} />} />
                <Route path='/returns' element={<Returns token={token} />} />
                <Route path='/finance' element={<Finance token={token} />} />
                <Route path='/crm' element={<CRM token={token} />} />
                <Route path='/analytics' element={<Analytics token={token} />} />
              </Routes>
            </div>
          </div>
        </>}
    </div>
  )
}

export default App
