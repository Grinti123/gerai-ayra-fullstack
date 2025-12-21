import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import VoucherInput from './VoucherInput'
import VoucherList from './VoucherList'

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount, selectedShipping } = useContext(ShopContext)
    const [appliedVoucher, setAppliedVoucher] = useState(null)

    const current_shipping_fee = selectedShipping ? selectedShipping.fee : delivery_fee
    const subtotal = getCartAmount()
    const discount = appliedVoucher ? appliedVoucher.discountAmount : 0
    const total = subtotal === 0 ? 0 : subtotal - discount + current_shipping_fee

    const handleVoucherApplied = (voucher) => {
        setAppliedVoucher(voucher)
    }

    const handleRemoveVoucher = () => {
        setAppliedVoucher(null)
    }

    const handleSelectVoucherFromList = (code) => {
        // Trigger the voucher input with the selected code
        const event = new CustomEvent('applyVoucherCode', { detail: code })
        window.dispatchEvent(event)
    }

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {subtotal}.00</p>
                </div>
                <hr />

                {appliedVoucher && (
                    <>
                        <div className='flex justify-between items-center text-green-600'>
                            <div className='flex items-center gap-2'>
                                <p>Discount ({appliedVoucher.code})</p>
                                <button
                                    onClick={handleRemoveVoucher}
                                    className='text-red-500 hover:text-red-700 text-xs'
                                    title='Remove voucher'
                                >
                                    ✕
                                </button>
                            </div>
                            <p>- {currency} {discount}.00</p>
                        </div>
                        <hr />
                    </>
                )}

                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {current_shipping_fee}.00</p>
                </div>
                <hr />

                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency} {total}.00</b>
                </div>
            </div>

            {/* Voucher Section */}
            <div className='mt-6 pt-4 border-t'>
                <VoucherInput onVoucherApplied={handleVoucherApplied} />
                <VoucherList onSelectVoucher={handleSelectVoucherFromList} />
            </div>
        </div>
    )
}

export default CartTotal