import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';

const Analytics = ({ token }) => {
    const [data, setData] = useState(null)

    const fetchAnalytics = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/analytics/dashboard', { headers: { token } })
            if (response.data.success) {
                setData(response.data)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Gagal memuat data analitik")
        }
    }

    useEffect(() => {
        fetchAnalytics()
    }, [])

    if (!data) return <div className='p-6 text-slate-500'>Memuat data analitik...</div>

    return (
        <div className='p-6 max-w-7xl mx-auto space-y-8 animate-fade-in'>
            {/* Header */}
            <div>
                <h1 className='text-3xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent'>Laporan & Analitik</h1>
                <p className='text-slate-500 mt-1 font-medium'>Ringkasan performa toko, pengunjung, dan produk.</p>
            </div>

            {/* Overview Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='bg-white p-6 rounded-2xl border border-slate-100 shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-violet-50 p-3 rounded-xl'>
                            <svg className='w-6 h-6 text-violet-600' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <p className='text-xs font-bold text-slate-400 uppercase'>Total Pendapatan</p>
                            <h3 className='text-2xl font-black text-slate-900'>{currency}{data.summary.totalRevenue.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
                <div className='bg-white p-6 rounded-2xl border border-slate-100 shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-pink-50 p-3 rounded-xl'>
                            <svg className='w-6 h-6 text-pink-600' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        </div>
                        <div>
                            <p className='text-xs font-bold text-slate-400 uppercase'>Total Pesanan</p>
                            <h3 className='text-2xl font-black text-slate-900'>{data.summary.totalOrders}</h3>
                        </div>
                    </div>
                </div>
                <div className='bg-white p-6 rounded-2xl border border-slate-100 shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-cyan-50 p-3 rounded-xl'>
                            <svg className='w-6 h-6 text-cyan-600' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                        </div>
                        <div>
                            <p className='text-xs font-bold text-slate-400 uppercase'>Total Produk</p>
                            <h3 className='text-2xl font-black text-slate-900'>{data.summary.totalProducts}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Sales Chart */}
                <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
                    <h3 className='font-bold text-slate-800 mb-6'>Laporan Penjualan (7 Hari Terakhir)</h3>
                    <div className='h-80'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.salesData}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(value) => `${value / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Visitor Chart */}
                <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
                    <h3 className='font-bold text-slate-800 mb-6'>Laporan Pengunjung</h3>
                    <div className='h-80'>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.visitorData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Line type="monotone" dataKey="visitors" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Products */}
                <div className='lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
                    <h3 className='font-bold text-slate-800 mb-6'>5 Produk Terlaris</h3>
                    <div className='h-64'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.topProducts} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                />
                                <Bar dataKey="count" fill="#ec4899" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics
