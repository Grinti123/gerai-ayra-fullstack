import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const VoucherList = ({ onSelectVoucher }) => {
    const [vouchers, setVouchers] = useState([])
    const [showVouchers, setShowVouchers] = useState(false)
    const { backendUrl } = useContext(ShopContext)

    useEffect(() => {
        fetchVouchers()
    }, [])

    const fetchVouchers = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/voucher/list')
            if (response.data.success) {
                setVouchers(response.data.vouchers)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    const handleSelectVoucher = (code) => {
        onSelectVoucher(code)
        setShowVouchers(false)
    }

    if (vouchers.length === 0) return null

    return (
        <div className='mt-4'>
            <button
                onClick={() => setShowVouchers(!showVouchers)}
                className='text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1'
            >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' />
                </svg>
                {showVouchers ? 'Hide' : 'View'} Available Vouchers ({vouchers.length})
            </button>

            {showVouchers && (
                <div className='mt-3 space-y-3 max-h-96 overflow-y-auto'>
                    {vouchers.map((voucher) => (
                        <div
                            key={voucher._id}
                            className='border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer'
                            onClick={() => handleSelectVoucher(voucher.code)}
                        >
                            <div className='flex justify-between items-start mb-2'>
                                <div className='flex-1'>
                                    <div className='flex items-center gap-2 mb-1'>
                                        <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded font-bold text-sm'>
                                            {voucher.code}
                                        </span>
                                        {voucher.discountType === 'percentage' ? (
                                            <span className='text-green-600 font-semibold'>
                                                {voucher.discountValue}% OFF
                                            </span>
                                        ) : (
                                            <span className='text-green-600 font-semibold'>
                                                Rp.{voucher.discountValue} OFF
                                            </span>
                                        )}
                                    </div>
                                    <p className='text-sm text-gray-700'>{voucher.description}</p>
                                </div>
                                <button className='text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1 border border-blue-600 rounded hover:bg-blue-50 transition-colors'>
                                    Use
                                </button>
                            </div>

                            <div className='text-xs text-gray-500 space-y-1 mt-2 pt-2 border-t border-gray-100'>
                                {voucher.minPurchase > 0 && (
                                    <p>• Min. purchase: Rp.{voucher.minPurchase}</p>
                                )}
                                {voucher.maxDiscount && (
                                    <p>• Max. discount: Rp.{voucher.maxDiscount}</p>
                                )}
                                {voucher.usageLimit && (
                                    <p>• {voucher.usageLimit - voucher.usedCount} uses remaining</p>
                                )}
                                <p>• Valid until: {formatDate(voucher.validUntil)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default VoucherList
