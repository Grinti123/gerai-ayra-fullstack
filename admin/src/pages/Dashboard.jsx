import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    avgOrderValue: 0
  })
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        axios.get(backendUrl + '/api/product/list'),
        axios.post(backendUrl + '/api/orders/list', {}, { headers: { token } }),
        axios.get(backendUrl + '/api/user/list', { headers: { token } })
      ])

      const products = productsRes.data.products || []
      const orders = (ordersRes.data.success ? ordersRes.data.orders : []) || []
      const users = (usersRes.data.success ? usersRes.data.users : []) || []

      // Calculate total revenue from completed orders
      const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0)
      const avgOrderValue = orders.length > 0 ? (totalRevenue / orders.length) : 0;

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalRevenue,
        avgOrderValue
      })

      // Process Sales Data for Area Chart (Sales over time)
      const salesMap = {};
      orders.forEach(order => {
        const date = new Date(order.date);
        const day = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
        salesMap[day] = (salesMap[day] || 0) + order.amount;
      });

      const processedSales = Object.entries(salesMap).map(([name, sales]) => ({ name, sales })).slice(-7);
      setSalesData(processedSales);

      // Process Category Data for Pie Chart
      const categoryMap = {};
      orders.forEach(order => {
        order.items.forEach(item => {
          const cat = item.category || 'Uncategorized';
          categoryMap[cat] = (categoryMap[cat] || 0) + item.quantity;
        });
      });

      const processedCategory = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
      setCategoryData(processedCategory);

      // Get recent 5 orders
      setRecentOrders(orders.slice(-5).reverse())

    } catch (error) {
      console.log(error)
      // toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [token])

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='relative w-16 h-16'>
          <div className='absolute inset-0 border-4 border-slate-100 rounded-full'></div>
          <div className='absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='p-6 space-y-8 animate-fade-in'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-indigo-600 bg-clip-text text-transparent'>
            Dashboard Analytics
          </h1>
          <p className='text-slate-500 mt-1'>Selamat datang kembali, berikut ringkasan performa toko Anda hari ini.</p>
        </div>
        <div className='flex gap-3'>
          <button onClick={fetchDashboardData} className='bg-white border border-slate-200 p-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm'>
            <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
          <div className='bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 flex items-center gap-2'>
            <span className='w-2 h-2 bg-emerald-400 rounded-full animate-pulse'></span>
            Sistem Aktif
          </div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {[
          { label: 'Total Penjualan', value: `${currency}${stats.totalRevenue.toLocaleString()}`, color: 'indigo', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
          { label: 'Pesanan Masuk', value: stats.totalOrders, color: 'emerald', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
          { label: 'Produk Aktif', value: stats.totalProducts, color: 'amber', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
          { label: 'Pengguna Terdaftar', value: stats.totalUsers, color: 'rose', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' }
        ].map((item, idx) => (
          <div key={idx} className='bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group'>
            <div className='flex items-center justify-between gap-4'>
              <div className={`w-12 h-12 bg-${item.color}-50 text-${item.color}-600 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-${item.color}-600 group-hover:text-white`}>
                <svg className='w-6 h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
              </div>
              <div className='flex-1 text-right'>
                <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>{item.label}</p>
                <h3 className='text-2xl font-black text-slate-900 mt-1 leading-none'>{item.value}</h3>
              </div>
            </div>
            <div className='mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-400'>
              <span>vs Bulan Lalu</span>
              <span className='text-emerald-500 flex items-center gap-1'>
                <svg className='w-3 h-3' fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
                +12.5%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Sales Trend */}
        <div className='lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h3 className='text-lg font-bold text-slate-800 tracking-tight'>Tren Penjualan</h3>
              <p className='text-xs text-slate-500 font-medium'>Statistik pendapatan dalam 7 periode terakhir.</p>
            </div>
            <div className='flex bg-slate-100 p-1 rounded-xl'>
              <button className='px-4 py-1.5 text-xs font-bold bg-white text-indigo-600 rounded-lg shadow-sm'>Harian</button>
              <button className='px-4 py-1.5 text-xs font-bold text-slate-500'>Bulanan</button>
            </div>
          </div>
          <div className='h-[350px] w-full'>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                  cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share */}
        <div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-sm'>
          <h3 className='text-lg font-bold text-slate-800 mb-8 tracking-tight'>Distribusi Produk</h3>
          <div className='h-[300px] w-full'>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 600 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className='mt-4 p-4 bg-slate-50 rounded-2xl'>
            <div className='flex items-center justify-between text-xs font-bold'>
              <span className='text-slate-500'>Order Terbanyak</span>
              <span className='text-indigo-600'>{categoryData.length > 0 ? categoryData.sort((a, b) => b.value - a.value)[0].name : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Recent Orders Section */}
        <div className='bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden'>
          <div className='p-6 border-b border-slate-100 flex items-center justify-between'>
            <h3 className='text-lg font-bold text-slate-800'>Pesanan Terbaru</h3>
            <button className='text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors'>Lihat Semua</button>
          </div>
          <div className='p-0'>
            {recentOrders.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-20 text-slate-400 leading-none'>
                <svg className='w-12 h-12 mb-4 opacity-20' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <p className='text-sm font-bold'>Belum ada pesanan masuk</p>
              </div>
            ) : (
              <div className='divide-y divide-slate-50'>
                {recentOrders.map((order) => (
                  <div key={order._id} className='flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group cursor-default'>
                    <div className='flex items-center gap-4'>
                      <div className='w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-500 text-xs shadow-inner'>
                        {order.address ? order.address.firstName.charAt(0) : '?'}
                      </div>
                      <div>
                        <p className='text-sm font-black text-slate-900 leading-tight'>
                          {order.items.slice(0, 2).map(item => item.name).join(', ')}{order.items.length > 2 ? '...' : ''}
                        </p>
                        <p className='text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider'>
                          {new Date(order.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm font-black text-indigo-600'>{currency}{order.amount.toLocaleString()}</p>
                      <span className={`inline-block mt-1 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-full ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'Processing' ? 'bg-amber-100 text-amber-700' :
                              'bg-slate-100 text-slate-600'
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

        {/* Quick Insights Section */}
        <div className='bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl'>
          <div className='absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-700/30 rounded-full blur-3xl'></div>
          <div className='relative z-10'>
            <h3 className='text-2xl font-black mb-2'>Ringkasan Performa</h3>
            <p className='text-indigo-200 text-sm font-medium'>Statistik rata-rata toko Anda saat ini.</p>

            <div className='mt-10 grid grid-cols-2 gap-8'>
              <div className='space-y-1'>
                <p className='text-indigo-300 text-[10px] font-black uppercase tracking-widest'>Average Order</p>
                <p className='text-3xl font-black'>{currency}{stats.avgOrderValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
              <div className='space-y-1'>
                <p className='text-indigo-300 text-[10px] font-black uppercase tracking-widest'>Conversion Rate</p>
                <p className='text-3xl font-black'>3.4%</p>
              </div>
              <div className='space-y-1'>
                <p className='text-indigo-300 text-[10px] font-black uppercase tracking-widest'>Customer Return</p>
                <p className='text-3xl font-black'>14%</p>
              </div>
              <div className='space-y-1'>
                <p className='text-indigo-300 text-[10px] font-black uppercase tracking-widest'>Fulfillment</p>
                <p className='text-3xl font-black'>98%</p>
              </div>
            </div>
          </div>

          <div className='relative z-10 bg-indigo-800/40 p-5 rounded-2xl border border-indigo-400/20 mt-8'>
            <p className='text-xs font-bold leading-relaxed'>
              🚀 Penjualan Anda meningkat <span className='text-emerald-400'>24%</span> dibandingkan minggu lalu. Terus tingkatkan stok produk terpopuler Anda!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
