import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, Clock, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../../data/products'
import { CATEGORIES } from '../../data/categories'
import { useApp } from '../../context/AppContext'
import { useDebounce } from '../../hooks/useDebounce'
import { formatPrice } from '../../utils/formatPrice'

export default function SearchOverlay() {
  const {
    isSearchOpen,
    closeSearch,
    recentSearches,
    addRecentSearch,
    clearRecentSearches
  } = useApp()

  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 250)
  const inputRef = useRef(null)

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setQuery('')
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSearchOpen])

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeSearch()
    }
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, closeSearch])

  // Filter products
  const matchingProducts = debouncedQuery.trim()
    ? PRODUCTS.filter((p) => {
        const q = debouncedQuery.toLowerCase().trim()
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.gender.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        )
      }).slice(0, 6)
    : []

  const matchingCategories = debouncedQuery.trim()
    ? CATEGORIES.filter(c => c.name.toLowerCase().includes(debouncedQuery.toLowerCase().trim()) && c.id !== 'all')
    : []

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      addRecentSearch(query)
    }
  }

  const handleSelectProduct = () => {
    if (query.trim()) {
      addRecentSearch(query)
    }
    closeSearch()
  }

  const handleSelectRecent = (term) => {
    setQuery(term)
  }

  if (!isSearchOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSearch}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Search Modal Body */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative min-h-[50vh] bg-[#F7F5F0] dark:bg-[#161616] text-[#111111] dark:text-[#F7F5F0] border-b border-[#E5E1D8] dark:border-[#2C2C2C] shadow-2xl pt-6 pb-12 px-4 sm:px-8"
        >
          <div className="max-w-4xl mx-auto">
            {/* Top Bar with Close */}
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={closeSearch}
                className="flex items-center gap-1.5 text-xs tracking-luxury uppercase text-[#8A8A8A] hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors p-2"
                aria-label="Close search"
              >
                <span>Close (ESC)</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Big Search Input Field */}
            <form onSubmit={handleSubmit} className="relative mb-8">
              <div className="flex items-center border-b-2 border-[#111111] dark:border-[#F7F5F0] pb-3">
                <Search className="w-6 h-6 text-[#B89B5E] mr-3 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full bg-transparent font-serif text-2xl sm:text-4xl text-[#111111] dark:text-[#F7F5F0] placeholder:text-[#AAAAAA] dark:placeholder:text-[#666666] focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="p-1 text-[#8A8A8A] hover:text-[#111111] dark:hover:text-[#F7F5F0]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>

            {/* Results or Suggestions */}
            {query.trim() === '' ? (
              <div className="space-y-8">
                {/* Recent Searches */}
                {recentSearches && recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold tracking-luxury uppercase text-[#8A8A8A] mb-3">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#B89B5E]" />
                        Recent Searches
                      </span>
                      <button
                        type="button"
                        onClick={clearRecentSearches}
                        className="text-[#999999] hover:text-[#A84D4D] transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Clear</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => handleSelectRecent(term)}
                          className="text-xs px-3.5 py-1.5 bg-[#EAE6DD] dark:bg-[#222222] hover:bg-[#111111] hover:text-white dark:hover:bg-[#F7F5F0] dark:hover:text-[#111111] transition-colors tracking-wide"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Categories */}
                <div>
                  <p className="text-[11px] font-semibold tracking-luxury uppercase text-[#8A8A8A] mb-3">
                    Explore Categories
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs tracking-wider uppercase">
                    {CATEGORIES.filter(c => c.id !== 'all').slice(0, 8).map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.id}`}
                        onClick={closeSearch}
                        className="p-3 bg-[#EAE6DD]/60 dark:bg-[#202020] hover:bg-[#111111] hover:text-white dark:hover:bg-[#F7F5F0] dark:hover:text-[#111111] transition-colors flex items-center justify-between"
                      >
                        <span>{cat.name}</span>
                        <ArrowRight className="w-3 h-3 text-[#B89B5E]" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {matchingProducts.length === 0 && matchingCategories.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="font-serif text-xl sm:text-2xl mb-2">No pieces found.</p>
                    <p className="text-sm text-[#8A8A8A]">
                      We couldn't find matches for "{debouncedQuery}". Try searching for cashmere, linen, trousers, or coats.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Matching Categories */}
                    {matchingCategories.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold tracking-luxury uppercase text-[#8A8A8A] mb-2">
                          Categories
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {matchingCategories.map(c => (
                            <Link
                              key={c.id}
                              to={`/shop?category=${c.id}`}
                              onClick={closeSearch}
                              className="text-xs uppercase tracking-wider px-3.5 py-1.5 bg-[#B89B5E]/20 text-[#B89B5E] border border-[#B89B5E]/40 hover:bg-[#B89B5E] hover:text-white transition-colors"
                            >
                              {c.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Products Grid */}
                    <div>
                      <p className="text-[11px] font-semibold tracking-luxury uppercase text-[#8A8A8A] mb-4">
                        Matching Pieces ({matchingProducts.length})
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {matchingProducts.map((p) => (
                          <Link
                            key={p.id}
                            to={`/product/${p.id}`}
                            onClick={handleSelectProduct}
                            className="group flex flex-col"
                          >
                            <div className="aspect-[3/4] w-full bg-[#EAE6DD] dark:bg-[#202020] overflow-hidden mb-2">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <span className="text-[10px] text-[#8A8A8A] uppercase tracking-luxury">
                              {p.category}
                            </span>
                            <span className="font-serif text-xs font-medium line-clamp-1 group-hover:text-[#B89B5E] transition-colors">
                              {p.name}
                            </span>
                            <span className="text-xs font-medium mt-0.5">
                              {formatPrice(p.price)}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
