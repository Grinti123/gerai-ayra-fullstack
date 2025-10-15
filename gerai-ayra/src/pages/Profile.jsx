import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
  const { backendUrl, token, navigate } = useContext(ShopContext)
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

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    getUserData()
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
    return <div className='min-h-screen flex items-center justify-center'>Loading...</div>
  }

  return (
    <div className='min-h-screen pt-20'>
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <div className='text-center py-2'>
          <Title text1={'MY'} text2={'PROFILE'} />
        </div>

        <div className='flex border-b mb-8'>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'profile' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Information
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'orders' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('orders')}
          >
            My Orders
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'password' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h2 className='text-lg font-medium mb-6'>Profile Information</h2>
            <form onSubmit={handleUpdateProfile}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium mb-2'>Full Name</label>
                  <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-full border border-gray-300 rounded px-3 py-2'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2'>Email</label>
                  <input
                    type='email'
                    value={email}
                    disabled
                    className='w-full border border-gray-300 rounded px-3 py-2 bg-gray-50'
                  />
                  <p className='text-xs text-gray-500 mt-1'>Email cannot be changed</p>
                </div>
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium mb-2'>Phone</label>
                  <input
                    type='tel'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className='w-full border border-gray-300 rounded px-3 py-2'
                  />
                </div>
              </div>

              <h3 className='text-lg font-medium mt-8 mb-4'>Shipping Address</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium mb-2'>Address Line 1</label>
                  <input
                    type='text'
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    className='w-full border border-gray-300 rounded px-3 py-2'
                  />
                </div>
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium mb-2'>Address Line 2 (Optional)</label>
                  <input
                    type='text'
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    className='w-full border border-gray-300 rounded px-3 py-2'
                    placeholder='Apartment, suite, unit, building, floor, etc.'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2'>City</label>
                  <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className='w-full border border-gray-300 rounded px-3 py-2'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2'>Province/State</label>
                  <input
                    type='text'
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className='w-full border border-gray-300 rounded px-3 py-2'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2'>Zip Code</label>
                  <input
                    type='text'
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    className='w-full border border-gray-300 rounded px-3 py-2'
                  />
                </div>
              </div>

              <div className='mt-8'>
                <button
                  type='submit'
                  className='bg-black text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors'
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'password' && (
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h2 className='text-lg font-medium mb-6'>Change Password</h2>
            <form onSubmit={handleChangePassword}>
              <div className='max-w-md space-y-4'>
                <div>
                  <label className='block text-sm font-medium mb-2'>Current Password</label>
                  <input
                    type='password'
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className='w-full border border-gray-300 rounded px-3 py-2'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2'>New Password</label>
                  <input
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='w-full border border-gray-300 rounded px-3 py-2'
                    minLength={6}
                    required
                  />
                  <p className='text-xs text-gray-500 mt-1'>At least 6 characters</p>
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2'>Confirm New Password</label>
                  <input
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='w-full border border-gray-300 rounded px-3 py-2'
                    minLength={6}
                    required
                  />
                </div>
              </div>

              <div className='mt-6'>
                <button
                  type='submit'
                  className='bg-black text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors'
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h2 className='text-lg font-medium mb-6'>My Orders</h2>
            <div className='flex flex-col items-center justify-center py-12'>
              <img src={assets.order_icon} alt='orders' className='w-16 h-16 mb-4 opacity-60' />
              <p className='text-gray-500 mb-4'>Order history will be available soon</p>
              <button
                onClick={() => navigate('/collection')}
                className='bg-black text-white px-6 py-2 text-sm hover:bg-gray-800'
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
