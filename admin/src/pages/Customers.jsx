import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const Customers = ({ token }) => {
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [showEditModal, setShowEditModal] = useState(false)
    const [showOrderModal, setShowOrderModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [customerOrders, setCustomerOrders] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        address: {
            line1: '',
            line2: '',
            city: '',
            province: '',
            zipcode: ''
        }
    })

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/user/list', { headers: { token } })
            if (response.data.success) {
                setCustomers(response.data.users)
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

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) return

        try {
            const response = await axios.post(backendUrl + '/api/user/remove', { id }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                fetchCustomers()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleEdit = (customer) => {
        setSelectedCustomer(customer)
        setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone || '',
            address: customer.address || {
                line1: '',
                line2: '',
                city: '',
                province: '',
                zipcode: ''
            }
        })
        setShowEditModal(true)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendUrl + '/api/user/update', {
                id: selectedCustomer._id,
                ...formData
            }, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                setShowEditModal(false)
                fetchCustomers()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendUrl + '/api/user/add', formData, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                setShowAddModal(false)
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    address: { line1: '', line2: '', city: '', province: '', zipcode: '' }
                })
                fetchCustomers()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const viewOrders = async (customer) => {
        setSelectedCustomer(customer)
        try {
            const response = await axios.post(backendUrl + '/api/orders/customer-orders', { userId: customer._id }, { headers: { token } })
            if (response.data.success) {
                setCustomerOrders(response.data.orders)
                setShowOrderModal(true)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) return <div className='p-6'>Loading customers...</div>

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-8'>
                <div>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-slate-700 to-indigo-600 bg-clip-text text-transparent'>Customer Management</h1>
                    <p className='text-slate-500 mt-1'>Manage your shop's customers and their order history.</p>
                </div>
                <button
                    onClick={() => {
                        setFormData({ name: '', email: '', phone: '', password: '', address: { line1: '', line2: '', city: '', province: '', zipcode: '' } })
                        setShowAddModal(true)
                    }}
                    className='bg-black text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-all flex items-center gap-2'
                >
                    <span className='text-xl'>+</span> Add Customer
                </button>
            </div>

            <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
                <div className='p-4 border-b border-slate-100 bg-slate-50/50'>
                    <div className='relative max-w-md'>
                        <input
                            type="text"
                            placeholder='Search by name or email...'
                            className='w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className='w-4 h-4 absolute left-3 top-2.5 text-slate-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full text-left'>
                        <thead className='bg-slate-50'>
                            <tr className='text-slate-500 text-xs font-bold uppercase tracking-wider'>
                                <th className='px-6 py-4'>Customer</th>
                                <th className='px-6 py-4'>Contact Info</th>
                                <th className='px-6 py-4'>Address</th>
                                <th className='px-6 py-4 text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-100'>
                            {filteredCustomers.map((customer) => (
                                <tr key={customer._id} className='hover:bg-slate-50 transition-colors group'>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm'>
                                                {customer.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className='font-bold text-slate-900'>{customer.name}</p>
                                                <p className='text-xs text-slate-500'>ID: {customer._id.slice(-6)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='text-sm'>
                                            <p className='text-slate-700 font-medium'>{customer.email}</p>
                                            <p className='text-slate-500'>{customer.phone || 'No phone'}</p>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='text-sm text-slate-500 max-w-[200px] truncate'>
                                            {customer.address?.line1 ? `${customer.address.line1}, ${customer.address.city}` : 'No address set'}
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <button onClick={() => viewOrders(customer)} className='p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors' title="View Orders">
                                                <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                            </button>
                                            <button onClick={() => handleEdit(customer)} className='p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors' title="Edit Profile">
                                                <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button onClick={() => handleDelete(customer._id)} className='p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors' title="Delete Customer">
                                                <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-fade-in'>
                        <div className='p-6 border-b border-slate-100 flex justify-between items-center'>
                            <h2 className='text-xl font-bold text-slate-900'>Edit Customer</h2>
                            <button onClick={() => setShowEditModal(false)} className='text-slate-400 hover:text-slate-600'>✕</button>
                        </div>
                        <form onSubmit={handleUpdate} className='p-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-slate-500 uppercase'>Name</label>
                                    <input
                                        type="text"
                                        className='w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none'
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-slate-500 uppercase'>Email Or Username</label>
                                    <input
                                        type="email"
                                        className='w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none'
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-slate-500 uppercase'>Phone</label>
                                    <input
                                        type="tel"
                                        className='w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none'
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className='mt-6 border-t border-slate-100 pt-6'>
                                <h3 className='text-sm font-bold text-slate-700 mb-4'>Address Information</h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <input
                                        placeholder='Address Line 1'
                                        className='md:col-span-2 border border-slate-200 rounded-lg px-4 py-2 text-sm'
                                        value={formData.address?.line1}
                                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, line1: e.target.value } })}
                                    />
                                    <input
                                        placeholder='City'
                                        className='border border-slate-200 rounded-lg px-4 py-2 text-sm'
                                        value={formData.address?.city}
                                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                                    />
                                    <input
                                        placeholder='Province'
                                        className='border border-slate-200 rounded-lg px-4 py-2 text-sm'
                                        value={formData.address?.province}
                                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, province: e.target.value } })}
                                    />
                                </div>
                            </div>

                            <div className='mt-8 flex justify-end gap-3'>
                                <button type='button' onClick={() => setShowEditModal(false)} className='px-6 py-2.5 text-sm font-bold text-slate-600 rounded-xl hover:bg-slate-100 transition-all'>Cancel</button>
                                <button type='submit' className='bg-black text-white px-8 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-black/20'>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Modal */}
            {showAddModal && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-fade-in'>
                        <div className='p-6 border-b border-slate-100 flex justify-between items-center'>
                            <h2 className='text-xl font-bold text-slate-900'>Add New Customer</h2>
                            <button onClick={() => setShowAddModal(false)} className='text-slate-400 hover:text-slate-600'>✕</button>
                        </div>
                        <form onSubmit={handleAdd} className='p-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-slate-500 uppercase'>Name</label>
                                    <input
                                        type="text"
                                        className='w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none'
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-slate-500 uppercase'>Email Or Username</label>
                                    <input
                                        type="email"
                                        className='w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none'
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-slate-500 uppercase'>Password</label>
                                    <input
                                        type="password"
                                        className='w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none'
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        minLength={8}
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-slate-500 uppercase'>Phone</label>
                                    <input
                                        type="tel"
                                        className='w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none'
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className='mt-8 flex justify-end gap-3'>
                                <button type='button' onClick={() => setShowAddModal(false)} className='px-6 py-2.5 text-sm font-bold text-slate-600 rounded-xl hover:bg-slate-100 transition-all'>Cancel</button>
                                <button type='submit' className='bg-black text-white px-8 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-black/20'>Register Customer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Orders Modal */}
            {showOrderModal && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in flex flex-col'>
                        <div className='p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50'>
                            <div>
                                <h2 className='text-xl font-bold text-slate-900'>Order History</h2>
                                <p className='text-sm text-slate-500'>Customer: <span className='font-bold text-slate-700'>{selectedCustomer?.name}</span></p>
                            </div>
                            <button onClick={() => setShowOrderModal(false)} className='text-slate-400 hover:text-slate-600 bg-white p-2 rounded-full shadow-sm'>✕</button>
                        </div>
                        <div className='p-6 overflow-y-auto flex-1'>
                            {customerOrders.length === 0 ? (
                                <div className='text-center py-20'>
                                    <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                        <svg className='w-8 h-8 text-slate-300' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                    </div>
                                    <p className='text-slate-500'>This customer hasn't placed any orders yet.</p>
                                </div>
                            ) : (
                                <div className='space-y-6'>
                                    {customerOrders.map((order, idx) => (
                                        <div key={idx} className='border border-slate-100 rounded-2xl p-5 hover:border-indigo-100 transition-all'>
                                            <div className='flex flex-wrap justify-between items-start gap-4 mb-4'>
                                                <div>
                                                    <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Order ID</p>
                                                    <p className='text-sm font-bold text-slate-900'>#{order._id.slice(-8).toUpperCase()}</p>
                                                </div>
                                                <div>
                                                    <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Date</p>
                                                    <p className='text-sm text-slate-700'>{new Date(order.date).toLocaleDateString()}</p>
                                                </div>
                                                <div>
                                                    <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Amount</p>
                                                    <p className='text-sm font-bold text-slate-900'>{currency}{order.amount}</p>
                                                </div>
                                                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {order.status}
                                                </div>
                                            </div>
                                            <div className='space-y-3'>
                                                {order.items.map((item, itemIdx) => (
                                                    <div key={itemIdx} className='flex items-center gap-4 bg-slate-50/50 p-2 rounded-xl'>
                                                        <img src={item.image[0]} className='w-12 h-12 object-cover rounded-lg' alt="" />
                                                        <div className='flex-1'>
                                                            <p className='text-sm font-bold text-slate-800 line-clamp-1'>{item.name}</p>
                                                            <p className='text-xs text-slate-500'>{item.size} × {item.quantity}</p>
                                                        </div>
                                                        <p className='text-sm font-bold text-slate-900'>{currency}{item.price}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='p-6 border-t border-slate-100 bg-slate-50 flex justify-end'>
                            <button onClick={() => setShowOrderModal(false)} className='bg-black text-white px-8 py-2 rounded-xl font-bold hover:bg-slate-800 transition-all'>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Customers
