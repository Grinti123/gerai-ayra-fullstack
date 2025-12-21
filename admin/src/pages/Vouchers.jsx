import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Vouchers = ({ token }) => {
    const [vouchers, setVouchers] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)

    const [formData, setFormData] = useState({
        code: '',
        description: '',
        discountType: 'percentage',
        discountValue: '',
        minPurchase: 0,
        maxDiscount: '',
        usageLimit: '',
        validFrom: '',
        validUntil: '',
        isActive: true
    })

    // Format date for input field (YYYY-MM-DD)
    const formatDateForInput = (dateString) => {
        if (!dateString) return ''
        return new Date(dateString).toISOString().split('T')[0]
    }

    const fetchVouchers = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/voucher/all', { headers: { token } })
            if (response.data.success) {
                setVouchers(response.data.vouchers)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const resetForm = () => {
        setFormData({
            code: '',
            description: '',
            discountType: 'percentage',
            discountValue: '',
            minPurchase: 0,
            maxDiscount: '',
            usageLimit: '',
            validFrom: '',
            validUntil: '',
            isActive: true
        })
        setEditingId(null)
        setShowForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingId
                ? `${backendUrl}/api/voucher/update`
                : `${backendUrl}/api/voucher/create`

            const payload = {
                ...formData,
                id: editingId // Include ID if updating
            }

            // Clean up optional fields
            if (!payload.maxDiscount) delete payload.maxDiscount
            if (!payload.usageLimit) delete payload.usageLimit

            const response = await axios.post(url, payload, { headers: { token } })

            if (response.data.success) {
                toast.success(editingId ? 'Voucher updated' : 'Voucher created')
                fetchVouchers()
                resetForm()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message || 'An error occurred')
        }
    }

    const handleEdit = (voucher) => {
        setFormData({
            code: voucher.code,
            description: voucher.description,
            discountType: voucher.discountType,
            discountValue: voucher.discountValue,
            minPurchase: voucher.minPurchase,
            maxDiscount: voucher.maxDiscount || '',
            usageLimit: voucher.usageLimit || '',
            validFrom: formatDateForInput(voucher.validFrom),
            validUntil: formatDateForInput(voucher.validUntil),
            isActive: voucher.isActive
        })
        setEditingId(voucher._id)
        setShowForm(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this voucher?')) return

        try {
            const response = await axios.post(backendUrl + '/api/voucher/delete', { id }, { headers: { token } })
            if (response.data.success) {
                toast.success('Voucher deleted')
                fetchVouchers()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchVouchers()
    }, [])

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-8'>
                <h1 className='bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent text-3xl font-bold'>Voucher Management</h1>
                <button
                    onClick={() => {
                        if (showForm) resetForm()
                        else setShowForm(true)
                    }}
                    className={`px-6 py-2 rounded-lg font-medium shadow-md transition-all ${showForm
                            ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            : 'bg-pink-600 text-white hover:bg-pink-700 hover:shadow-lg'
                        }`}
                >
                    {showForm ? 'Cancel' : 'Add Voucher'}
                </button>
            </div>

            {showForm && (
                <div className='bg-white p-6 rounded-xl shadow-md border border-slate-200 mb-8 animate-fade-in'>
                    <h2 className='text-xl font-semibold mb-6 text-slate-800'>{editingId ? 'Edit Voucher' : 'New Voucher'}</h2>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium mb-1 text-slate-700'>Voucher Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleInputChange}
                                    className='w-full border-2 border-slate-200 rounded-lg px-4 py-2 focus:border-pink-500 focus:outline-none uppercase'
                                    required
                                    placeholder="e.g. SUMMER2024"
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-1 text-slate-700'>Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className='w-full border-2 border-slate-200 rounded-lg px-4 py-2 focus:border-pink-500 focus:outline-none'
                                    required
                                    placeholder="e.g. 10% off for summer sale"
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium mb-1 text-slate-700'>Discount Type</label>
                                    <select
                                        name="discountType"
                                        value={formData.discountType}
                                        onChange={handleInputChange}
                                        className='w-full border-2 border-slate-200 rounded-lg px-4 py-2 focus:border-pink-500 focus:outline-none'
                                    >
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed Amount ({currency})</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='block text-sm font-medium mb-1 text-slate-700'>Value</label>
                                    <input
                                        type="number"
                                        name="discountValue"
                                        value={formData.discountValue}
                                        onChange={handleInputChange}
                                        className='w-full border-2 border-slate-200 rounded-lg px-4 py-2 focus:border-pink-500 focus:outline-none'
                                        required
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='space-y-4'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium mb-1 text-slate-700'>Min Purchase</label>
                                    <input
                                        type="number"
                                        name="minPurchase"
                                        value={formData.minPurchase}
                                        onChange={handleInputChange}
                                        className='w-full border-2 border-slate-200 rounded-lg px-4 py-2 focus:border-pink-500 focus:outline-none'
                                        min="0"
                                    />
                                </div>
                                {formData.discountType === 'percentage' && (
                                    <div>
                                        <label className='block text-sm font-medium mb-1 text-slate-700'>Max Discount</label>
                                        <input
                                            type="number"
                                            name="maxDiscount"
                                            value={formData.maxDiscount}
                                            onChange={handleInputChange}
                                            className='w-full border-2 border-slate-200 rounded-lg px-4 py-2 focus:border-pink-500 focus:outline-none'
                                            min="0"
                                            placeholder="Optional"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium mb-1 text-slate-700'>Valid From</label>
                                    <input
                                        type="date"
                                        name="validFrom"
                                        value={formData.validFrom}
                                        onChange={handleInputChange}
                                        className='w-full border-2 border-slate-200 rounded-lg px-4 py-2 focus:border-pink-500 focus:outline-none'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium mb-1 text-slate-700'>Valid Until</label>
                                    <input
                                        type="date"
                                        name="validUntil"
                                        value={formData.validUntil}
                                        onChange={handleInputChange}
                                        className='w-full border-2 border-slate-200 rounded-lg px-4 py-2 focus:border-pink-500 focus:outline-none'
                                        required
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium mb-1 text-slate-700'>Usage Limit</label>
                                    <input
                                        type="number"
                                        name="usageLimit"
                                        value={formData.usageLimit}
                                        onChange={handleInputChange}
                                        className='w-full border-2 border-slate-200 rounded-lg px-4 py-2 focus:border-pink-500 focus:outline-none'
                                        min="0"
                                        placeholder="Optional (Unlimited)"
                                    />
                                </div>
                                <div className='flex items-center h-full pt-6'>
                                    <label className='flex items-center cursor-pointer'>
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            checked={formData.isActive}
                                            onChange={handleInputChange}
                                            className='w-5 h-5 text-pink-600 border-2 border-slate-300 rounded focus:ring-pink-500 mr-2'
                                        />
                                        <span className='font-medium text-slate-700'>Is Active</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='md:col-span-2 flex justify-end gap-3 mt-4'>
                            <button
                                type="button"
                                onClick={resetForm}
                                className='px-6 py-2 border-2 border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors'
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className='px-6 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg hover:from-pink-700 hover:to-rose-700 font-medium shadow-md transition-all'
                            >
                                {editingId ? 'Update Voucher' : 'Create Voucher'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className='bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/50 overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>Code</th>
                                <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>Discount</th>
                                <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>Validity</th>
                                <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>Usage</th>
                                <th className='px-6 py-4 text-center text-sm font-semibold text-slate-700'>Status</th>
                                <th className='px-6 py-4 text-center text-sm font-semibold text-slate-700'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-100'>
                            {vouchers.map((item) => (
                                <tr key={item._id} className='hover:bg-slate-50/50 transition-colors'>
                                    <td className='px-6 py-4'>
                                        <div className='font-bold text-slate-800'>{item.code}</div>
                                        <div className='text-xs text-slate-500'>{item.description}</div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='font-medium text-pink-600'>
                                            {item.discountType === 'percentage' ? `${item.discountValue}% Off` : `${currency}${item.discountValue} Off`}
                                        </div>
                                        {item.minPurchase > 0 && (
                                            <div className='text-xs text-slate-500'>Min: {currency}{item.minPurchase}</div>
                                        )}
                                    </td>
                                    <td className='px-6 py-4 text-sm text-slate-600'>
                                        <div>{new Date(item.validFrom).toLocaleDateString()}</div>
                                        <div className='text-xs text-slate-400'>to</div>
                                        <div>{new Date(item.validUntil).toLocaleDateString()}</div>
                                    </td>
                                    <td className='px-6 py-4 text-sm text-slate-600'>
                                        <div>Used: {item.usedCount}</div>
                                        {item.usageLimit && (
                                            <div className='text-xs text-slate-400'>Limit: {item.usageLimit}</div>
                                        )}
                                    </td>
                                    <td className='px-6 py-4 text-center'>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.isActive && new Date(item.validUntil) >= new Date()
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-slate-100 text-slate-500'
                                            }`}>
                                            {item.isActive && new Date(item.validUntil) >= new Date() ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex justify-center gap-2'>
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                                                title="Edit"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                                                title="Delete"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {vouchers.length === 0 && (
                                <tr>
                                    <td colSpan="6" className='px-6 py-12 text-center text-slate-500'>
                                        No vouchers found. Create your first voucher!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Vouchers
