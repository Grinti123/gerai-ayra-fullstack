import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';

const Finance = ({ token }) => {
    const [orders, setOrders] = useState([])
    const [expenses, setExpenses] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAddExpense, setShowAddExpense] = useState(false)
    const [expenseForm, setExpenseForm] = useState({
        title: '',
        amount: '',
        category: 'Operasional',
        description: '',
        date: new Date().toISOString().split('T')[0]
    })

    const fetchFinancialData = async () => {
        try {
            const [ordersRes, expensesRes] = await Promise.all([
                axios.post(backendUrl + '/api/orders/list', {}, { headers: { token } }),
                axios.get(backendUrl + '/api/expense/list', { headers: { token } })
            ])

            if (ordersRes.data.success) setOrders(ordersRes.data.orders)
            if (expensesRes.data.success) setExpenses(expensesRes.data.expenses)

            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error("Gagal memuat data keuangan")
            setLoading(false)
        }
    }

    const handleAddExpense = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendUrl + '/api/expense/add', {
                ...expenseForm,
                date: new Date(expenseForm.date).getTime()
            }, { headers: { token } })

            if (response.data.success) {
                toast.success("Pengeluaran berhasil dicatat")
                setShowAddExpense(false)
                setExpenseForm({ title: '', amount: '', category: 'Operasional', description: '', date: new Date().toISOString().split('T')[0] })
                fetchFinancialData()
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const removeExpense = async (id) => {
        if (!window.confirm("Hapus catatan pengeluaran ini?")) return
        try {
            const response = await axios.post(backendUrl + '/api/expense/remove', { id }, { headers: { token } })
            if (response.data.success) {
                toast.success("Catatan dihapus")
                fetchFinancialData()
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchFinancialData()
    }, [])

    // Process Chart Data
    const getChartData = () => {
        const dataMap = {}

        // Process Revenue
        orders.forEach(order => {
            const date = new Date(order.date).toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })
            if (!dataMap[date]) dataMap[date] = { name: date, revenue: 0, expense: 0 }
            dataMap[date].revenue += order.amount
        })

        // Process Expenses
        expenses.forEach(exp => {
            const date = new Date(exp.date).toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })
            if (!dataMap[date]) dataMap[date] = { name: date, revenue: 0, expense: 0 }
            dataMap[date].expense += exp.amount
        })

        return Object.values(dataMap).sort((a, b) => new Date(a.name) - new Date(b.name)).slice(-6)
    }

    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0)
    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0)
    const netProfit = totalRevenue - totalExpense

    if (loading) return <div className='p-6'>Memuat laporan...</div>

    return (
        <div className='p-6 max-w-7xl mx-auto space-y-8 animate-fade-in'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                <div>
                    <h1 className='text-3xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-indigo-600 bg-clip-text text-transparent'>Laporan Keuangan</h1>
                    <p className='text-slate-500 mt-1 font-medium'>Pantau aliran kas masuk dan keluar bisnis Anda.</p>
                </div>
                <button
                    onClick={() => setShowAddExpense(true)}
                    className='bg-black text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg'
                >
                    <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    Catat Pengeluaran
                </button>
            </div>

            {/* Summary Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-sm'>
                    <p className='text-[10px] font-black text-emerald-500 uppercase tracking-widest'>Total Pendapatan</p>
                    <h3 className='text-3xl font-black text-slate-900 mt-1'>{currency}{totalRevenue.toLocaleString()}</h3>
                    <div className='mt-4 h-1 w-full bg-emerald-50 rounded-full overflow-hidden'>
                        <div className='h-full bg-emerald-500 w-[70%]'></div>
                    </div>
                </div>
                <div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-sm'>
                    <p className='text-[10px] font-black text-rose-500 uppercase tracking-widest'>Total Pengeluaran</p>
                    <h3 className='text-3xl font-black text-slate-900 mt-1'>{currency}{totalExpense.toLocaleString()}</h3>
                    <div className='mt-4 h-1 w-full bg-rose-50 rounded-full overflow-hidden'>
                        <div className='h-full bg-rose-500 w-[30%]'></div>
                    </div>
                </div>
                <div className='bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-100 text-white'>
                    <p className='text-[10px] font-black text-indigo-200 uppercase tracking-widest'>Laba Bersih</p>
                    <h3 className='text-3xl font-black mt-1'>{currency}{netProfit.toLocaleString()}</h3>
                    <p className='text-[10px] font-bold mt-4 opacity-80'>Sudah dipotong pajak & biaya operasional</p>
                </div>
            </div>

            {/* Charts */}
            <div className='bg-white p-8 rounded-3xl border border-slate-200 shadow-sm'>
                <h3 className='text-lg font-black text-slate-800 mb-8'>Statistik Laba Rugi</h3>
                <div className='h-[400px]'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getChartData()}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} tickFormatter={(value) => `${value / 1000000}M`} />
                            <Tooltip
                                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '20px' }} />
                            <Bar dataKey="revenue" name="Pendapatan" fill="#6366f1" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="expense" name="Pengeluaran" fill="#fda4af" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* List Sections */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Revenue History (Recent Orders) */}
                <div className='bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden'>
                    <div className='p-6 border-b border-slate-100 flex items-center justify-between'>
                        <h3 className='text-lg font-black text-slate-800 text-emerald-600'>Pendapatan Terbaru</h3>
                    </div>
                    <div className='divide-y divide-slate-50 max-h-[500px] overflow-y-auto'>
                        {orders.slice(0, 10).map((order) => (
                            <div key={order._id} className='p-5 flex justify-between items-center group'>
                                <div>
                                    <p className='text-sm font-black text-slate-800'>#{order._id.slice(-6).toUpperCase()}</p>
                                    <p className='text-[10px] font-bold text-slate-400 mt-1'>{new Date(order.date).toLocaleDateString('id-ID')}</p>
                                </div>
                                <p className='text-sm font-black text-emerald-600'>+{currency}{order.amount.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Expense History */}
                <div className='bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden'>
                    <div className='p-6 border-b border-slate-100'>
                        <h3 className='text-lg font-black text-slate-800 text-rose-600'>Daftar Pengeluaran</h3>
                    </div>
                    <div className='divide-y divide-slate-50 max-h-[500px] overflow-y-auto'>
                        {expenses.length === 0 ? (
                            <div className='p-20 text-center text-slate-400 font-bold'>Belum ada catatan pengeluaran</div>
                        ) : (
                            expenses.map((exp) => (
                                <div key={exp._id} className='p-5 flex justify-between items-center group'>
                                    <div className='flex items-center gap-4'>
                                        <div onClick={() => removeExpense(exp._id)} className='w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-rose-50 hover:text-rose-600 cursor-pointer transition-all'>
                                            <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </div>
                                        <div>
                                            <p className='text-sm font-black text-slate-800'>{exp.title}</p>
                                            <p className='text-[10px] font-bold text-slate-400 mt-1'>{exp.category} • {new Date(exp.date).toLocaleDateString('id-ID')}</p>
                                        </div>
                                    </div>
                                    <p className='text-sm font-black text-rose-600'>-{currency}{exp.amount.toLocaleString()}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Add Expense Modal */}
            {/* Add Expense Modal */}
            {showAddExpense && createPortal(
                <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4'>
                    <div className='bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fade-in'>
                        <div className='p-6 border-b border-slate-100 flex justify-between items-center'>
                            <h2 className='text-xl font-bold text-slate-900'>Catat Pengeluaran</h2>
                            <button onClick={() => setShowAddExpense(false)} className='text-slate-400 hover:text-slate-600 bg-slate-50 p-1 rounded-full transition-all'>✕</button>
                        </div>
                        <form onSubmit={handleAddExpense} className='p-6 space-y-5'>
                            <div className='space-y-2'>
                                <label className='text-xs font-bold text-slate-500 uppercase'>Judul / Nama Keperluan</label>
                                <input
                                    type="text" required
                                    className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all'
                                    value={expenseForm.title}
                                    onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                                    placeholder="Misal: Listrik Kantor"
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-slate-500 uppercase'>Jumlah ({currency})</label>
                                    <input
                                        type="number" required
                                        className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all'
                                        value={expenseForm.amount}
                                        onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                                        placeholder="0"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-slate-500 uppercase'>Kategori</label>
                                    <select
                                        className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white transition-all cursor-pointer'
                                        value={expenseForm.category}
                                        onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                                    >
                                        <option value="Operasional">Operasional</option>
                                        <option value="Stok Barang">Stok Barang</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Gaji Karyawan">Gaji Karyawan</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <label className='text-xs font-bold text-slate-500 uppercase'>Tanggal Transaksi</label>
                                <input
                                    type="date" required
                                    className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all'
                                    value={expenseForm.date}
                                    onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-xs font-bold text-slate-500 uppercase'>Keterangan (Opsional)</label>
                                <textarea
                                    className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none'
                                    rows="2"
                                    value={expenseForm.description}
                                    onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                                    placeholder="Detail tambahan..."
                                />
                            </div>
                            <div className='pt-4 flex gap-3'>
                                <button type='button' onClick={() => setShowAddExpense(false)} className='flex-1 py-3 text-sm font-bold text-slate-600 rounded-xl hover:bg-slate-100 transition-all'>Batal</button>
                                <button type='submit' className='flex-2 bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-black/20'>
                                    Simpan Transaksi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>, document.body
            )}
        </div>
    )
}

export default Finance
