import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import { SlidersHorizontal, X, ArrowUpDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS } from '../data/products'
import { filterProducts } from '../utils/filters'
import ProductGrid from '../components/product/ProductGrid'
import FilterPanel from '../components/shop/FilterPanel'
import SortDropdown from '../components/shop/SortDropdown'
import Breadcrumbs from '../components/common/Breadcrumbs'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { category: routeCategory } = useParams()

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('featured')

  // Initial filter state derived from URL or defaults
  const initialCategory = routeCategory || searchParams.get('category') || 'all'
  const initialGender = searchParams.get('gender') || 'all'
  const isNewParam = searchParams.get('filter') === 'new'
  const isSaleParam = searchParams.get('filter') === 'sale'
  const isBestsellerParam = searchParams.get('filter') === 'bestseller'

  const [filters, setFilters] = useState({
    category: initialCategory,
    gender: initialGender,
    selectedSizes: [],
    selectedColors: [],
    minPrice: 0,
    maxPrice: 25000,
    onlyInStock: false,
    onlyNew: isNewParam,
    onlySale: isSaleParam,
  })

  // Sync state when URL params change
  useEffect(() => {
    const cat = routeCategory || searchParams.get('category') || 'all'
    const gen = searchParams.get('gender') || 'all'
    const filt = searchParams.get('filter')

    setFilters(prev => ({
      ...prev,
      category: cat,
      gender: gen,
      onlyNew: filt === 'new',
      onlySale: filt === 'sale',
    }))
  }, [routeCategory, searchParams])

  const filteredProducts = useMemo(() => {
    let list = filterProducts(PRODUCTS, {
      ...filters,
      sortBy
    })
    if (searchParams.get('filter') === 'bestseller') {
      list = list.filter(p => p.isBestseller)
    }
    return list
  }, [filters, sortBy, searchParams])

  const resetFilters = () => {
    setFilters({
      category: 'all',
      gender: 'all',
      selectedSizes: [],
      selectedColors: [],
      minPrice: 0,
      maxPrice: 25000,
      onlyInStock: false,
      onlyNew: false,
      onlySale: false,
    })
    setSearchParams({})
  }

  // Active filter count for badge
  const activeFiltersCount = [
    filters.category !== 'all',
    filters.gender !== 'all',
    filters.selectedSizes.length > 0,
    filters.selectedColors.length > 0,
    filters.maxPrice < 25000,
    filters.onlyNew,
    filters.onlySale
  ].filter(Boolean).length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop', to: '/shop' },
          filters.category !== 'all' ? { label: filters.category } : null
        ].filter(Boolean)}
      />

      {/* Header */}
      <div className="py-8 sm:py-12 border-b border-[#E5E1D8] dark:border-[#2C2C2C] mb-8">
        <span className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E] block mb-2">
          Atelier Catalog
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl uppercase font-normal tracking-tight">
              {filters.category !== 'all' ? filters.category : 'Shop All'}
            </h1>
            <p className="text-xs sm:text-sm text-[#777777] dark:text-[#999999] mt-2 max-w-xl">
              Explore our disciplined curation of minimalist garments crafted with pure fibers and timeless proportions.
            </p>
          </div>
          <p className="text-xs uppercase tracking-luxury text-[#8A8A8A]">
            Showing {filteredProducts.length} of {PRODUCTS.length} pieces
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between py-4 border-b border-[#E5E1D8] dark:border-[#2C2C2C] mb-8">
        {/* Mobile Filter Button */}
        <button
          type="button"
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-luxury font-medium border border-[#E5E1D8] dark:border-[#2C2C2C] px-4 py-2 hover:border-[#111111] dark:hover:border-[#F7F5F0] transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#B89B5E] text-white text-[10px] flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Desktop Active Filters Chips Summary */}
        <div className="hidden lg:flex items-center flex-wrap gap-2">
          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] uppercase tracking-wider bg-[#EAE6DD] dark:bg-[#202020] text-[#111111] dark:text-[#F7F5F0]">
              Category: {filters.category}
              <button onClick={() => setFilters(f => ({ ...f, category: 'all' }))} className="hover:text-[#A84D4D] ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.gender !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] uppercase tracking-wider bg-[#EAE6DD] dark:bg-[#202020] text-[#111111] dark:text-[#F7F5F0]">
              Audience: {filters.gender}
              <button onClick={() => setFilters(f => ({ ...f, gender: 'all' }))} className="hover:text-[#A84D4D] ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.selectedSizes.map(s => (
            <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] uppercase tracking-wider bg-[#EAE6DD] dark:bg-[#202020] text-[#111111] dark:text-[#F7F5F0]">
              Size: {s}
              <button onClick={() => setFilters(f => ({ ...f, selectedSizes: f.selectedSizes.filter(x => x !== s) }))} className="hover:text-[#A84D4D] ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-[11px] uppercase tracking-wider text-[#B89B5E] hover:underline ml-2"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="ml-auto">
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 border-r border-[#E5E1D8] dark:border-[#2C2C2C] pr-8">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            totalResults={filteredProducts.length}
          />
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          <ProductGrid
            products={filteredProducts}
            resetFilters={activeFiltersCount > 0 ? resetFilters : null}
          />
        </main>
      </div>

      {/* Mobile Filter Slide-up Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-sm h-full bg-[#F7F5F0] dark:bg-[#181818] shadow-2xl z-10 overflow-y-auto"
            >
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
                totalResults={filteredProducts.length}
                isMobile={true}
                onCloseMobile={() => setIsMobileFilterOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
