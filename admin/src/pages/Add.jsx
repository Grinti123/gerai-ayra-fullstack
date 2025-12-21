import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [gender, setGender] = useState('Men')
  const [category, setCategory] = useState('')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [categories, setCategories] = useState([])

  // Category CRUD states
  const [showCatModal, setShowCatModal] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [loadingCat, setLoadingCat] = useState(false)

  const fetchCategories = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/category/list')
      if (response.data.success) {
        setCategories(response.data.categories)
        if (response.data.categories.length > 0 && !category) {
          setCategory(response.data.categories[0].name)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName) return toast.error("Kategori name is required");
    setLoadingCat(true);
    try {
      const response = await axios.post(backendUrl + '/api/category/add', { name: newCatName }, { headers: { token } });
      if (response.data.success) {
        toast.success("Category added");
        setNewCatName('');
        fetchCategories();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingCat(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await axios.post(backendUrl + '/api/category/remove', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success("Category removed");
        fetchCategories();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCategories()
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("gender", gender)
      formData.append("category", category)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setBestseller(false)
        setSizes([])
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div className='relative'>
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 bg-white p-8 rounded-2xl shadow-sm border border-slate-100'>
        <div>
          <p className='mb-3 font-bold text-slate-700 uppercase text-xs tracking-wider'>Upload Gambar Produk</p>

          <div className='flex gap-3'>
            {[image1, image2, image3, image4].map((img, index) => (
              <label key={index} htmlFor={`image${index + 1}`} className='group relative'>
                <img className='w-24 h-24 object-cover rounded-xl border-2 border-dashed border-slate-200 group-hover:border-black transition-all cursor-pointer' src={!img ? assets.upload_area : URL.createObjectURL(img)} alt="" />
                <input onChange={(e) => [setImage1, setImage2, setImage3, setImage4][index](e.target.files[0])} type="file" id={`image${index + 1}`} hidden />
              </label>
            ))}
          </div>
        </div>

        <div className='w-full max-w-[500px]'>
          <p className='mb-2 font-bold text-slate-700 uppercase text-xs tracking-wider'>Nama Produk</p>
          <input onChange={(e) => setName(e.target.value)} value={name} className='w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-black transition-all' type="text" placeholder='Contoh: Kaos Oversize Premium' required />
        </div>

        <div className='w-full max-w-[500px]'>
          <p className='mb-2 font-bold text-slate-700 uppercase text-xs tracking-wider'>Deskripsi Produk</p>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-black transition-all min-h-[100px]' type="text" placeholder='Tulis deskripsi produk di sini...' required />
        </div>

        <div className='flex flex-col sm:flex-row gap-4 w-full sm:gap-8'>
          <div className='flex-1'>
            <p className='mb-2 font-bold text-slate-700 uppercase text-xs tracking-wider'>Gender</p>
            <select onChange={(e) => setGender(e.target.value)} value={gender} className='w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-black cursor-pointer appearance-none bg-white'>
              <option value="Men">Laki-laki</option>
              <option value="Women">Wanita</option>
              <option value="Kids">Anak-anak</option>
            </select>
          </div>

          <div className='flex-1'>
            <div className='flex justify-between items-center mb-2'>
              <p className='font-bold text-slate-700 uppercase text-xs tracking-wider'>Kategori</p>
              <button type='button' onClick={() => setShowCatModal(true)} className='text-[10px] font-bold bg-slate-100 px-2 py-1 rounded-md hover:bg-black hover:text-white transition-all'>Kelola Kategori</button>
            </div>
            <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-black cursor-pointer appearance-none bg-white font-medium'>
              {categories.map((item) => (
                <option key={item._id} value={item.name}>{item.name}</option>
              ))}
              {categories.length === 0 && <option value="">Belum ada kategori</option>}
            </select>
          </div>

          <div className='flex-1'>
            <p className='mb-2 font-bold text-slate-700 uppercase text-xs tracking-wider'>Harga Produk</p>
            <div className='relative'>
              <span className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold'>Rp</span>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-black transition-all font-bold' type="number" placeholder='0' required />
            </div>
          </div>
        </div>

        <div>
          <p className='mb-3 font-bold text-slate-700 uppercase text-xs tracking-wider'>Ukuran Tersedia</p>
          <div className='flex gap-3'>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
                <p className={`${sizes.includes(size) ? "bg-black text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"} px-5 py-2 rounded-xl cursor-pointer font-bold transition-all text-sm`}>{size}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='flex items-center gap-3 mt-4 bg-slate-50 p-4 rounded-2xl w-full max-w-[500px] border border-slate-100'>
          <input className='w-5 h-5 accent-black cursor-pointer' onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
          <label className='cursor-pointer font-bold text-slate-700 text-sm' htmlFor="bestseller">Tandai sebagai Best Seller</label>
        </div>

        <button type='submit' className='w-full sm:w-48 py-4 mt-6 bg-black text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95'>TAMBAH PRODUK</button>
      </form>

      {/* Category Management Modal */}
      {showCatModal && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-fade-in overflow-hidden'>
            <div className='p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50'>
              <h2 className='text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Kelola Kategori</h2>
              <button onClick={() => setShowCatModal(false)} className='text-slate-400 hover:text-slate-600 bg-white p-2 rounded-full shadow-sm'>✕</button>
            </div>

            <div className='p-6 space-y-6'>
              <form onSubmit={handleAddCategory} className='space-y-4'>
                <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Tambah Kategori Baru</p>
                <div className='flex gap-2'>
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className='flex-1 border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-bold text-sm'
                    placeholder='Nama Kategori'
                  />
                  <button disabled={loadingCat} type='submit' className='bg-indigo-600 text-white px-6 rounded-2xl font-bold text-sm hover:bg-indigo-700 disabled:opacity-50'>
                    {loadingCat ? '...' : 'ADD'}
                  </button>
                </div>
              </form>

              <div className='space-y-3'>
                <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Daftar Kategori</p>
                <div className='max-h-[300px] overflow-y-auto pr-2 space-y-2'>
                  {categories.map((cat) => (
                    <div key={cat._id} className='flex items-center justify-between p-3 bg-slate-50 rounded-2xl group hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 transition-all'>
                      <div className='flex items-center gap-3'>
                        <span className='font-bold text-slate-700 text-sm ml-2'>{cat.name}</span>
                      </div>
                      <button onClick={() => handleDeleteCategory(cat._id)} className='text-rose-500 hover:bg-rose-50 p-2 rounded-xl transition-all opacity-0 group-hover:opacity-100'>
                        <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  ))}
                  {categories.length === 0 && <p className='text-center text-slate-400 italic text-sm py-4'>Tidak ada kategori</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Add