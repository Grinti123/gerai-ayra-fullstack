import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/category/list')
      if (response.data.success) {
        setCategories(response.data.categories)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products);
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const startEdit = (product) => {
    setEditingProduct(product._id)
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      gender: product.gender,
      category: product.category,
      sizes: product.sizes.join(', '),
      bestseller: product.bestseller || false
    })
  }

  const toggleBestseller = async (productId, currentStatus) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/update', {
        id: productId,
        bestseller: !currentStatus
      }, { headers: { token } })

      if (response.data.success) {
        toast.success(`Product ${!currentStatus ? 'marked as' : 'removed from'} bestseller`)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'Failed to update bestseller status')
    }
  }

  const cancelEdit = () => {
    setEditingProduct(null)
    setEditForm({})
  }

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }))
  }

  const saveEdit = async () => {
    try {
      const sizesArray = editForm.sizes.split(',').map(size => size.trim()).filter(size => size)

      const response = await axios.post(backendUrl + '/api/product/update', {
        id: editingProduct,
        ...editForm,
        sizes: sizesArray
      }, { headers: { token } })

      if (response.data.success) {
        toast.success('Product updated successfully')
        setEditingProduct(null)
        setEditForm({})
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'Failed to update product')
    }
  }

  useEffect(() => {
    fetchList()
    fetchCategories()
  }, [])

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent text-3xl font-bold'>Products Management</h1>
        <div className='bg-slate-100 px-4 py-2 rounded-full text-sm font-medium text-slate-600 shadow-sm'>
          Total: {list.length} products
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/50 overflow-hidden'>
        {/* Mobile View */}
        <div className='md:hidden'>
          {list.map((item, index) => (
            <div key={index} className='border-b border-slate-200 p-6 hover:bg-slate-50/50 transition-colors'>
              {editingProduct === item._id ? (
                <div className='space-y-4 animate-fade-in'>
                  <div>
                    <label className='block text-sm font-medium mb-2 text-slate-700'>Name</label>
                    <input
                      type='text'
                      value={editForm.name || ''}
                      onChange={(e) => handleEditChange('name', e.target.value)}
                      className='w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-blue-400 focus:outline-none transition-colors'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2 text-slate-700'>Price</label>
                    <input
                      type='number'
                      value={editForm.price || ''}
                      onChange={(e) => handleEditChange('price', e.target.value)}
                      className='w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-blue-400 focus:outline-none transition-colors'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2 text-slate-700'>Gender</label>
                    <select
                      value={editForm.gender || ''}
                      onChange={(e) => handleEditChange('gender', e.target.value)}
                      className='w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-blue-400 focus:outline-none transition-colors'
                    >
                      <option value="Men">Pria</option>
                      <option value="Women">Wanita</option>
                      <option value="Kids">Anak</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2 text-slate-700'>Category</label>
                    <select
                      value={editForm.category || ''}
                      onChange={(e) => handleEditChange('category', e.target.value)}
                      className='w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-blue-400 focus:outline-none transition-colors'
                    >
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                      ))}
                      {categories.length === 0 && (
                        <option value={editForm.category}>{editForm.category}</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2 text-slate-700'>Sizes</label>
                    <input
                      type='text'
                      value={editForm.sizes || ''}
                      onChange={(e) => handleEditChange('sizes', e.target.value)}
                      placeholder='S, M, L, XL'
                      className='w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-blue-400 focus:outline-none transition-colors'
                    />
                  </div>
                  <div className='flex items-center gap-3'>
                    <input
                      type='checkbox'
                      id={`bestseller-mobile-${item._id}`}
                      checked={editForm.bestseller || false}
                      onChange={(e) => handleEditChange('bestseller', e.target.checked)}
                      className='w-5 h-5 text-blue-600 bg-slate-100 border-2 border-slate-300 rounded focus:ring-blue-500 transition-colors'
                    />
                    <label htmlFor={`bestseller-mobile-${item._id}`} className='text-sm font-medium text-slate-700'>
                      Mark as Bestseller
                    </label>
                  </div>
                  <div className='flex justify-end gap-3 pt-4'>
                    <button
                      onClick={cancelEdit}
                      className='px-6 py-3 text-sm border-2 border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors'
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEdit}
                      className='px-6 py-3 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-medium shadow-lg hover:shadow-xl transition-all duration-200'
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className='flex gap-6 transition-transform hover:scale-[1.01]'>
                  <img className='w-20 h-20 object-cover rounded-xl shadow-sm' src={item.image && item.image.length > 0 ? item.image[0] : 'https://via.placeholder.com/100x100?text=No+Img'} alt="" />
                  <div className='flex-1'>
                    <h3 className='font-semibold text-slate-800 text-lg'>{item.name}</h3>
                    <p className='text-sm text-slate-500 mb-2'>{item.gender} • {item.category}</p>
                    <p className='text-lg font-bold text-emerald-600'>{currency}{item.price}</p>
                    <div className='flex flex-wrap gap-2 mt-3'>
                      {item.sizes.map((size, sizeIndex) => (
                        <span key={sizeIndex} className='bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium'>
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3 mb-2'>
                      <input
                        type='checkbox'
                        id={`bestseller-${item._id}`}
                        checked={item.bestseller || false}
                        onChange={() => toggleBestseller(item._id, item.bestseller)}
                        className='w-5 h-5 text-emerald-600 bg-slate-100 border-2 border-slate-300 rounded focus:ring-emerald-500 transition-colors'
                      />
                      <label htmlFor={`bestseller-${item._id}`} className='text-sm font-medium text-slate-700'>
                        Bestseller
                      </label>
                    </div>
                    <button
                      onClick={() => startEdit(item)}
                      className='px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-medium shadow-md hover:shadow-lg transition-all duration-200'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeProduct(item._id)}
                      className='px-4 py-2 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 font-medium shadow-md hover:shadow-lg transition-all duration-200'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className='hidden md:block'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='px-4 py-3 text-left text-sm font-medium'>Image</th>
                  <th className='px-4 py-3 text-left text-sm font-medium'>Product Details</th>
                  <th className='px-4 py-3 text-left text-sm font-medium'>Category</th>
                  <th className='px-4 py-3 text-left text-sm font-medium'>Price</th>
                  <th className='px-4 py-3 text-left text-sm font-medium'>Sizes</th>
                  <th className='px-4 py-3 text-center text-sm font-medium'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={index} className='border-t hover:bg-gray-50'>
                    {editingProduct === item._id ? (
                      <>
                        <td className='px-4 py-3'>
                          <img className='w-12 h-12 object-cover rounded' src={item.image && item.image.length > 0 ? item.image[0] : 'https://via.placeholder.com/50x50?text=No+Img'} alt="" />
                        </td>
                        <td className='px-4 py-3'>
                          <input
                            type='text'
                            value={editForm.name || ''}
                            onChange={(e) => handleEditChange('name', e.target.value)}
                            className='w-full border border-gray-300 rounded px-2 py-1 text-sm'
                            placeholder='Product name'
                          />
                          <textarea
                            value={editForm.description || ''}
                            onChange={(e) => handleEditChange('description', e.target.value)}
                            className='w-full border border-gray-300 rounded px-2 py-1 mt-2 text-sm'
                            rows='2'
                            placeholder='Description'
                          />
                        </td>
                        <td className='px-4 py-3'>
                          <select
                            value={editForm.gender || ''}
                            onChange={(e) => handleEditChange('gender', e.target.value)}
                            className='w-full border border-gray-300 rounded px-2 py-1 text-sm'
                          >
                            <option value="Men">Pria</option>
                            <option value="Women">Wanita</option>
                            <option value="Kids">Anak</option>
                          </select>
                          <select
                            value={editForm.category || ''}
                            onChange={(e) => handleEditChange('category', e.target.value)}
                            className='w-full border border-gray-300 rounded px-2 py-1 mt-1 text-sm'
                          >
                            {categories.map((cat) => (
                              <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}
                            {categories.length === 0 && (
                              <option value={editForm.category}>{editForm.category}</option>
                            )}
                          </select>
                        </td>
                        <td className='px-4 py-3'>
                          <input
                            type='number'
                            value={editForm.price || ''}
                            onChange={(e) => handleEditChange('price', e.target.value)}
                            className='w-full border border-gray-300 rounded px-2 py-1 text-sm'
                            placeholder='Price'
                          />
                        </td>
                        <td className='px-4 py-3'>
                          <input
                            type='text'
                            value={editForm.sizes || ''}
                            onChange={(e) => handleEditChange('sizes', e.target.value)}
                            className='w-full border border-gray-300 rounded px-2 py-1 text-sm'
                            placeholder='S, M, L, XL'
                          />
                          <div className='flex items-center gap-2 mt-2'>
                            <input
                              type='checkbox'
                              id={`bestseller-edit-${item._id}`}
                              checked={editForm.bestseller || false}
                              onChange={(e) => handleEditChange('bestseller', e.target.checked)}
                              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                            />
                            <label htmlFor={`bestseller-edit-${item._id}`} className='text-xs text-gray-600'>
                              Bestseller
                            </label>
                          </div>
                        </td>
                        <td className='px-4 py-3 text-center'>
                          <div className='flex justify-center gap-2'>
                            <button
                              onClick={cancelEdit}
                              className='px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600'
                            >
                              Cancel
                            </button>
                            <button
                              onClick={saveEdit}
                              className='px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800'
                            >
                              Save
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className='px-4 py-3'>
                          <img className='w-12 h-12 object-cover rounded' src={item.image && item.image.length > 0 ? item.image[0] : 'https://via.placeholder.com/50x50?text=No+Img'} alt="" />
                        </td>
                        <td className='px-4 py-3'>
                          <div className='flex items-center gap-3'>
                            <div>
                              <p className='font-medium'>{item.name}</p>
                              <p className='text-sm text-gray-500 truncate max-w-32'>{item.description}</p>
                            </div>
                            {item.bestseller && (
                              <span className='bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium'>
                                ⭐ Bestseller
                              </span>
                            )}
                          </div>
                        </td>
                        <td className='px-4 py-3'>
                          <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium'>
                            {item.gender}
                          </span>
                          {item.category && (
                            <div className='text-xs text-gray-500 mt-1'>{item.category}</div>
                          )}
                        </td>
                        <td className='px-4 py-3 font-medium'>{currency}{item.price}</td>
                        <td className='px-4 py-3'>
                          <div className='flex flex-wrap gap-1'>
                            {item.sizes.slice(0, 3).map((size, sizeIndex) => (
                              <span key={sizeIndex} className='bg-gray-100 px-2 py-1 rounded text-xs'>
                                {size}
                              </span>
                            ))}
                            {item.sizes.length > 3 && (
                              <span className='bg-gray-100 px-2 py-1 rounded text-xs'>
                                +{item.sizes.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className='px-4 py-3'>
                          <div className='flex justify-center gap-2'>
                            <div className='flex items-center gap-2'>
                              <input
                                type='checkbox'
                                id={`bestseller-${item._id}`}
                                checked={item.bestseller || false}
                                onChange={() => toggleBestseller(item._id, item.bestseller)}
                                className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500'
                              />
                              <label htmlFor={`bestseller-${item._id}`} className='text-xs text-gray-600'>
                                Bestseller
                              </label>
                            </div>
                            <button
                              onClick={() => startEdit(item)}
                              className='px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => removeProduct(item._id)}
                              className='px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {list.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-500'>No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default List
