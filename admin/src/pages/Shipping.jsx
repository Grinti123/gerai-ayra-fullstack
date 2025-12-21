import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const Shipping = ({ token }) => {
    const [shippingMethods, setShippingMethods] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        fee: '',
        estimatedDays: '',
        isActive: true
    })

    const fetchShippingMethods = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/shipping/list')
            if (response.data.success) {
                setShippingMethods(response.data.shippingMethods)
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
            fee: '',
            estimatedDays: '',
            isActive: true
        })
        setEditingId(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingId ? `${backendUrl}/api/shipping/update` : `${backendUrl}/api/shipping/add`
            const payload = editingId ? { id: editingId, ...formData } : formData

            const response = await axios.post(url, payload, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                setShowModal(false)
                resetForm()
                fetchShippingMethods()
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
            fee: method.fee,
            estimatedDays: method.estimatedDays || '',
            isActive: method.isActive
        })
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this shipping method?')) return

        try {
            const response = await axios.post(backendUrl + '/api/shipping/remove', { id }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                fetchShippingMethods()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchShippingMethods()
    }, [])

    if (loading) return <div className='p-6'>Loading shipping methods...</div>

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-8'>
                <div>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent'>Shipping Management</h1>
                    <p className='text-slate-500 mt-1'>Manage your delivery options and shipping fees.</p>
                </div>
                <button
                    onClick={() => {
                        resetForm()
                        setShowModal(true)
                    }}
                    className='bg-black text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-all flex items-center gap-2'
                >
                    <span className='text-xl'>+</span> Add Service
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {shippingMethods.map((method) => (
                    <div key={method._id} className={`bg-white rounded-2xl border ${method.isActive ? 'border-slate-200' : 'border-slate-100 opacity-60'} shadow-sm p-6 hover:shadow-md transition-all relative group`}>
                        <div className='flex justify-between items-start mb-4'>
                            <div className='p-3 bg-orange-50 rounded-xl'>
                                <svg className='w-6 h-6 text-orange-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                </svg>
                            </div>
                            <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${method.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                {method.isActive ? 'Active' : 'Inactive'}
                            </div>
                        </div>

                        <h3 className='text-xl font-bold text-slate-900 mb-1'>{method.name}</h3>
                        <p className='text-sm text-slate-500 mb-4'>Est. {method.estimatedDays || 'No estimate'}</p>

                        <div className='border-t border-slate-50 pt-4 flex justify-between items-end'>
                            <div>
                                <p className='text-xs font-bold text-slate-400 uppercase tracking-wider mb-1'>Shipping Fee</p>
                                <p className='text-2xl font-black text-slate-900'>{currency}{method.fee}</p>
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

            {shippingMethods.length === 0 && (
                <div className='text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300'>
                    <p className='text-slate-500'>No shipping methods found. Add your first delivery service!</p>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fade-in'>
                        <div className='p-6 border-b border-slate-100 flex justify-between items-center'>
                            <h2 className='text-xl font-bold text-slate-900'>{editingId ? 'Edit Shipping Service' : 'Add Shipping Service'}</h2>
                            <button onClick={() => setShowModal(false)} className='text-slate-400 hover:text-slate-600 bg-slate-50 p-1 rounded-full'>✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className='p-6 space-y-5'>
                            <div className='space-y-2'>
                                <label className='text-xs font-bold text-slate-500 uppercase'>Service Name</label>
                                <input
                                    type="text"
                                    className='w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none'
                                    placeholder='e.g. JNE Regular, Pickup at Store'
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-xs font-bold text-slate-500 uppercase'>Shipping Fee ({currency})</label>
                                <input
                                    type="number"
                                    className='w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none'
                                    placeholder='0'
                                    value={formData.fee}
                                    onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                                    required
                                    min="0"
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-xs font-bold text-slate-500 uppercase'>Estimated Delivery</label>
                                <input
                                    type="text"
                                    className='w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none'
                                    placeholder='e.g. 2-3 Days'
                                    value={formData.estimatedDays}
                                    onChange={(e) => setFormData({ ...formData, estimatedDays: e.target.value })}
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
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                                    <span className="ml-3 text-sm font-medium text-slate-700">Service Active</span>
                                </label>
                            </div>

                            <div className='pt-4 flex gap-3'>
                                <button type='button' onClick={() => setShowModal(false)} className='flex-1 py-3 text-sm font-bold text-slate-600 rounded-xl hover:bg-slate-100 transition-all'>Cancel</button>
                                <button type='submit' className='flex-2 bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-black/20'>
                                    {editingId ? 'Update Service' : 'Save Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Shipping
