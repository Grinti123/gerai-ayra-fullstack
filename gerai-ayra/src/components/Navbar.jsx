import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext)

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('item')
        setToken('')
        setCartItems({})
    }

  return (
    <div className="flex items-center justify-between py-4 sm:py-5 font-medium" >

    <Link to="/"><img src={assets.logo} className="w-40 sm:w-48 md:w-60" alt="" /></Link>

    <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to='/' className="flex flex-col items-center gap-1" >
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to='/collection' className="flex flex-col items-center gap-1" >
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to='/about' className="flex flex-col items-center gap-1" >
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to='/contact' className="flex flex-col items-center gap-1" >
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to='/terms-conditions' className="flex flex-col items-center gap-1" >
            <p>TERMS</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
    </ul>
    

    <div className="flex items-center gap-4 sm:gap-6">
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="" />

        <div className="group relative">
            <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className="w-5 cursor-pointer" alt="" />
            {/* Dropdown */}
            {token && 
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-20" >
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg" >
                    <p onClick={() => navigate('/profile')} className="cursor-pointer hover:text-black transition-colors">My Profile</p>
                    <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black transition-colors">Orders</p>
                    <p onClick={logout} className="cursor-pointer hover:text-black transition-colors">Logout</p>
                </div>
            </div>}
        </div>
        <Link to="/cart" className="relative" >
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="" />
    </div>

    {/* Sidebar menu for small screens */}
    
        <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ease-in-out z-30 ${visible ? 'w-4/5 sm:w-2/5' : 'w-0'}`}>
            <div className="flex flex-col text-gray-600 h-full">
                <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-4 cursor-pointer border-b" >
                    <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
                    <p>Back</p>
                </div>
                <NavLink 
                    onClick={() => setVisible(false)} 
                    className="py-4 pl-6 border-b text-lg font-medium" 
                    to='/'
                >
                    HOME
                </NavLink>
                <NavLink 
                    onClick={() => setVisible(false)} 
                    className="py-4 pl-6 border-b text-lg font-medium" 
                    to='/collection'
                >
                    COLLECTION
                </NavLink>
                <NavLink 
                    onClick={() => setVisible(false)} 
                    className="py-4 pl-6 border-b text-lg font-medium" 
                    to='/about'
                >
                    ABOUT
                </NavLink>
                <NavLink 
                    onClick={() => setVisible(false)} 
                    className="py-4 pl-6 border-b text-lg font-medium" 
                    to='/contact'
                >
                    CONTACT
                </NavLink>
                
                {/* Add some spacing at the bottom */}
                <div className="flex-grow"></div>
                
                {/* Close button at the bottom for better UX on mobile */}
                <div 
                    onClick={() => setVisible(false)} 
                    className="py-4 text-center text-gray-500 text-sm border-t cursor-pointer"
                >
                    Close Menu
                </div>
            </div>
        </div>
        
        {/* Overlay for mobile menu */}
        {visible && (
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-20 sm:hidden"
                onClick={() => setVisible(false)}
            ></div>
        )}
    </div>
  )
}

export default Navbar