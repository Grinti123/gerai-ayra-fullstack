import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext)

  const [orderData, setorderData] = useState([])
  const [showReturnModal, setShowReturnModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [returnType, setReturnType] = useState('Return')
  const [reason, setReason] = useState('')
  const [images, setImages] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/orders/userorders', {}, { headers: { token } })

      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['orderId'] = order._id
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleReturnSubmit = async (e) => {
    e.preventDefault()
    if (!reason) return toast.error("Please provide a reason")

    try {
      const formData = new FormData()
      formData.append('orderId', selectedItem.orderId)
      formData.append('items', JSON.stringify([{
        name: selectedItem.name,
        size: selectedItem.size,
        quantity: selectedItem.quantity,
        price: selectedItem.price
      }]))
      formData.append('type', returnType)
      formData.append('reason', reason)

      Array.from(images).forEach(img => {
        formData.append('images', img)
      })

      const response = await axios.post(backendUrl + '/api/return/apply', formData, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        setShowReturnModal(false)
        setReason('')
        setImages([])
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div className=''>
        {
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className={`min-w-2 h-2 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-orange-500'}`}></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <div className='flex gap-2'>
                  <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                  {item.status === 'Delivered' && (
                    <button
                      onClick={() => { setSelectedItem(item); setShowReturnModal(true); }}
                      className='border px-4 py-2 text-sm font-medium rounded-sm bg-black text-white'
                    >
                      Return/Exchange
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {/* Return Modal */}
      {showReturnModal && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-fade-in flex flex-col max-h-[90vh]'>
            <div className='p-6 border-b border-slate-100 flex justify-between items-center'>
              <h2 className='text-xl font-bold text-slate-900'>Return / Exchange Request</h2>
              <button onClick={() => setShowReturnModal(false)} className='text-slate-400 hover:text-slate-600 bg-slate-50 p-1 rounded-full'>✕</button>
            </div>
            <form onSubmit={handleReturnSubmit} className='p-6 space-y-5 overflow-y-auto font-black'>
              <div>
                <p className='text-xs font-bold text-slate-500 uppercase mb-2'>Item</p>
                <p className='font-medium'>{selectedItem.name} ({selectedItem.size})</p>
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-bold text-slate-500 uppercase'>Request Type</label>
                <div className='flex gap-4'>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input type="radio" name="type" value="Return" checked={returnType === 'Return'} onChange={(e) => setReturnType(e.target.value)} />
                    <span>Return (Refund)</span>
                  </label>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input type="radio" name="type" value="Exchange" checked={returnType === 'Exchange'} onChange={(e) => setReturnType(e.target.value)} />
                    <span>Exchange</span>
                  </label>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-bold text-slate-500 uppercase'>Reason</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className='w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-black min-h-[100px]'
                  placeholder='Why are you returning this item?'
                  required
                />
              </div>

              <div className='space-y-2'>
                <label className='text-xs font-bold text-slate-500 uppercase'>Proof Images (Max 5)</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setImages(e.target.files)}
                  className='w-full text-sm'
                  accept="image/*"
                />
              </div>

              <button type='submit' className='w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl'>
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders