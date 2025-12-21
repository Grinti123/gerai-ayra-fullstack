import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Stock = ({ token }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [stockValues, setStockValues] = useState({}) // { size: value }

    const LOW_STOCK_THRESHOLD = 5;

    const fetchStockList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/stock/list', { headers: { token } })
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            setLoading(false)
        }
    }

    const handleEditStock = (product) => {
        setEditingProduct(product)
        const initialStock = {}
        product.sizes.forEach(size => {
            initialStock[size] = (product.stock && product.stock[size]) || 0
        })
        setStockValues(initialStock)
        setShowModal(true)
    }

    const handleUpdateStock = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendUrl + '/api/stock/update', {
                productId: editingProduct._id,
                stockData: stockValues
            }, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                setShowModal(false)
                fetchStockList()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchStockList()
    }, [])

    if (loading) return <div className='p-6'>Loading inventory...</div>

    // Calculate alerts
    const lowStockItems = products.filter(p =>
        p.sizes.some(size => (p.stock && p.stock[size] < LOW_STOCK_THRESHOLD) || !p.stock || p.stock[size] === undefined)
    ).length;

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-8'>
                <div>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>Stock Management</h1>
                    <p className='text-slate-500 mt-1'>Monitor and update your product inventory levels.</p>
                </div>
                {lowStockItems > 0 && (
                    <div className='bg-rose-50 border border-rose-200 px-4 py-2 rounded-xl flex items-center gap-3 animate-pulse'>
                        <div className='w-2 h-2 bg-rose-500 rounded-full'></div>
                        <p className='text-rose-700 text-sm font-bold'>{lowStockItems} Products need attention</p>
                    </div>
                )}
            </div>

            <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
                <table className='w-full text-left'>
                    <thead className='bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider'>
                        <tr>
                            <th className='px-6 py-4'>Product</th>
                            <th className='px-6 py-4'>Category</th>
                            <th className='px-6 py-4'>Size & Stock</th>
                            <th className='px-6 py-4 text-right'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-slate-100'>
                        {products.map((product) => {
                            const isOutOfStock = product.sizes.every(s => (product.stock && product.stock[s] === 0) || !product.stock || product.stock[s] === undefined);
                            const hasLowStock = product.sizes.some(s => (product.stock && product.stock[s] < LOW_STOCK_THRESHOLD && product.stock[s] > 0));

                            return (
                                <tr key={product._id} className='hover:bg-slate-50/50 transition-colors group'>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-4'>
                                            <img className='w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-100' src={product.image[0]} alt="" />
                                            <div>
                                                <p className='font-bold text-slate-900'>{product.name}</p>
                                                {isOutOfStock ? (
                                                    <span className='text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-bold uppercase'>Out of Stock</span>
                                                ) : hasLowStock ? (
                                                    <span className='text-[10px] bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-bold uppercase'>Low Stock</span>
                                                ) : (
                                                    <span className='text-[10px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-bold uppercase'>In Stock</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 text-sm text-slate-500 font-medium'>{product.category}</td>
                                    <td className='px-6 py-4'>
                                        <div className='flex flex-wrap gap-2'>
                                            {product.sizes.map(size => {
                                                const qty = (product.stock && product.stock[size]) || 0;
                                                return (
                                                    <div key={size} className={`px-2 py-1 rounded-md text-xs font-bold flex items-center gap-2 border ${qty === 0 ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                        qty < LOW_STOCK_THRESHOLD ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                            'bg-slate-50 text-slate-600 border-slate-100'
                                                        }`}>
                                                        <span className='opacity-50'>{size}:</span>
                                                        <span>{qty}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 text-right'>
                                        <button
                                            onClick={() => handleEditStock(product)}
                                            className='bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-black transition-all shadow-sm active:scale-95'
                                        >
                                            Update Stock
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div className='p-20 text-center text-slate-400 italic'>
                        No products found to manage stock.
                    </div>
                )}
            </div>

            {/* Edit Stock Modal */}
            {showModal && editingProduct && (
                <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fade-in'>
                        <div className='p-6 border-b border-slate-100 flex justify-between items-center'>
                            <div>
                                <h2 className='text-xl font-bold text-slate-900'>Update Stock</h2>
                                <p className='text-xs text-slate-500'>{editingProduct.name}</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className='text-slate-400 hover:text-slate-600 bg-slate-50 p-1 rounded-full'>✕</button>
                        </div>
                        <form onSubmit={handleUpdateStock} className='p-6 space-y-4'>
                            <div className='grid grid-cols-2 gap-4'>
                                {editingProduct.sizes.map(size => (
                                    <div key={size} className='space-y-1'>
                                        <label className='text-[10px] font-bold text-slate-400 uppercase ml-1'>Size {size}</label>
                                        <input
                                            type="number"
                                            min="0"
                                            className='w-full border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-bold'
                                            value={stockValues[size]}
                                            onChange={(e) => setStockValues({ ...stockValues, [size]: e.target.value })}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='pt-6 flex gap-3'>
                                <button type='button' onClick={() => setShowModal(false)} className='flex-1 py-3 text-sm font-bold text-slate-600 rounded-xl hover:bg-slate-100 transition-all'>Cancel</button>
                                <button type='submit' className='flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg'>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Stock
