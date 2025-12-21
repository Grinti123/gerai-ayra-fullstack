import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Settings = ({ token }) => {
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [logo, setLogo] = useState(null)
    const [favicon, setFavicon] = useState(null)
    const [settings, setSettings] = useState({
        siteName: '',
        siteDescription: '',
        contactEmail: '',
        contactPhone: '',
        address: '',
        facebook: '',
        instagram: '',
        whatsapp: '',
        footerText: ''
    })

    const fetchSettings = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/setting/get')
            if (response.data.success) {
                const s = response.data.settings
                setSettings({
                    siteName: s.siteName || '',
                    siteDescription: s.siteDescription || '',
                    contactEmail: s.contactEmail || '',
                    contactPhone: s.contactPhone || '',
                    address: s.address || '',
                    facebook: s.socialLinks?.facebook || '',
                    instagram: s.socialLinks?.instagram || '',
                    whatsapp: s.socialLinks?.whatsapp || '',
                    footerText: s.footerText || '',
                    logoUrl: s.logo || '',
                    faviconUrl: s.favicon || ''
                })
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error("Gagal memuat pengaturan")
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUpdating(true)
        try {
            const formData = new FormData()
            formData.append('siteName', settings.siteName)
            formData.append('siteDescription', settings.siteDescription)
            formData.append('contactEmail', settings.contactEmail)
            formData.append('contactPhone', settings.contactPhone)
            formData.append('address', settings.address)
            formData.append('facebook', settings.facebook)
            formData.append('instagram', settings.instagram)
            formData.append('whatsapp', settings.whatsapp)
            formData.append('footerText', settings.footerText)

            if (logo) formData.append('logo', logo)
            if (favicon) formData.append('favicon', favicon)

            const response = await axios.post(backendUrl + '/api/setting/update', formData, { headers: { token } })

            if (response.data.success) {
                toast.success("Pengaturan berhasil disimpan")
                fetchSettings()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setUpdating(false)
        }
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    if (loading) return <div className='p-6'>Memuat pengaturan...</div>

    return (
        <div className='p-6 max-w-5xl mx-auto'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-slate-700 to-indigo-600 bg-clip-text text-transparent'>Pengaturan Website</h1>
                <p className='text-slate-500 mt-1'>Kelola identitas visual dan informasi kontak toko Anda.</p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-8'>
                {/* Visual Identity Section */}
                <div className='bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden'>
                    <div className='p-6 border-b border-slate-100 bg-slate-50/50'>
                        <h2 className='text-lg font-bold text-slate-800 flex items-center gap-2'>
                            <svg className='w-5 h-5 text-indigo-500' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Identitas Visual
                        </h2>
                    </div>
                    <div className='p-8 grid grid-cols-1 md:grid-cols-2 gap-10'>
                        <div className='space-y-4'>
                            <label className='text-xs font-black text-slate-400 uppercase tracking-widest'>Logo Website</label>
                            <div className='flex items-center gap-6'>
                                <div className='flex-shrink-0'>
                                    {logo ? (
                                        <img src={URL.createObjectURL(logo)} className='w-32 h-32 object-contain border-2 border-dashed border-indigo-200 rounded-2xl p-2' alt="Logo Preview" />
                                    ) : settings.logoUrl ? (
                                        <img src={settings.logoUrl} className='w-32 h-32 object-contain border-2 border-slate-100 rounded-2xl p-2' alt="Site Logo" />
                                    ) : (
                                        <div className='w-32 h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-xs text-center px-4'>No Logo</div>
                                    )}
                                </div>
                                <label className='cursor-pointer bg-white border-2 border-slate-200 px-4 py-2 rounded-xl text-sm font-bold hover:border-indigo-500 hover:text-indigo-600 transition-all'>
                                    Ganti Logo
                                    <input type="file" hidden accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />
                                </label>
                            </div>
                        </div>

                        <div className='space-y-4'>
                            <label className='text-xs font-black text-slate-400 uppercase tracking-widest'>Favicon (Icon Browser)</label>
                            <div className='flex items-center gap-6'>
                                <div className='flex-shrink-0'>
                                    {favicon ? (
                                        <img src={URL.createObjectURL(favicon)} className='w-16 h-16 object-contain border-2 border-dashed border-indigo-200 rounded-2xl p-2' alt="Favicon Preview" />
                                    ) : settings.faviconUrl ? (
                                        <img src={settings.faviconUrl} className='w-16 h-16 object-contain border-2 border-slate-100 rounded-2xl p-2' alt="Site Favicon" />
                                    ) : (
                                        <div className='w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-[10px] text-center px-2'>No Icon</div>
                                    )}
                                </div>
                                <label className='cursor-pointer bg-white border-2 border-slate-200 px-4 py-2 rounded-xl text-sm font-bold hover:border-indigo-500 hover:text-indigo-600 transition-all'>
                                    Ganti Favicon
                                    <input type="file" hidden accept="image/*" onChange={(e) => setFavicon(e.target.files[0])} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* General Settings Section */}
                <div className='bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden'>
                    <div className='p-6 border-b border-slate-100 bg-slate-50/50'>
                        <h2 className='text-lg font-bold text-slate-800 flex items-center gap-2'>
                            <svg className='w-5 h-5 text-indigo-500' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Pengaturan Umum
                        </h2>
                    </div>
                    <div className='p-8 space-y-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <label className='text-xs font-black text-slate-400 uppercase tracking-widest'>Nama Situs</label>
                                <input
                                    type="text"
                                    className='w-full border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-bold text-sm'
                                    value={settings.siteName}
                                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                    placeholder='Contoh: Gerai Ayra'
                                />
                            </div>
                            <div className='space-y-2 text-slate-700'>
                                <label className='text-xs font-black text-slate-400 uppercase tracking-widest'>Tagline / Deskripsi Singkat</label>
                                <input
                                    type="text"
                                    className='w-full border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-bold text-sm'
                                    value={settings.siteDescription}
                                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                                    placeholder='Contoh: Fashion Muslimah Modern'
                                />
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <label className='text-xs font-black text-slate-400 uppercase tracking-widest'>Footer Copyright Text</label>
                            <input
                                type="text"
                                className='w-full border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-bold text-sm'
                                value={settings.footerText}
                                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information Section */}
                <div className='bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden'>
                    <div className='p-6 border-b border-slate-100 bg-slate-50/50'>
                        <h2 className='text-lg font-bold text-slate-800 flex items-center gap-2'>
                            <svg className='w-5 h-5 text-indigo-500' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            Informasi Kontak & Sosial
                        </h2>
                    </div>
                    <div className='p-8 space-y-8'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <label className='text-xs font-black text-slate-400 uppercase tracking-widest'>Email Kontak</label>
                                <input
                                    type="email"
                                    className='w-full border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-bold text-sm'
                                    value={settings.contactEmail}
                                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-xs font-black text-slate-400 uppercase tracking-widest'>Nomor Telepon / WhatsApp (Admin)</label>
                                <input
                                    type="tel"
                                    className='w-full border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-bold text-sm'
                                    value={settings.contactPhone}
                                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <label className='text-xs font-black text-slate-400 uppercase tracking-widest'>Alamat Fisik Toko</label>
                            <textarea
                                rows="3"
                                className='w-full border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-bold text-sm resize-none'
                                value={settings.address}
                                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                            />
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4'>
                            <div className='space-y-2'>
                                <label className='text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1'>Facebook URL</label>
                                <input
                                    type="text"
                                    className='w-full border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-bold text-sm'
                                    value={settings.facebook}
                                    onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1'>Instagram URL</label>
                                <input
                                    type="text"
                                    className='w-full border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-bold text-sm'
                                    value={settings.instagram}
                                    onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1'>WhatsApp Link</label>
                                <input
                                    type="text"
                                    className='w-full border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-bold text-sm'
                                    value={settings.whatsapp}
                                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-end pt-4 mb-20'>
                    <button
                        type='submit'
                        disabled={updating}
                        className={`bg-black text-white px-12 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-slate-200 hover:shadow-indigo-100 flex items-center gap-3 ${updating ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
                    >
                        {updating ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Menyimpan...
                            </>
                        ) : 'Simpan Semua Pengaturan'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Settings
