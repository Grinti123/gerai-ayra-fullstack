import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import FilterSidebar from '../components/FilterSidebar'
import CollectionHeader from '../components/CollectionHeader'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant')
  const [viewMode, setViewMode] = useState('grid')
  const [isLoading, setIsLoading] = useState(true)

  const toggleCategory = (e, value) => {
    const categoryValue = value || e.target.value;
    if (category.includes(categoryValue)) {
      setCategory(prev=> prev.filter(item => item !== categoryValue))
    }
    else {
      setCategory(prev => [...prev, categoryValue])
    }
  }

  const toggleSubCategory = (e, value) => {
    const subCategoryValue = value || e.target.value;
    if (subCategory.includes(subCategoryValue)) {
      setSubCategory(prev=> prev.filter(item => item !== subCategoryValue))
    }
    else {
      setSubCategory(prev => [...prev, subCategoryValue])
    }
  }

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      
        default:
          applyFilter();
          break;
    }
  }

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading
    const timer = setTimeout(() => {
      applyFilter();
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])


  // Skeleton loading component
  const ProductSkeleton = () => (
    <div className='bg-white rounded-2xl shadow-md overflow-hidden animate-pulse'>
      <div className='aspect-[4/5] bg-gray-200'></div>
      <div className='p-4 space-y-2'>
        <div className='h-4 bg-gray-200 rounded w-3/4'></div>
        <div className='h-4 bg-gray-200 rounded w-1/2'></div>
        <div className='flex justify-between items-center pt-2'>
          <div className='h-6 bg-gray-200 rounded w-16'></div>
          <div className='h-4 bg-gray-200 rounded w-12'></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-accent-50/30 pt-8'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-hero-pattern opacity-5 pointer-events-none'></div>
      
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Filter Sidebar */}
          <FilterSidebar
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            category={category}
            subCategory={subCategory}
            toggleCategory={toggleCategory}
            toggleSubCategory={toggleSubCategory}
            clearFilters={clearFilters}
          />

          {/* Main Content */}
          <div className='flex-1 min-w-0'>
            {/* Header with sorting and view options */}
            <CollectionHeader
              sortType={sortType}
              setSortType={setSortType}
              totalProducts={filterProducts.length}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

            {/* Products Grid/List */}
            <div className='animate-fade-in-up' style={{animationDelay: '0.3s'}}>
              {isLoading ? (
                // Loading Skeletons
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {[...Array(8)].map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
                </div>
              ) : (
                // Actual Products
                <>
                  {filterProducts.length > 0 ? (
                    <div className={`grid gap-6 transition-all duration-500 ${
                      viewMode === 'grid' 
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                        : 'grid-cols-1 max-w-4xl'
                    }`}>
                      {filterProducts.map((item, index) => (
                        <div 
                          key={item._id} 
                          className='animate-fade-in-up'
                          style={{animationDelay: `${index * 0.1}s`}}
                        >
                          <ProductItem 
                            id={item._id} 
                            name={item.name} 
                            price={item.price} 
                            image={item.image} 
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Empty State
                    <div className='text-center py-20'>
                      <div className='max-w-md mx-auto'>
                        <div className='w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center'>
                          <svg className='w-12 h-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
                          </svg>
                        </div>
                        <h3 className='text-xl font-semibold text-gray-900 mb-2'>No products found</h3>
                        <p className='text-gray-600 mb-6'>Try adjusting your filters or search terms</p>
                        <button 
                          onClick={clearFilters}
                          className='px-6 py-3 bg-accent-600 text-white rounded-xl hover:bg-accent-700 transition-colors duration-200 font-medium'
                        >
                          Clear All Filters
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Load More Button (if needed) */}
            {!isLoading && filterProducts.length > 0 && filterProducts.length >= 20 && (
              <div className='text-center mt-12 animate-fade-in-up'>
                <button className='px-8 py-4 bg-white border border-gray-200 rounded-xl hover:border-accent-300 hover:bg-accent-50 transition-all duration-200 font-medium text-gray-700 hover:text-accent-700'>
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection