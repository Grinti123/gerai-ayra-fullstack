import React, { useState } from 'react';
import Title from './Title';

const CollectionHeader = ({ sortType, setSortType, totalProducts, viewMode, setViewMode }) => {
    const [showSortMenu, setShowSortMenu] = useState(false);
    
    const sortOptions = [
        { value: 'relevant', label: 'Most Relevant', icon: '🎯' },
        { value: 'low-high', label: 'Price: Low to High', icon: '📈' },
        { value: 'high-low', label: 'Price: High to Low', icon: '📉' },
        { value: 'newest', label: 'Newest First', icon: '⭐' },
        { value: 'popular', label: 'Most Popular', icon: '🔥' }
    ];

    const currentSort = sortOptions.find(option => option.value === sortType) || sortOptions[0];

    return (
        <div className='animate-fade-in-up mb-8'>
            {/* Main Header */}
            <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6'>
                <div className='flex items-center gap-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    <div className='px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium'>
                        {totalProducts} Products
                    </div>
                </div>

                {/* Controls */}
                <div className='flex items-center gap-4'>
                    {/* View Mode Toggle */}
                    <div className='bg-gray-100 rounded-xl p-1 flex items-center'>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                                viewMode === 'grid' 
                                    ? 'bg-white shadow-sm text-accent-600' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm6 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zm-6 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zm6 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z' clipRule='evenodd' />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                                viewMode === 'list' 
                                    ? 'bg-white shadow-sm text-accent-600' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' clipRule='evenodd' />
                            </svg>
                        </button>
                    </div>

                    {/* Sort Dropdown */}
                    <div className='relative'>
                        <button
                            onClick={() => setShowSortMenu(!showSortMenu)}
                            className='flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-accent-300 transition-colors duration-200 min-w-48'
                        >
                            <span className='text-lg'>{currentSort.icon}</span>
                            <div className='flex-1 text-left'>
                                <div className='text-xs text-gray-500'>Sort by</div>
                                <div className='text-sm font-medium text-gray-900'>{currentSort.label}</div>
                            </div>
                            <svg 
                                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                                    showSortMenu ? 'rotate-180' : ''
                                }`} 
                                fill='none' 
                                stroke='currentColor' 
                                viewBox='0 0 24 24'
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {showSortMenu && (
                            <div className='absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden animate-fade-in-down'>
                                {sortOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setSortType(option.value);
                                            setShowSortMenu(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                                            sortType === option.value ? 'bg-accent-50 text-accent-700' : 'text-gray-700'
                                        }`}
                                    >
                                        <span className='text-lg'>{option.icon}</span>
                                        <span className='font-medium'>{option.label}</span>
                                        {sortType === option.value && (
                                            <svg className='w-4 h-4 ml-auto text-accent-600' fill='currentColor' viewBox='0 0 20 20'>
                                                <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Filter Pills/Tags */}
            <div className='flex flex-wrap items-center gap-2'>
                <span className='text-sm text-gray-500'>Active filters:</span>
                <div className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2'>
                    All Products
                    <button className='hover:bg-blue-200 rounded-full p-0.5 transition-colors duration-200'>
                        <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CollectionHeader;