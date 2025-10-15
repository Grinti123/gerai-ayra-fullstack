import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        axios.get(backendUrl + '/api/product/list'),
        axios.post(backendUrl + '/api/orders/list', {}, { headers: { token } }),
        axios.get(backendUrl + '/api/user/all-users', { headers: { token } })
      ])

      const products = productsRes.data.products || []
      const orders = ordersRes.data.success ? ordersRes.data.orders : []

      // Calculate total revenue from completed orders
      const totalRevenue = orders.reduce((sum, order) =>
        order.status === 'Delivered' ? sum + order.amount : sum, 0)

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: usersRes.data.success ? usersRes.data.users : 0,
        totalRevenue
      })

      // Get recent 5 orders
      setRecentOrders(orders.slice(-5).reverse())

    } catch (error) {
      console.log(error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [token])

  if (loading) {
    return (
      <div className='flex items-center justify-center py-16'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  return (
    <div className='p-6'>
      <h1 className='bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent text-3xl font-bold mb-8 animate-fade-in'>Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/50 hover:shadow-[0_8px_25px_rgba(59,130,246,0.15)] hover:scale-105 transition-all duration-300 group'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-slate-500 text-sm font-medium'>Total Products</p>
              <p className='text-3xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors'>{stats.totalProducts}</p>
            </div>
            <div className='w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center group-hover:shadow-lg transition-shadow'>
              <svg className='w-7 h-7 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'></path>
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/50 hover:shadow-[0_8px_25px_rgba(34,197,94,0.15)] hover:scale-105 transition-all duration-300 group'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-slate-500 text-sm font-medium'>Total Orders</p>
              <p className='text-3xl font-bold text-slate-800 group-hover:text-green-600 transition-colors'>{stats.totalOrders}</p>
            </div>
            <div className='w-14 h-14 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full flex items-center justify-center group-hover:shadow-lg transition-shadow'>
              <svg className='w-7 h-7 text-emerald-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'></path>
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/50 hover:shadow-[0_8px_25px_rgba(147,51,234,0.15)] hover:scale-105 transition-all duration-300 group'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-slate-500 text-sm font-medium'>Registered Users</p>
              <p className='text-3xl font-bold text-slate-800 group-hover:text-purple-600 transition-colors'>{stats.totalUsers}</p>
            </div>
            <div className='w-14 h-14 bg-gradient-to-br from-purple-50 to-purple-100 rounded-full flex items-center justify-center group-hover:shadow-lg transition-shadow'>
              <svg className='w-7 h-7 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'></path>
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/50 hover:shadow-[0_8px_25px_rgba(245,158,11,0.15)] hover:scale-105 transition-all duration-300 group'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-slate-500 text-sm font-medium'>Total Revenue</p>
              <p className='text-3xl font-bold text-slate-800 group-hover:text-amber-600 transition-colors'>Rp.{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className='w-14 h-14 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center group-hover:shadow-lg transition-shadow'>
              <svg className='w-7 h-7 text-amber-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className='bg-white rounded-lg shadow-sm border'>
        <div className='p-6 border-b'>
          <h2 className='text-xl font-semibold'>Recent Orders</h2>
        </div>
        <div className='p-6'>
          {recentOrders.length === 0 ? (
            <p className='text-gray-500 text-center py-8'>No orders yet</p>
          ) : (
            <div className='space-y-4'>
              {recentOrders.map((order) => (
                <div key={order._id} className='flex items-center justify-between p-4 border rounded-lg'>
                  <div>
                    <p className='font-medium'>Order #{order._id.slice(-8)}</p>
                    <p className='text-sm text-gray-500'>
                      {order.address ? [order.address.firstName, order.address.lastName].filter(Boolean).join(' ') : 'N/A'}
                    </p>
                    <p className='text-xs text-gray-400'>
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='font-semibold'>Rp.{order.amount.toLocaleString()}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
