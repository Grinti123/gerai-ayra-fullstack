import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const menuItems = [
    {
      path: '/',
      icon: (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'></path>
        </svg>
      ),
      label: 'Dashboard',
      color: 'blue'
    },
    {
      path: '/add',
      icon: <img className='w-5 h-5' src={assets.add_icon} alt="" />,
      label: 'Add Item',
      color: 'green'
    },
    {
      path: '/list',
      icon: (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'></path>
        </svg>
      ),
      label: 'Product List',
      color: 'purple'
    },
    {
      path: '/orders',
      icon: (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'></path>
        </svg>
      ),
      label: 'Orders',
      color: 'orange'
    },
    {
      path: '/reviews',
      icon: (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'></path>
        </svg>
      ),
      label: 'Reviews',
      color: 'amber'
    }
  ]

  return (
    <div className='w-[18%] min-h-screen bg-white border-r-2 border-slate-200 shadow-sm'>
      {/* Header Spacing */}
      <div className='px-6 py-8 border-b border-slate-200'>
      </div>

      {/* Navigation Menu */}
      <div className='px-4 py-6 space-y-2'>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                isActive
                  ? `bg-gradient-to-r from-${item.color}-50 to-${item.color}-100 text-${item.color}-700 shadow-md border border-${item.color}-200`
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator */}
                {isActive && (
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-${item.color}-400 to-${item.color}-600 rounded-r-full`}></div>
                )}

                {/* Icon with colored background when active */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? `bg-${item.color}-100`
                    : 'bg-slate-100 group-hover:bg-slate-200'
                }`}>
                  {React.cloneElement(item.icon, {
                    className: `w-4 h-4 ${
                      isActive
                        ? `text-${item.color}-600`
                        : 'text-slate-600'
                    }`
                  })}
                </div>

                <span className='hidden md:block font-medium text-sm'>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Decorative Element */}
      <div className='px-6 py-4 mt-8'>
        <div className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-3 border border-slate-200'>
          <div className='flex items-center gap-2 text-slate-600'>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z'></path>
            </svg>
            <span className='text-xs font-medium'>Quick Actions</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
