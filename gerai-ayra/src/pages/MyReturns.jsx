import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const MyReturns = () => {
    const { backendUrl, token, currency } = useContext(ShopContext)
    const [returns, setReturns] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchReturns = async () => {
        try {
            if (!token) return
            const response = await axios.post(backendUrl + '/api/return/user-returns', {}, { headers: { token } })
            if (response.data.success) {
                setReturns(response.data.returns)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReturns()
    }, [token])

    if (loading) return <div className='p-20 text-center'>Loading your requests...</div>

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl mb-8'>
                <Title text1={'MY'} text2={'RETURNS & EXCHANGES'} />
            </div>

            <div className='space-y-6'>
                {returns.map((ret, index) => (
                    <div key={index} className='p-6 border rounded-2xl shadow-sm hover:shadow-md transition-all bg-white flex flex-col md:flex-row gap-6'>
                        <div className='flex-1 space-y-4'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${ret.type === 'Return' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {ret.type}
                                    </span>
                                    <span className='text-slate-400 text-xs'>#{ret.orderId.slice(-6)}</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${ret.status === 'Pending' ? 'bg-amber-100 text-amber-600' :
                                        ret.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' :
                                            ret.status === 'Rejected' ? 'bg-rose-100 text-rose-600' :
                                                'bg-slate-100 text-slate-600'
                                    }`}>
                                    {ret.status}
                                </span>
                            </div>

                            <div>
                                <p className='text-xs font-bold text-slate-400 uppercase'>Reason</p>
                                <p className='text-slate-700'>{ret.reason}</p>
                            </div>

                            {ret.adminComment && (
                                <div className='bg-slate-50 p-4 rounded-xl border-l-4 border-indigo-500'>
                                    <p className='text-xs font-bold text-indigo-500 uppercase'>Admin Note</p>
                                    <p className='text-sm text-slate-600 italic'>{ret.adminComment}</p>
                                </div>
                            )}

                            <div>
                                <p className='text-xs font-bold text-slate-400 uppercase mb-2'>Requested Items</p>
                                <div className='flex flex-wrap gap-4'>
                                    {ret.items.map((item, idx) => (
                                        <div key={idx} className='bg-slate-50 px-3 py-2 rounded-lg text-sm font-medium'>
                                            {item.name} <span className='text-slate-400'>({item.size}) x {item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {ret.images.length > 0 && (
                            <div className='md:w-48 flex gap-2 md:flex-wrap overflow-x-auto'>
                                {ret.images.map((img, idx) => (
                                    <img key={idx} src={img} className='w-20 h-20 object-cover rounded-lg border' alt="" />
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {returns.length === 0 && (
                    <div className='text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200'>
                        <p className='text-slate-400 italic'>You haven't submitted any return or exchange requests yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyReturns
