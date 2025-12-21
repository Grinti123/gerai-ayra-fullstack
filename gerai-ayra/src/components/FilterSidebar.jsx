import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const FilterSidebar = ({
    showFilter,
    setShowFilter,
    gender,
    category,
    toggleGender,
    toggleCategory,
    clearFilters
}) => {
    const { categories: dynamicCategories } = useContext(ShopContext);

    const genders = [
        { value: 'Men', label: 'Laki-laki' },
        { value: 'Women', label: 'Wanita' },
        { value: 'Kids', label: 'Anak' }
    ];

    const categories = dynamicCategories.length > 0
        ? dynamicCategories.map(cat => ({ value: cat.name, label: cat.name }))
        : [
            { value: 'Atasan', label: 'Atasan' },
            { value: 'Bawahan', label: 'Bawahan' },
            { value: 'Tas', label: 'Tas' }
        ];

    const CustomCheckbox = ({ checked, onChange, label }) => (
        <label className='flex items-center gap-3 cursor-pointer group p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200'>
            <div className='relative'>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className='sr-only'
                />
                <div className={`w-5 h-5 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${checked
                    ? 'bg-gradient-to-r from-accent-500 to-primary-500 border-accent-500 scale-110'
                    : 'border-gray-300 group-hover:border-accent-300'
                    }`}>
                    {checked && (
                        <svg className='w-3 h-3 text-white animate-scale-in' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                        </svg>
                    )}
                </div>
            </div>
            <div className='flex items-center gap-2 flex-1'>
                <span className={`font-medium transition-colors duration-200 ${checked ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                    {label}
                </span>
            </div>
        </label>
    );

    return (
        <div className='w-full max-w-80 animate-fade-in-left'>
            {/* Filter Header */}
            <div className='sticky top-4 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
                {/* Mobile Toggle Header */}
                <div
                    onClick={() => setShowFilter(!showFilter)}
                    className='flex items-center justify-between p-6 cursor-pointer sm:cursor-default bg-gradient-to-r from-accent-50 to-primary-50'
                >
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-white rounded-lg shadow-sm'>
                            <svg className='w-5 h-5 text-gray-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z' />
                            </svg>
                        </div>
                        <h2 className='text-xl font-bold text-gray-900'>Filters</h2>
                    </div>

                    <div className='flex items-center gap-2'>
                        {(gender.length > 0 || category.length > 0) && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearFilters();
                                }}
                                className='text-sm text-accent-600 hover:text-accent-700 font-medium transition-colors duration-200'
                            >
                                Clear All
                            </button>
                        )}
                        <img
                            src={assets.dropdown_icon}
                            className={`h-4 sm:hidden transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`}
                            alt="toggle"
                        />
                    </div>
                </div>

                {/* Filter Content */}
                <div className={`${showFilter ? 'block' : 'hidden'} sm:block`}>
                    {/* Gender Filter */}
                    <div className='p-6 border-b border-gray-100'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                            Gender
                        </h3>
                        <div className='space-y-1'>
                            {genders.map((g) => (
                                <CustomCheckbox
                                    key={g.value}
                                    checked={gender.includes(g.value)}
                                    onChange={(e) => toggleGender(e, g.value)}
                                    label={g.label}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className='p-6'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                            Kategori
                        </h3>
                        <div className='space-y-1'>
                            {categories.map((cat) => (
                                <CustomCheckbox
                                    key={cat.value}
                                    checked={category.includes(cat.value)}
                                    onChange={(e) => toggleCategory(e, cat.value)}
                                    label={cat.label}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;