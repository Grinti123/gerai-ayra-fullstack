import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const Payments = ({ token }) => {
    const [paymentMethods, setPaymentMethods] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'manual',
        details: '',
        isActive: true
    })

    const fetchPaymentMethods = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/payment/list')
            if (response.data.success) {
                setPaymentMethods(response.data.paymentMethods)
            } else {
                toast.error(response.data.message)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            setLoading(false)
        }
    }

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            type: 'manual',
            details: '',
            isActive: true
        })
        setEditingId(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingId ? `${backendUrl}/api/payment/update` : `${backendUrl}/api/payment/add`
            const payload = editingId ? { id: editingId, ...formData } : formData

            const response = await axios.post(url, payload, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.success ? response.data.message : 'Operation failed')
                setShowModal(false)
                resetForm()
                fetchPaymentMethods()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleEdit = (method) => {
        setEditingId(method._id)
        setFormData({
            name: method.name,
            description: method.description || '',
            type: method.type || 'manual',
            details: method.details || '',
            isActive: method.isActive
        })
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this payment method?')) return

        try {
            const response = await axios.post(backendUrl + '/api/payment/remove', { id }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                fetchPaymentMethods()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchPaymentMethods()
    }, [])

    if (loading) return <div className='p-6'>Loading payment methods...</div>

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-8'>
                <div>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>Payment Management</h1>
                    <p className='text-slate-500 mt-1'>Configure and manage payment options for your store.</p>
                </div>
                <button
                    onClick={() => {
                        resetForm()
                        setShowModal(true)
                    }}
                    className='bg-black text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-all flex items-center gap-2'
                >
                    <span className='text-xl'>+</span> Add Method
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {paymentMethods.map((method) => (
                    <div key={method._id} className={`bg-white rounded-2xl border ${method.isActive ? 'border-slate-200' : 'border-slate-100 opacity-60'} shadow-sm p-6 hover:shadow-md transition-all relative group`}>
                        <div className='flex justify-between items-start mb-4'>
                            <div className={`p-3 rounded-xl ${method.type === 'manual' ? 'bg-amber-50 text-amber-600' :
                                    method.type === 'automatic' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                                }`}>
                                <svg className='w-6 h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <div className='flex flex-col items-end gap-1'>
                                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${method.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {method.isActive ? 'Active' : 'Inactive'}
                                </div>
                                <div className='text-[10px] font-medium text-slate-400 uppercase tracking-tighter'>
                                    {method.type}
                                </div>
                            </div>
                        </div>

                        <h3 className='text-xl font-bold text-slate-900 mb-1'>{method.name}</h3>
                        <p className='text-sm text-slate-500 mb-6 min-h-[40px] line-clamp-2'>{method.description || 'No description provided.'}</p>

                        <div className='border-t border-slate-50 pt-4 flex justify-between items-center'>
                            <div className='text-xs font-medium text-slate-400'>
                                {method.type === 'manual' ? 'Manual Transfer' : method.type === 'automatic' ? 'Automatic (Midtrans)' : 'COD'}
                            </div>
                            <div className='flex gap-1'>
                                <button onClick={() => handleEdit(method)} className='p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all'>
                                    <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                </button>
                                <button onClick={() => handleDelete(method._id)} className='p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all'>
                                    <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {paymentMethods.length === 0 && (
                <div className='text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300'>
                    <p className='text-slate-500'>No payment methods found. Add your first payment option!</p>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-fade-in flex flex-col max-h-[90vh]'>
                        <div className='p-6 border-b border-slate-100 flex justify-between items-center shrink-0'>
                            <h2 className='text-xl font-bold text-slate-900'>{editingId ? 'Edit Payment Method' : 'Add Payment Method'}</h2>
                            <button onClick={() => setShowModal(false)} className='text-slate-400 hover:text-slate-600 bg-slate-50 p-1 rounded-full'>✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className='p-6 space-y-5 overflow-y-auto'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-slate-500 uppercase'>Method Name</label>
                                    <input
                                        type="text"
                                        className='w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none'
                                        placeholder='e.g. Bank BCA, Midtrans'
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-slate-500 uppercase'>Payment Type</label>
                                    <select
                                        className='w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none appearance-none bg-white'
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="manual">Manual Transfer</option>
                                        <option value="automatic">Automatic (Midtrans)</option>
                                        <option value="cod">Cash On Delivery</option>
                                    </select>
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <label className='text-xs font-bold text-slate-500 uppercase'>Brief Description</label>
                                <input
                                    type="text"
                                    className='w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none'
                                    placeholder='Description shown to customers'
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className='space-y-2'>
                                <label className='text-xs font-bold text-slate-500 uppercase'>Payment Details / Instructions</label>
                                <textarea
                                    className='w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none min-h-[100px]'
                                    placeholder='e.g. Bank Account details or COD instructions'
                                    value={formData.details}
                                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                />
                            </div>

                            <div className='flex items-center gap-3 pt-2'>
                                <label className='relative inline-flex items-center cursor-pointer'>
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                    <span className="ml-3 text-sm font-medium text-slate-700">Method Active</span>
                                </label>
                            </div>

                            <div className='pt-4 flex gap-3 shrink-0'>
                                <button type='button' onClick={() => setShowModal(false)} className='flex-1 py-3 text-sm font-bold text-slate-600 rounded-xl hover:bg-slate-100 transition-all'>Cancel</button>
                                <button type='submit' className='flex-2 bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-black/20'>
                                    {editingId ? 'Update Method' : 'Save Method'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Payments;
