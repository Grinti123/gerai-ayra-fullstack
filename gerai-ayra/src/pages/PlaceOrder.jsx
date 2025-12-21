import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { snap } from 'midtrans-client'

const loadSnapScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'; // Gunakan URL Production jika diperlukan
    script.setAttribute('data-client-key', 'SB-Mid-client-5F2mNU-sibYhmrUq'); // Ganti dengan Client Key Anda
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};


const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, setToken, cartItems, setCartItems, getCartAmount, delivery_fee, products, userData, shippingMethods, selectedShipping, setSelectedShipping, paymentMethods, selectedPayment, setSelectedPayment, currency } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  useEffect(() => {
    if (token && userData) {
      // Pre-fill form with user profile data
      setFormData({
        firstName: userData.name ? userData.name.split(' ')[0] || '' : '',
        lastName: userData.name ? userData.name.split(' ').slice(1).join(' ') || '' : '',
        email: userData.email || '',
        phone: userData.phone || '',
        street: userData.address ? userData.address.line1 || '' : '',
        city: userData.address ? userData.address.city || '' : '',
        state: userData.address ? userData.address.province || '' : '',
        zipcode: userData.address ? userData.address.zipcode || '' : '',
        country: userData.address ? userData.address.country || 'Indonesia' : 'Indonesia',
      })
    }
  }, [token, userData])

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {

      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + (selectedShipping ? selectedShipping.fee : delivery_fee),
        shippingMethod: selectedShipping ? selectedShipping.name : 'Standard'
      }

      const selectedMethodObj = paymentMethods.find(m => m.name === method) || { type: method }; // Fallback for hardcoded initial state

      switch (selectedMethodObj.type) {
        // API Call for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/orders/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          }
          else {
            toast.error(response.data.message)
          }
          break;

        case 'automatic':
          await loadSnapScript();
          const onlineResponse = await axios.post(
            backendUrl + '/api/orders/online',
            orderData,
            { headers: { token } }
          );

          if (onlineResponse.data.success) {
            const snapToken = onlineResponse.data.snapToken;
            window.snap.pay(snapToken, {
              onSuccess: function (result) {
                setCartItems({});
                navigate('/orders');
              },
              onPending: function (result) {
                toast.info('Payment is pending. Please complete it.');
              },
              onError: function (result) {
                toast.error('Payment failed. Try again.');
              },
              onClose: function () {
                toast.warning('Payment popup closed.');
              },
            });
          } else {
            toast.error(onlineResponse.data.message);
          }
          break;

        default:
          // Manual transfer logic (for now just place order as 'Manual' and maybe show instructions)
          const manualResponse = await axios.post(backendUrl + '/api/orders/place', { ...orderData, paymentMethod: method }, { headers: { token } })
          if (manualResponse.data.success) {
            setCartItems({})
            navigate('/orders')
            toast.success("Order placed. Please follow payment instructions.")
          } else {
            toast.error(manualResponse.data.message)
          }
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row justify-between gap-10 pt-5 sm:pt-14 min-h-[80vh] border-t w-full bg-slate-50/30 px-4 sm:px-0'>

      {/* --- LEFT SIDE: Delivery Info --- */}
      <div className='flex flex-col gap-6 w-full lg:max-w-[500px]'>
        <div className='bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm'>
          <div className='text-xl sm:text-2xl mb-6'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          <div className='space-y-4 font-inter'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <label className='text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1'>First Name</label>
                <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-slate-200 rounded-xl py-2.5 px-4 w-full focus:ring-2 focus:ring-black/5 outline-none transition-all' type="text" />
              </div>
              <div className='space-y-1'>
                <label className='text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1'>Last Name</label>
                <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-slate-200 rounded-xl py-2.5 px-4 w-full focus:ring-2 focus:ring-black/5 outline-none transition-all' type="text" />
              </div>
            </div>

            <div className='space-y-1'>
              <label className='text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1'>Email Address</label>
              <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-slate-200 rounded-xl py-2.5 px-4 w-full focus:ring-2 focus:ring-black/5 outline-none transition-all' type="email" />
            </div>

            <div className='space-y-1'>
              <label className='text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1'>Street / Address</label>
              <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-slate-200 rounded-xl py-2.5 px-4 w-full focus:ring-2 focus:ring-black/5 outline-none transition-all' type="text" />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <label className='text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1'>City</label>
                <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-slate-200 rounded-xl py-2.5 px-4 w-full focus:ring-2 focus:ring-black/5 outline-none transition-all' type="text" />
              </div>
              <div className='space-y-1'>
                <label className='text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1'>Province / State</label>
                <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-slate-200 rounded-xl py-2.5 px-4 w-full focus:ring-2 focus:ring-black/5 outline-none transition-all' type="text" />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <label className='text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1'>Zipcode</label>
                <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-slate-200 rounded-xl py-2.5 px-4 w-full focus:ring-2 focus:ring-black/5 outline-none transition-all' type="number" />
              </div>
              <div className='space-y-1'>
                <label className='text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1'>Country</label>
                <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-slate-200 rounded-xl py-2.5 px-4 w-full focus:ring-2 focus:ring-black/5 outline-none transition-all' type="text" />
              </div>
            </div>

            <div className='space-y-1'>
              <label className='text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1'>Phone Number</label>
              <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-slate-200 rounded-xl py-2.5 px-4 w-full focus:ring-2 focus:ring-black/5 outline-none transition-all' type="number" />
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: Order Summary & Selection --- */}
      <div className='flex flex-col gap-6 flex-1'>

        {/* Order Summary & Shipping Combined Card */}
        <div className='bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm'>
          <div className='text-xl sm:text-2xl mb-8'>
            <Title text1={'ORDER'} text2={'SUMMARY'} />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div>
              <CartTotal />
            </div>

            <div className='space-y-6'>
              <h3 className='text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2'>
                <svg className='w-4 h-4 text-orange-600' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                Select Shipping
              </h3>

              <div className='flex flex-col gap-3'>
                {shippingMethods.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => setSelectedShipping(item)}
                    className={`group flex items-center gap-4 border-2 p-4 rounded-2xl cursor-pointer transition-all ${selectedShipping?._id === item._id ? 'border-black bg-slate-50' : 'border-slate-100 hover:border-slate-300'}`}
                  >
                    <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all ${selectedShipping?._id === item._id ? 'border-black' : 'border-slate-200 group-hover:border-slate-400'}`}>
                      {selectedShipping?._id === item._id && <div className='w-2.5 h-2.5 bg-black rounded-full'></div>}
                    </div>
                    <div className='flex-1'>
                      <p className='text-slate-900 text-sm font-bold'>{item.name}</p>
                      <p className='text-slate-500 text-[10px] font-medium uppercase tracking-tighter'>{item.estimatedDays || 'Regular Delivery'}</p>
                    </div>
                    <p className='text-slate-900 text-sm font-black'>{currency}{item.fee}</p>
                  </div>
                ))}
                {shippingMethods.length === 0 && (
                  <div className='p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 italic text-slate-400 text-sm'>
                    Loading delivery options...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Action Card */}
        <div className='bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm'>
          <div className='text-xl sm:text-2xl mb-8'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start'>
            <div className='flex flex-col gap-3'>
              {paymentMethods.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setMethod(item.name)}
                  className={`group flex items-center gap-4 border-2 p-4 rounded-2xl cursor-pointer transition-all ${method === item.name ? 'border-black bg-slate-50 shadow-inner' : 'border-slate-100 hover:border-slate-300'}`}
                >
                  <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all ${method === item.name ? 'border-black' : 'border-slate-200 group-hover:border-slate-400'}`}>
                    {method === item.name && <div className='w-2.5 h-2.5 bg-black rounded-full'></div>}
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.type === 'manual' ? 'bg-amber-50 text-amber-600' :
                        item.type === 'automatic' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                      <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className='text-slate-900 text-sm font-bold'>{item.name}</p>
                      <p className='text-slate-500 text-[10px] font-medium'>{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}

              {paymentMethods.length === 0 && (
                <>
                  {/* Default fallback if no payment methods in DB */}
                  <div onClick={() => setMethod('online')} className={`group flex items-center gap-4 border-2 p-4 rounded-2xl cursor-pointer transition-all ${method === 'online' ? 'border-black bg-slate-50 shadow-inner' : 'border-slate-100 hover:border-slate-300'}`}>
                    <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all ${method === 'online' ? 'border-black' : 'border-slate-200 group-hover:border-slate-400'}`}>
                      {method === 'online' && <div className='w-2.5 h-2.5 bg-black rounded-full'></div>}
                    </div>
                    <p className='text-slate-900 text-sm font-bold'>E-WALLET & VA</p>
                  </div>
                  <div onClick={() => setMethod('cod')} className={`group flex items-center gap-4 border-2 p-4 rounded-2xl cursor-pointer transition-all ${method === 'cod' ? 'border-black bg-slate-50 shadow-inner' : 'border-slate-100 hover:border-slate-300'}`}>
                    <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all ${method === 'cod' ? 'border-black' : 'border-slate-200 group-hover:border-slate-400'}`}>
                      {method === 'cod' && <div className='w-2.5 h-2.5 bg-black rounded-full'></div>}
                    </div>
                    <p className='text-slate-900 text-sm font-bold'>CASH ON DELIVERY</p>
                  </div>
                </>
              )}
            </div>

            <div className='flex flex-col justify-end h-full'>
          

              <button type='submit' className='w-full bg-black text-white px-10 py-4 text-sm font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3'>
                PLACE ORDER
                <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder