import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const Returns = ({ token }) => {
    const [returns, setReturns] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [selectedReturn, setSelectedReturn] = useState(null)
    const [status, setStatus] = useState('')
    const [adminComment, setAdminComment] = useState('')

    const fetchReturns = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/return/list', { headers: { token } })
            if (response.data.success) {
                setReturns(response.data.returns)
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

    const handleUpdateStatus = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/return/update-status', {
                returnId: selectedReturn._id,
                status,
                adminComment
            }, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                setShowModal(false)
                fetchReturns()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const openModal = (ret) => {
        setSelectedReturn(ret)
        setStatus(ret.status)
        setAdminComment(ret.adminComment || '')
        setShowModal(true)
    }

    useEffect(() => {
        fetchReturns()
    }, [])

    if (loading) return <div className='p-6'>Loading requests...</div>

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-8'>
                <div>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent'>Returns & Exchanges</h1>
                    <p className='text-slate-500 mt-1'>Manage customer return and exchange requests.</p>
                </div>
            </div>

            <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
                <table className='w-full text-left'>
                    <thead className='bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider'>
                        <tr>
                            <th className='px-6 py-4'>Order ID</th>
                            <th className='px-6 py-4'>Type</th>
                            <th className='px-6 py-4'>Reason</th>
                            <th className='px-6 py-4'>Status</th>
                            <th className='px-6 py-4'>Date</th>
                            <th className='px-6 py-4 text-right'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-slate-100'>
                        {returns.map((ret) => (
                            <tr key={ret._id} className='hover:bg-slate-50/50 transition-colors group'>
                                <td className='px-6 py-4 font-medium text-slate-900'>#{ret.orderId.slice(-6)}</td>
                                <td className='px-6 py-4'>
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${ret.type === 'Return' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {ret.type}
                                    </span>
                                </td>
                                <td className='px-6 py-4 text-sm text-slate-500 max-w-xs truncate'>{ret.reason}</td>
                                <td className='px-6 py-4'>
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${ret.status === 'Pending' ? 'bg-amber-100 text-amber-600' :
                                            ret.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' :
                                                ret.status === 'Rejected' ? 'bg-rose-100 text-rose-600' :
                                                    'bg-slate-100 text-slate-600'
                                        }`}>
                                        {ret.status}
                                    </span>
                                </td>
                                <td className='px-6 py-4 text-sm text-slate-500'>{new Date(ret.date).toLocaleDateString()}</td>
                                <td className='px-6 py-4 text-right'>
                                    <button onClick={() => openModal(ret)} className='text-indigo-600 hover:text-indigo-900 font-bold text-sm'>
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {returns.length === 0 && (
                    <div className='p-20 text-center text-slate-400 italic'>No requests found.</div>
                )}
            </div>

            {/* Details Modal */}
            {showModal && selectedReturn && (
                <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-fade-in flex flex-col max-h-[90vh]'>
                        <div className='p-6 border-b border-slate-100 flex justify-between items-center shrink-0'>
                            <h2 className='text-xl font-bold text-slate-900'>Request Details</h2>
                            <button onClick={() => setShowModal(false)} className='text-slate-400 hover:text-slate-600 bg-slate-50 p-1 rounded-full'>✕</button>
                        </div>
                        <div className='p-6 overflow-y-auto space-y-6'>
                            <div className='grid grid-cols-2 gap-6'>
                                <div>
                                    <p className='text-[10px] font-bold text-slate-400 uppercase'>Order ID</p>
                                    <p className='font-bold text-slate-900'>#{selectedReturn.orderId}</p>
                                </div>
                                <div>
                                    <p className='text-[10px] font-bold text-slate-400 uppercase'>Type</p>
                                    <p className='font-bold text-slate-900'>{selectedReturn.type}</p>
                                </div>
                                <div className='col-span-2'>
                                    <p className='text-[10px] font-bold text-slate-400 uppercase'>Reason</p>
                                    <p className='text-slate-700 bg-slate-50 p-3 rounded-xl mt-1'>{selectedReturn.reason}</p>
                                </div>
                            </div>

                            <div>
                                <p className='text-[10px] font-bold text-slate-400 uppercase mb-2'>Items</p>
                                <div className='space-y-2'>
                                    {selectedReturn.items.map((item, idx) => (
                                        <div key={idx} className='flex items-center gap-3 bg-slate-50 p-2 rounded-lg'>
                                            <p className='flex-1 font-medium text-slate-800'>{item.name}</p>
                                            <p className='text-slate-500'>{item.size} x {item.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {selectedReturn.images.length > 0 && (
                                <div>
                                    <p className='text-[10px] font-bold text-slate-400 uppercase mb-2'>Images</p>
                                    <div className='flex gap-2 overflow-x-auto pb-2'>
                                        {selectedReturn.images.map((img, idx) => (
                                            <img key={idx} src={img} className='w-24 h-24 object-cover rounded-xl border border-slate-200' alt="" />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className='pt-4 border-t border-slate-100 space-y-4'>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-slate-500 uppercase'>Update Status</label>
                                    <select value={status} onChange={(e) => setStatus(e.target.value)} className='w-full border border-slate-200 rounded-xl px-4 py-2.5'>
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Received">Received</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-slate-500 uppercase'>Admin Comment</label>
                                    <textarea value={adminComment} onChange={(e) => setAdminComment(e.target.value)} className='w-full border border-slate-200 rounded-xl px-4 py-2.5 min-h-[80px]' placeholder='Add a note for the customer...' />
                                </div>
                                <button onClick={handleUpdateStatus} className='w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all'>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Returns
