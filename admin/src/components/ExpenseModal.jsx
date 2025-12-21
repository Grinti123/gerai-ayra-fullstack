import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const ExpenseModal = ({ token, isOpen, onClose, onRefresh }) => {
    const [expenseForm, setExpenseForm] = useState({
        title: '',
        amount: '',
        category: 'Operasional',
        description: '',
        date: new Date().toISOString().split('T')[0]
    })

    const handleAddExpense = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendUrl + '/api/expense/add', {
                ...expenseForm,
                date: new Date(expenseForm.date).getTime()
            }, { headers: { token } })

            if (response.data.success) {
                toast.success("Pengeluaran berhasil dicatat")
                onClose()
                setExpenseForm({ title: '', amount: '', category: 'Operasional', description: '', date: new Date().toISOString().split('T')[0] })
                if (onRefresh) onRefresh()
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4'>
            <div className='bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fade-in'>
                <div className='p-6 border-b border-slate-100 flex justify-between items-center'>
                    <h2 className='text-xl font-bold text-slate-900'>Catat Pengeluaran</h2>
                    <button onClick={onClose} className='text-slate-400 hover:text-slate-600 bg-slate-50 p-1 rounded-full transition-all'>✕</button>
                </div>
                <form onSubmit={handleAddExpense} className='p-6 space-y-5'>
                    <div className='space-y-2'>
                        <label className='text-xs font-bold text-slate-500 uppercase'>Judul / Nama Keperluan</label>
                        <input
                            type="text" required
                            className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-sm'
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
                                className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-sm'
                                value={expenseForm.amount}
                                onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                                placeholder="0"
                            />
                        </div>
                        <div className='space-y-2'>
                            <label className='text-xs font-bold text-slate-500 uppercase'>Kategori</label>
                            <select
                                className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white transition-all cursor-pointer font-medium text-sm'
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
                            className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-sm'
                            value={expenseForm.date}
                            onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-xs font-bold text-slate-500 uppercase'>Keterangan (Opsional)</label>
                        <textarea
                            className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none font-medium text-sm'
                            rows="2"
                            value={expenseForm.description}
                            onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                            placeholder="Detail tambahan..."
                        />
                    </div>
                    <div className='pt-4 flex gap-3'>
                        <button type='button' onClick={onClose} className='flex-1 py-3 text-sm font-bold text-slate-600 rounded-xl hover:bg-slate-100 transition-all'>Batal</button>
                        <button type='submit' className='flex-2 bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-black/20'>
                            Simpan Transaksi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ExpenseModal
