import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

const CRM = ({ token }) => {
    const [activeTab, setActiveTab] = useState('leads'); // leads, interactions, analysis
    const [leads, setLeads] = useState([])
    const [interactions, setInteractions] = useState([])
    const [stats, setStats] = useState(null)
    const [topCustomers, setTopCustomers] = useState([])
    const [showLeadModal, setShowLeadModal] = useState(false)
    const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', source: 'Website', status: 'New', notes: '' })

    const fetchCRMData = async () => {
        try {
            const [leadsRes, interactionsRes, statsRes] = await Promise.all([
                axios.get(backendUrl + '/api/crm/leads/list', { headers: { token } }),
                axios.get(backendUrl + '/api/crm/interactions/list', { headers: { token } }),
                axios.get(backendUrl + '/api/crm/stats', { headers: { token } })
            ])

            if (leadsRes.data.success) setLeads(leadsRes.data.leads)
            if (interactionsRes.data.success) setInteractions(interactionsRes.data.interactions)
            if (statsRes.data.success) {
                setStats(statsRes.data.stats)
                setTopCustomers(statsRes.data.topCustomers)
            }
        } catch (error) {
            console.log(error)
            toast.error("Gagal memuat data CRM")
        }
    }

    useEffect(() => {
        fetchCRMData()
    }, [])

    const handleAddLead = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendUrl + '/api/crm/leads/add', leadForm, { headers: { token } })
            if (response.data.success) {
                toast.success("Lead added successfully")
                setShowLeadModal(false)
                setLeadForm({ name: '', email: '', phone: '', source: 'Website', status: 'New', notes: '' })
                fetchCRMData()
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const updateLeadStatus = async (id, newStatus) => {
        try {
            const response = await axios.post(backendUrl + '/api/crm/leads/status', { id, status: newStatus }, { headers: { token } })
            if (response.data.success) {
                toast.success("Status updated")
                fetchCRMData()
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

    return (
        <div className='p-6 max-w-7xl mx-auto space-y-8 animate-fade-in'>
            {/* Header */}
            <div>
                <h1 className='text-3xl font-black bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent'>Customer Relation Management</h1>
                <p className='text-slate-500 mt-1 font-medium'>Kelola prospek, interaksi, dan analisis pelanggan Anda.</p>
            </div>

            {/* Quick Stats */}
            {stats && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div className='bg-white p-5 rounded-2xl border border-slate-100 shadow-sm'>
                        <p className='text-xs font-bold text-slate-400 uppercase'>Total Leads</p>
                        <h3 className='text-2xl font-black text-slate-900 mt-1'>{stats.totalLeads}</h3>
                    </div>
                    <div className='bg-white p-5 rounded-2xl border border-slate-100 shadow-sm'>
                        <p className='text-xs font-bold text-slate-400 uppercase'>New Leads</p>
                        <h3 className='text-2xl font-black text-emerald-600 mt-1'>{stats.newLeads}</h3>
                    </div>
                    <div className='bg-white p-5 rounded-2xl border border-slate-100 shadow-sm'>
                        <p className='text-xs font-bold text-slate-400 uppercase'>Converted</p>
                        <h3 className='text-2xl font-black text-indigo-600 mt-1'>{stats.convertedLeads}</h3>
                    </div>
                    <div className='bg-white p-5 rounded-2xl border border-slate-100 shadow-sm'>
                        <p className='text-xs font-bold text-slate-400 uppercase'>Conversion Rate</p>
                        <h3 className='text-2xl font-black text-slate-900 mt-1'>{stats.conversionRate}%</h3>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className='flex gap-2 border-b border-slate-200 pb-1'>
                {['leads', 'interactions', 'analysis'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Actions */}
            {activeTab === 'leads' && (
                <div className='flex justify-end'>
                    <button onClick={() => setShowLeadModal(true)} className='bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-indigo-700 transition-all'>
                        + Add New Lead
                    </button>
                </div>
            )}

            {/* Tab Panels */}
            {activeTab === 'leads' && (
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Leads List */}
                    <div className='lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
                        <div className='overflow-x-auto'>
                            <table className='w-full text-left border-collapse'>
                                <thead className='bg-slate-50 border-b border-slate-200'>
                                    <tr>
                                        <th className='p-4 text-xs font-bold text-slate-500 uppercase'>Name</th>
                                        <th className='p-4 text-xs font-bold text-slate-500 uppercase'>Contact</th>
                                        <th className='p-4 text-xs font-bold text-slate-500 uppercase'>Source</th>
                                        <th className='p-4 text-xs font-bold text-slate-500 uppercase'>Status</th>
                                        <th className='p-4 text-xs font-bold text-slate-500 uppercase'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-slate-100'>
                                    {leads.map(lead => (
                                        <tr key={lead._id} className='hover:bg-slate-50/50 transition-all'>
                                            <td className='p-4'>
                                                <p className='font-bold text-slate-800'>{lead.name}</p>
                                                <p className='text-xs text-slate-400'>{new Date(lead.createdAt).toLocaleDateString()}</p>
                                            </td>
                                            <td className='p-4 text-sm'>
                                                <p>{lead.email}</p>
                                                <p className='text-slate-400'>{lead.phone}</p>
                                            </td>
                                            <td className='p-4'>
                                                <span className='px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600'>{lead.source}</span>
                                            </td>
                                            <td className='p-4'>
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                                                    className={`px-3 py-1 rounded-lg text-xs font-bold border-none outline-none cursor-pointer ${lead.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                                        lead.status === 'Converted' ? 'bg-emerald-100 text-emerald-700' :
                                                            lead.status === 'Lost' ? 'bg-rose-100 text-rose-700' :
                                                                'bg-amber-100 text-amber-700'
                                                        }`}
                                                >
                                                    <option value="New">New</option>
                                                    <option value="Contacted">Contacted</option>
                                                    <option value="Qualified">Qualified</option>
                                                    <option value="Converted">Converted</option>
                                                    <option value="Lost">Lost</option>
                                                </select>
                                            </td>
                                            <td className='p-4'>
                                                <button className='text-slate-400 hover:text-indigo-600 text-sm font-bold'>Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {leads.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className='p-8 text-center text-slate-400'>No leads found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'interactions' && (
                <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6'>
                    <h3 className='font-bold text-slate-800 mb-6'>Interaction History</h3>
                    <div className='relative border-l-2 border-slate-100 ml-3 space-y-8'>
                        {interactions.map((interaction) => (
                            <div key={interaction._id} className='relative pl-8'>
                                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${interaction.type === 'Call' ? 'bg-blue-500' :
                                    interaction.type === 'Email' ? 'bg-emerald-500' :
                                        'bg-slate-400'
                                    }`}></div>
                                <div className='bg-slate-50 p-4 rounded-xl border border-slate-100'>
                                    <div className='flex justify-between items-start mb-2'>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase text-white ${interaction.type === 'Call' ? 'bg-blue-500' :
                                            interaction.type === 'Email' ? 'bg-emerald-500' :
                                                'bg-slate-400'
                                            }`}>{interaction.type}</span>
                                        <span className='text-xs font-bold text-slate-400'>{new Date(interaction.date).toLocaleString()}</span>
                                    </div>
                                    <p className='text-xs font-bold text-slate-600 uppercase mb-1'>{interaction.referenceType} Ref: {interaction.referenceId.slice(-6)}</p>
                                    <p className='text-sm text-slate-700'>{interaction.notes}</p>
                                </div>
                            </div>
                        ))}
                        {interactions.length === 0 && (
                            <div className='pl-8 text-slate-400 italic'>No interactions logged yet.</div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'analysis' && (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    {/* Top Customers */}
                    <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
                        <h3 className='font-bold text-slate-800 mb-6'>Top Customers by Revenue</h3>
                        <div className='space-y-4'>
                            {topCustomers.map((customer, index) => (
                                <div key={customer._id} className='flex items-center justify-between p-3 bg-slate-50 rounded-xl'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600'>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className='text-sm font-bold text-slate-900'>{customer.name}</p>
                                            <p className='text-xs text-slate-500'>{customer.email}</p>
                                        </div>
                                    </div>
                                    <p className='font-black text-indigo-600'>{currency}{customer.totalSpent.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Placeholder Chart */}
                    <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]'>
                        <div className='text-center'>
                            <p className='text-slate-400 font-bold mb-2'>Lead Source Distribution</p>
                            <div className='w-48 h-48 rounded-full border-8 border-slate-100 flex items-center justify-center'>
                                <span className='text-slate-300 font-bold'>Chart Placeholder</span>
                            </div>
                            <p className='text-xs text-slate-400 mt-4'>Detailed analytics coming soon.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Lead Modal */}
            {/* Add Lead Modal */}
            {showLeadModal && createPortal(
                <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4'>
                    <div className='bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fade-in'>
                        <div className='p-6 border-b border-slate-100 flex justify-between items-center'>
                            <h2 className='text-xl font-bold text-slate-900'>Add New Lead</h2>
                            <button onClick={() => setShowLeadModal(false)} className='text-slate-400 hover:text-slate-600 bg-slate-50 p-1 rounded-full'>✕</button>
                        </div>
                        <form onSubmit={handleAddLead} className='p-6 space-y-4'>
                            <input
                                type="text" placeholder="Full Name" required
                                className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
                                value={leadForm.name} onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                            />
                            <div className='grid grid-cols-2 gap-4'>
                                <input
                                    type="email" placeholder="Email Address" required
                                    className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
                                    value={leadForm.email} onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                                />
                                <input
                                    type="text" placeholder="Phone Number" required
                                    className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
                                    value={leadForm.phone} onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <select
                                    className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white'
                                    value={leadForm.source} onChange={e => setLeadForm({ ...leadForm, source: e.target.value })}
                                >
                                    <option value="Website">Website</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Referral">Referral</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="Other">Other</option>
                                </select>
                                <select
                                    className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white'
                                    value={leadForm.status} onChange={e => setLeadForm({ ...leadForm, status: e.target.value })}
                                >
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Qualified">Qualified</option>
                                    <option value="Converted">Converted</option>
                                    <option value="Lost">Lost</option>
                                </select>
                            </div>
                            <textarea
                                placeholder="Notes (Optional)"
                                className='w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none'
                                rows="3"
                                value={leadForm.notes} onChange={e => setLeadForm({ ...leadForm, notes: e.target.value })}
                            ></textarea>
                            <button type='submit' className='w-full bg-black text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-black/20 hover:bg-slate-800 transition-all'>Save Lead</button>
                        </form>
                    </div>
                </div>, document.body
            )}
        </div>
    )
}

export default CRM
