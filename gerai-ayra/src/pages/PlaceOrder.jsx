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
  const {navigate, backendUrl, token, setToken, cartItems, setCartItems, getCartAmount, delivery_fee, products, userData} = useContext(ShopContext);
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

    setFormData(data => ({...data, [name]:value}))
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
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        // API Call for COD
        case 'cod':
            const response = await axios.post(backendUrl + '/api/orders/place', orderData, {headers:{token}})
            console.log(response.data);
            if (response.data.success) {
              setCartItems({})
              navigate('/orders')
            }
            else {
              toast.error(response.data.message)
            }
            break;

        default:
            break;

            case 'online':

            await loadSnapScript();

    const onlineResponse = await axios.post(
        backendUrl + '/api/orders/online', 
        orderData, 
        { headers: { token } }
    );

    if (onlineResponse.data.success) {
        const snapToken = onlineResponse.data.snapToken;

        // Panggil Midtrans Snap di frontend
        window.snap.pay(snapToken, {
            onSuccess: function (result) {
                console.log('Payment Success:', result);
                setCartItems({});
                navigate('/orders');
            },
            onPending: function (result) {
                console.log('Payment Pending:', result);
                toast.info('Payment is pending. Please complete it.');
            },
            onError: function (result) {
                console.error('Payment Error:', result);
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
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t w-full'>
      {/* Left Side */}
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
            <div className='text-xl sm:text-2xl my-3'>
              <Title text1={'DELIVERY'} text2={'INFORMATION'} />
            </div>
            <div className='flex gap-3'>
                <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
                <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
            </div>
            <input required onChange={onChangeHandler} name='email' value={formData.email} className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Adress' />
            <input required onChange={onChangeHandler} name='street' value={formData.street} className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
            <div className='flex gap-3'>
                <input required onChange={onChangeHandler} name='city' value={formData.city} className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                <input required onChange={onChangeHandler} name='state' value={formData.state} className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
            </div>
            <div className='flex gap-3'>
                <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
                <input required onChange={onChangeHandler} name='country' value={formData.country} className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
            </div>
            <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border vorder-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
        </div>

        {/* Right Side */}
        <div className='mt-8 w-full max-w-80'>
          <div className='mt-8'>
              <CartTotal />
          </div>
          <div className='mt-12'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />

            {/* Payment Method Selection */}
            <div className='flex gap-3 flex-col lg:flex-row'>
                <div onClick={() => setMethod('online')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'online' ? 'bg-green-400' : ''}`}></p>
                    <p className='text-gray-500 text-sm font-medium mx-4'>E-WALLET</p> 
                </div>
                <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                    <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p> 
                </div>
            </div>

            <div className='w-full text-end mt-8'>
              <button type='submit' className='bg-black text-white px-16 py-3 text-sm rounded-lg'>PLACE ORDER</button>
            </div>
            <br />
            <div className="flex items-center justify-between gap-4 bg-indigo-600 px-4 py-3 text-white rounded-lg">
  <p className="text-sm font-medium">
    Pembayaran E-Wallet belum bisa digunakan, untuk sementara silahkan menggunakan COD
  </p>

  <button
    aria-label="Dismiss"
    className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </button>
</div>


          </div>
        </div>
    </form>
  )
}


export default PlaceOrder