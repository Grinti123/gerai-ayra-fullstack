import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = 'Rp.';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({});
    const [wishlistItems, setWishlistItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const [userData, setUserData] = useState({})
    const [shippingMethods, setShippingMethods] = useState([]);
    const [selectedShipping, setSelectedShipping] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();


    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const addToWishlist = async (itemId) => {
        if (!token) {
            toast.error('Please login to add to wishlist');
            return;
        }

        let wishlistData = structuredClone(wishlistItems);
        wishlistData[itemId] = true;
        setWishlistItems(wishlistData);

        try {
            const response = await axios.post(backendUrl + '/api/wishlist/add', { itemId }, { headers: { token } })
            if (response.data.success) {
                toast.success('Added to Wishlist');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const removeFromWishlist = async (itemId) => {
        let wishlistData = structuredClone(wishlistItems);
        delete wishlistData[itemId];
        setWishlistItems(wishlistData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/wishlist/remove', { itemId }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products)
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUserWishlist = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/wishlist/get', {}, { headers: { token } })
            if (response.data.success) {
                setWishlistItems(response.data.wishlistData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUserProfile = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/user/profile', {}, { headers: { token } })
            if (response.data.success) {
                setUserData(response.data.userData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getShippingMethods = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/shipping/list');
            if (response.data.success) {
                const activeMethods = response.data.shippingMethods.filter(m => m.isActive);
                setShippingMethods(activeMethods);
                if (activeMethods.length > 0) {
                    setSelectedShipping(activeMethods[0]);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getPaymentMethods = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/payment/list');
            if (response.data.success) {
                const activeMethods = response.data.paymentMethods.filter(m => m.isActive);
                setPaymentMethods(activeMethods);
                // We won't set a default selected payment here to keep PlaceOrder's initial state if needed
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getCategoriesData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/category/list');
            if (response.data.success) {
                setCategories(response.data.categories.filter(c => c.isActive));
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductsData()
        getShippingMethods()
        getPaymentMethods()
        getCategoriesData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
            getUserProfile(localStorage.getItem('token'))
            getUserWishlist(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        wishlistItems, addToWishlist, removeFromWishlist, getUserWishlist,
        getCartCount, updateQuantity,
        getCartAmount, navigate,
        backendUrl, setToken, token,
        userData, setUserData, getUserProfile,
        shippingMethods, selectedShipping, setSelectedShipping,
        paymentMethods, selectedPayment, setSelectedPayment,
        categories
    }

    return (
        <ShopContext.Provider value={value} >
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;
