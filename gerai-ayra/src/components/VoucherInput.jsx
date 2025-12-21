import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const VoucherInput = ({ onVoucherApplied }) => {
    const [voucherCode, setVoucherCode] = useState('')
    const [isApplying, setIsApplying] = useState(false)
    const { backendUrl, getCartAmount } = useContext(ShopContext)

    useEffect(() => {
        const handleApplyVoucherCode = (event) => {
            setVoucherCode(event.detail)
            // Trigger apply after setting the code
            setTimeout(() => {
                handleApplyVoucher(event.detail)
            }, 100)
        }

        window.addEventListener('applyVoucherCode', handleApplyVoucherCode)
        return () => {
            window.removeEventListener('applyVoucherCode', handleApplyVoucherCode)
        }
    }, [])

    const handleApplyVoucher = async (codeToApply = voucherCode) => {
        if (!codeToApply.trim()) {
            toast.error('Please enter a voucher code')
            return
        }

        setIsApplying(true)
        try {
            const cartAmount = getCartAmount()
            const response = await axios.post(backendUrl + '/api/voucher/apply', {
                code: codeToApply,
                cartAmount
            })

            if (response.data.success) {
                toast.success(response.data.message)
                onVoucherApplied(response.data.voucher)
                setVoucherCode('')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to apply voucher')
        } finally {
            setIsApplying(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleApplyVoucher()
        }
    }

    return (
        <div className='mt-4'>
            <p className='text-sm text-gray-600 mb-2'>Have a voucher code?</p>
            <div className='flex gap-2'>
                <input
                    type='text'
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                    placeholder='Enter voucher code'
                    className='flex-1 border border-gray-300 rounded px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500'
                    disabled={isApplying}
                />
                <button
                    onClick={() => handleApplyVoucher()}
                    disabled={isApplying}
                    className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium'
                >
                    {isApplying ? 'Applying...' : 'Apply'}
                </button>
            </div>
        </div>
    )
}

export default VoucherInput
