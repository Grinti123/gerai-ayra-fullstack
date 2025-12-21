import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Users = ({ token }) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [showEditModal, setShowEditModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'user',
        permissions: []
    })

    const roles = ['user', 'admin', 'superadmin']
    const availablePermissions = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'products', label: 'Produk (Tambah/Daftar/Edit)' },
        { id: 'orders', label: 'Pesanan (Status/Daftar)' },
        { id: 'users', label: 'Manajemen Pengguna' },
        { id: 'vouchers', label: 'Voucher & Promo' },
        { id: 'returns', label: 'Pengembalian & Penukaran' },
        { id: 'reviews', label: 'Ulasan Produk' },
        { id: 'settings', label: 'Pengaturan (Pembayaran/Pengiriman)' }
    ]

    const fetchUsers = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/user/list', { headers: { token } })
            if (response.data.success) {
                setUsers(response.data.users)
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

    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) return

        try {
            const response = await axios.post(backendUrl + '/api/user/remove', { id }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                fetchUsers()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleEdit = (user) => {
        setSelectedUser(user)
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            role: user.role || 'user',
            permissions: user.permissions || []
        })
        setShowEditModal(true)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendUrl + '/api/user/update', {
                id: selectedUser._id,
                ...formData
            }, { headers: { token } })

            if (response.data.success) {
                toast.success("Pengguna berhasil diperbarui")
                setShowEditModal(false)
                fetchUsers()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendUrl + '/api/user/add', formData, { headers: { token } })
            if (response.data.success) {
                toast.success("Pengguna berhasil ditambahkan")
                setShowAddModal(false)
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    role: 'user',
                    permissions: []
                })
                fetchUsers()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const togglePermission = (permId) => {
        setFormData(prev => {
            const newPerms = prev.permissions.includes(permId)
                ? prev.permissions.filter(p => p !== permId)
                : [...prev.permissions, permId]
            return { ...prev, permissions: newPerms }
        })
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) return <div className='p-6'>Memuat data pengguna...</div>

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-8'>
                <div>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-slate-700 to-indigo-600 bg-clip-text text-transparent'>Manajemen Pengguna</h1>
                    <p className='text-slate-500 mt-1'>Kelola administrator dan hak akses sistem.</p>
                </div>
                <button
                    onClick={() => {
                        setFormData({ name: '', email: '', phone: '', password: '', role: 'user', permissions: [] })
                        setShowAddModal(true)
                    }}
                    className='bg-black text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-all flex items-center gap-2'
                >
                    <span className='text-xl'>+</span> Tambah Pengguna
                </button>
            </div>

            <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
                <div className='p-4 border-b border-slate-100 bg-slate-50/50'>
                    <div className='relative max-w-md'>
                        <input
                            type="text"
                            placeholder='Cari nama atau email...'
                            className='w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className='w-4 h-4 absolute left-3 top-2.5 text-slate-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full text-left'>
                        <thead className='bg-slate-50'>
                            <tr className='text-slate-500 text-xs font-bold uppercase tracking-wider'>
                                <th className='px-6 py-4'>Pengguna</th>
                                <th className='px-6 py-4'>Kontak</th>
                                <th className='px-6 py-4'>Role</th>
                                <th className='px-6 py-4'>Hak Akses</th>
                                <th className='px-6 py-4 text-center'>Aksi</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-100'>
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className='hover:bg-slate-50 transition-colors group'>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <div className={`w-10 h-10 ${user.role === 'superadmin' ? 'bg-rose-100 text-rose-700' : user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'} rounded-full flex items-center justify-center font-bold text-sm`}>
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className='font-bold text-slate-900'>{user.name}</p>
                                                <p className='text-xs text-slate-500'>ID: {user._id.slice(-6).toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='text-sm'>
                                            <p className='text-slate-700 font-medium'>{user.email}</p>
                                            <p className='text-slate-500'>{user.phone || 'N/A'}</p>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === 'superadmin' ? 'bg-rose-100 text-rose-700' : user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex flex-wrap gap-1 max-w-[200px]'>
                                            {user.permissions && user.permissions.length > 0 ? (
                                                user.permissions.slice(0, 2).map((p, i) => (
                                                    <span key={i} className='bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-medium'>
                                                        {p}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className='text-slate-400 text-xs italic'>None</span>
                                            )}
                                            {user.permissions?.length > 2 && (
                                                <span className='text-slate-400 text-[10px] font-medium'>+{user.permissions.length - 2} more</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 text-center'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <button onClick={() => handleEdit(user)} className='p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors'>
                                                <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button onClick={() => handleDelete(user._id)} className='p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors'>
                                                <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Add/Edit */}
            {(showAddModal || showEditModal) && (
                <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-3xl w-full max-w-2xl shadow-2xl animate-fade-in overflow-hidden'>
                        <div className='p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50'>
                            <h2 className='text-xl font-bold text-slate-900'>{showAddModal ? 'Tambah Pengguna Baru' : 'Edit Pengguna'}</h2>
                            <button onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className='text-slate-400 hover:text-slate-600 bg-white p-2 rounded-full shadow-sm'>✕</button>
                        </div>
                        <form onSubmit={showAddModal ? handleAdd : handleUpdate} className='p-8 space-y-6 max-h-[80vh] overflow-y-auto'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <label className='text-xs font-black text-slate-400 uppercase tracking-widest'>Nama Lengkap</label>
                                    <input
                                        type="text"
                                        className='w-full border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-bold text-sm'
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-xs font-black text-slate-400 uppercase tracking-widest'>Email</label>
                                    <input
                                        type="email"
                                        className='w-full border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-bold text-sm'
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                {showAddModal && (
                                    <div className='space-y-2'>
                                        <label className='text-xs font-black text-slate-400 uppercase tracking-widest'>Password</label>
                                        <input
                                            type="password"
                                            className='w-full border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-bold text-sm'
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                )}
                                <div className='space-y-2'>
                                    <label className='text-xs font-black text-slate-400 uppercase tracking-widest'>Role</label>
                                    <select
                                        className='w-full border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-bold text-sm bg-white'
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    >
                                        {roles.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className='space-y-4'>
                                <label className='text-xs font-black text-slate-400 uppercase tracking-widest'>Hak Akses (Permissions)</label>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                    {availablePermissions.map(perm => (
                                        <div
                                            key={perm.id}
                                            onClick={() => togglePermission(perm.id)}
                                            className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer border-2 transition-all ${formData.permissions.includes(perm.id) ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50 border-transparent hover:border-slate-200 text-slate-600'}`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.permissions.includes(perm.id)}
                                                readOnly
                                                className='accent-indigo-600'
                                            />
                                            <span className='text-xs font-bold'>{perm.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='pt-6 flex justify-end gap-3'>
                                <button type='button' onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className='px-6 py-3 text-sm font-bold text-slate-600 rounded-2xl hover:bg-slate-100 transition-all'>Batal</button>
                                <button type='submit' className='bg-indigo-600 text-white px-10 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100'>
                                    {showAddModal ? 'Daftarkan Pengguna' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Users
