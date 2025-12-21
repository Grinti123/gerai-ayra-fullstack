 import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
  const { backendUrl, token, navigate, currency } = useContext(ShopContext)
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('profile')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [orderData, setOrderData] = useState([])

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    getUserData()
    loadOrderData()
  }, [token, navigate])

  const getUserData = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/user/profile', {}, { headers: { token } })
      if (response.data.success) {
        setUserData(response.data.userData)
        setName(response.data.userData.name)
        setEmail(response.data.userData.email)
        setPhone(response.data.userData.phone || '')
        if (response.data.userData.address) {
          setAddress1(response.data.userData.address.line1 || '')
          setAddress2(response.data.userData.address.line2 || '')
          setCity(response.data.userData.address.city || '')
          setProvince(response.data.userData.address.province || '')
          setZipcode(response.data.userData.address.zipcode || '')
        }
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to load user data')
      setLoading(false)
    }
  }

  const loadOrderData = async () => {
    try {
      if (!token) return

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
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(backendUrl + '/api/user/update-profile', {
        name,
        phone,
        address: {
          line1: address1,
          line2: address2,
          city,
          province,
          zipcode
        }
      }, { headers: { token } })

      if (response.data.success) {
        toast.success('Profile updated successfully!')
        getUserData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to update profile')
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    try {
      const response = await axios.post(backendUrl + '/api/user/change-password', {
        currentPassword,
        newPassword
      }, { headers: { token } })

      if (response.data.success) {
        toast.success('Password changed successfully!')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Failed to change password')
    }
  }

  if (loading) {
    return <div className='min-h-screen flex items-center justify-center text-accent-600 font-medium'>
      <div className='animate-pulse'>Loading Profile...</div>
    </div>
  }

  return (
    <div className='min-h-screen pt-20 bg-gray-50/30'>
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <div className='text-left mb-10'>
          <Title text1={'MY'} text2={'PROFILE'} />
          <p className='text-gray-500 mt-2'>Manage your account settings and view your order history.</p>
        </div>

        <div className='flex flex-wrap gap-2 mb-8 bg-gray-100 p-1 rounded-xl w-fit'>
          <button
            className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === 'profile' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Info
          </button>
          <button
            className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === 'orders' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </button>
          <button
            className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === 'password' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('password')}
          >
            Password
          </button>
        </div>

        <div className='transition-all duration-300'>
          {activeTab === 'profile' && (
            <div className='bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100'>
              <div className='flex items-center gap-4 mb-8'>
                <div className='w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center overflow-hidden'>
                  <img src={assets.profile_icon} className='w-8' alt='' />
                </div>
                <div>
                  <h2 className='text-xl font-bold text-gray-900'>{name}</h2>
                  <p className='text-gray-500 text-sm'>{email}</p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider'>Full Name</label>
                    <input
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider'>Email Address</label>
                    <input
                      type='email'
                      value={email}
                      disabled
                      className='w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed'
                    />
                  </div>
                  <div className='md:col-span-2 space-y-2'>
                    <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider'>Phone Number</label>
                    <input
                      type='tel'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='e.g. 08123456789'
                      className='w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all'
                    />
                  </div>
                </div>

                <div className='mt-10 border-t border-gray-100 pt-8'>
                  <h3 className='text-lg font-bold text-gray-900 mb-6'>Shipping Address</h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='md:col-span-2 space-y-2'>
                      <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider'>Address Line 1</label>
                      <input
                        type='text'
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                        placeholder='Street name, building number'
                        className='w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all'
                      />
                    </div>
                    <div className='md:col-span-2 space-y-2'>
                      <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider'>Address Line 2 (Optional)</label>
                      <input
                        type='text'
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                        placeholder='Apartment, suite, unit, floor, etc.'
                        className='w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all'
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider'>City</label>
                      <input
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className='w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all'
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider'>Province</label>
                      <input
                        type='text'
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className='w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all'
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider'>Zip Code</label>
                      <input
                        type='text'
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        className='w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all'
                      />
                    </div>
                  </div>
                </div>

                <div className='mt-10'>
                  <button
                    type='submit'
                    className='bg-black text-white px-10 py-3.5 text-sm font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-black/20'
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'password' && (
            <div className='bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100'>
              <h2 className='text-xl font-bold text-gray-900 mb-2'>Security Settings</h2>
              <p className='text-gray-500 text-sm mb-8'>Update your password to keep your account secure.</p>

              <form onSubmit={handleChangePassword}>
                <div className='max-w-md space-y-6'>
                  <div className='space-y-2'>
                    <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider'>Current Password</label>
                    <input
                      type='password'
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className='w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider'>New Password</label>
                    <input
                      type='password'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className='w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all'
                      minLength={6}
                      required
                    />
                    <p className='text-[10px] text-gray-400'>Minimum 6 characters recommended.</p>
                  </div>
                  <div className='space-y-2'>
                    <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider'>Confirm New Password</label>
                    <input
                      type='password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className='w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all'
                      minLength={6}
                      required
                    />
                  </div>
                </div>

                <div className='mt-10'>
                  <button
                    type='submit'
                    className='bg-black text-white px-10 py-3.5 text-sm font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-black/20'
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className='bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100'>
              <h2 className='text-xl font-bold text-gray-900 mb-6'>Recent Orders</h2>
              {orderData.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-16 text-center'>
                  <div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6'>
                    <img src={assets.order_icon} alt='orders' className='w-10 opacity-20' />
                  </div>
                  <p className='text-gray-900 font-medium mb-2'>No orders yet</p>
                  <p className='text-gray-500 text-sm mb-8 max-w-xs'>Looks like you haven't placed any orders. Start exploring our collection!</p>
                  <button
                    onClick={() => navigate('/collection')}
                    className='bg-black text-white px-8 py-3 text-sm font-bold rounded-xl hover:bg-gray-800 transition-all'
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                <div className='space-y-6'>
                  {orderData.map((item, index) => (
                    <div key={index} className='p-4 border border-gray-100 rounded-2xl hover:border-accent-200 transition-all group'>
                      <div className='flex flex-col sm:flex-row gap-4 sm:items-center justify-between'>
                        <div className='flex items-center gap-4'>
                          <img src={item.image[0]} className='w-20 h-24 object-cover rounded-lg' alt="" />
                          <div>
                            <p className='font-bold text-gray-900 line-clamp-1'>{item.name}</p>
                            <div className='flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500'>
                              <p className='font-semibold text-accent-700'>{currency}{item.price}</p>
                              <p>Qty: {item.quantity}</p>
                              <p>Size: <span className='text-gray-900 font-medium'>{item.size}</span></p>
                            </div>
                            <p className='text-[11px] text-gray-400 mt-2 uppercase tracking-tight'>
                              Ordered on {new Date(item.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <div className='flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 sm:gap-3 border-t sm:border-t-0 pt-4 sm:pt-0'>
                          <div className='flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full'>
                            <p className={`w-2 h-2 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-orange-400'}`}></p>
                            <p className='text-xs font-bold text-gray-700 uppercase tracking-wide'>{item.status}</p>
                          </div>
                          <button
                            onClick={loadOrderData}
                            className='text-xs font-bold text-accent-600 hover:text-accent-700 transition-colors uppercase tracking-widest bg-accent-50 px-4 py-2 rounded-lg'
                          >
                            Track status
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
