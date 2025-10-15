import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({token}) => {

    const [orders, setOrders] = useState([])

    const fetchAllOrders = async () => {

        if (!token) {
          return null
        }

        try {
          const response = await axios.post(backendUrl + '/api/orders/list', {}, {headers:{token}})
          if (response.data.success) {
            console.log(response.data);
            setOrders(response.data.orders)
          }
          else {
            toast.error(response.data.message)
          }
          
        } catch (error) {
          toast.error(error.message)
        }
    }

    const statusHandler = async ( event, orderId ) => {
      try {
        const response = await axios.post(backendUrl + '/api/orders/status', {orderId, status:event.target.value}, {headers:{token}})
        if (response.data.success) {
          await fetchAllOrders()
        }
      } catch (error) {
        console.log(error);
        toast.error(response.data.message)
        
      }
    }

    useEffect(() => {
      fetchAllOrders();
    }, [token])

  return (
    <div className='p-6'>
      <h1 className='bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent text-3xl font-bold mb-8'>Orders Management</h1>

      <div className='space-y-4'>
        {
          orders.map((order, index) => (
            <div className='bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/50 p-6 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] hover:scale-[1.01] transition-all duration-300' key={index}>
              <div className='grid grid-cols-1 lg:grid-cols-[0.5fr_2fr_1fr_1fr] gap-6 items-start'>
                <div className='flex items-center justify-center'>
                  <div className='w-16 h-16 bg-gradient-to-br from-amber-50 to-orange-100 rounded-full flex items-center justify-center shadow-sm'>
                    <img className='w-8 h-8' src={assets.parcel_icon} alt="" />
                  </div>
                </div>

                <div className='space-y-3'>
                  <div className='bg-slate-50 rounded-lg p-4'>
                    <h4 className='font-semibold text-slate-800 mb-2'>Order Items</h4>
                    <div className='space-y-1'>
                      {order.items.map((item, idx) => (
                        <p className='text-sm text-slate-600' key={idx}>
                          <span className='font-medium'>{item.name}</span> x {item.quantity} <span className='text-blue-600'>({item.size})</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className='font-semibold text-slate-800 mb-2'>Customer Details</p>
                    <p className='text-sm text-slate-600 font-medium mb-1'>{order.address.firstName} {order.address.lastName}</p>
                    <div className='text-xs text-slate-500 space-y-0.5'>
                      <p>{order.address.street}</p>
                      <p>{order.address.city}, {order.address.state}, {order.address.country} {order.address.zipcode}</p>
                      <p className='text-blue-600 font-medium'>{order.address.phone}</p>
                    </div>
                  </div>
                </div>

                <div className='space-y-3'>
                  <div className='bg-slate-50 rounded-lg p-4'>
                    <h4 className='font-semibold text-slate-800 mb-2'>Order Details</h4>
                    <div className='space-y-2 text-sm'>
                      <p className='text-slate-600'><span className='font-medium'>Items:</span> {order.items.length}</p>
                      <p className='text-slate-600'><span className='font-medium'>Payment:</span> {order.paymentMethod}</p>
                      <p className={`${
                        order.payment ? 'text-emerald-600' : 'text-red-500'
                      }`}>
                        <span className='font-medium'>Status:</span> {order.payment ? 'Paid' : 'Pending'}
                      </p>
                      <p className='text-slate-600'><span className='font-medium'>Date:</span> {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</p>
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='text-right'>
                    <p className='text-2xl font-bold text-slate-800'>{currency}{order.amount.toLocaleString()}</p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Update Status</label>
                    <select
                      onChange={(event) => statusHandler(event, order._id)}
                      value={order.status}
                      className='w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:border-blue-400 focus:outline-none transition-colors'
                    >
                      <option value="Order Placed" className='bg-white'>Order Placed</option>
                      <option value="Packing" className='bg-white'>Packing</option>
                      <option value="Shipped" className='bg-white'>Shipped</option>
                      <option value="Out for Delivery" className='bg-white'>Out for Delivery</option>
                      <option value="Delivered" className='bg-white'>Delivered</option>
                    </select>
                  </div>

                  <div className='flex items-center gap-2 mt-3'>
                    <div className={`w-3 h-3 rounded-full ${
                      order.status === 'Delivered' ? 'bg-emerald-500' :
                      order.status === 'Shipped' ? 'bg-blue-500' :
                      order.status === 'Out for Delivery' ? 'bg-amber-500' :
                      order.status === 'Packing' ? 'bg-purple-500' :
                      'bg-slate-400'
                    }`}></div>
                    <span className='text-xs font-medium text-slate-600 uppercase tracking-wide'>{order.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {orders.length === 0 && (
        <div className='text-center py-16'>
          <div className='w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg className='w-10 h-10 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'></path>
            </svg>
          </div>
          <p className='text-slate-500 text-lg font-medium'>No orders found</p>
          <p className='text-slate-400 text-sm'>Orders will appear here once customers place them</p>
        </div>
      )}
    </div>
  )
}

export default Orders
