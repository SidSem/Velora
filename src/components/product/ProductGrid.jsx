import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { Inbox } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProductGrid({
  products = [],
  emptyTitle = 'No Pieces Found',
  emptySubtitle = 'Adjust your filters or explore our complete catalog.',
  resetFilters = null
}) {
  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#EAE6DD] dark:bg-[#202020] flex items-center justify-center text-[#8A8A8A]">
          <Inbox className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-medium tracking-wide">
          {emptyTitle}
        </h3>
        <p className="text-sm text-[#8A8A8A] max-w-sm">
          {emptySubtitle}
        </p>
        {resetFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            className="mt-2 text-xs uppercase tracking-luxury font-medium border-b border-[#111111] dark:border-[#F7F5F0] pb-1 hover:text-[#B89B5E] hover:border-[#B89B5E] transition-colors"
          >
            Clear All Filters
          </button>
        ) : (
          <Link
            to="/shop"
            className="mt-2 text-xs uppercase tracking-luxury font-medium border-b border-[#111111] dark:border-[#F7F5F0] pb-1 hover:text-[#B89B5E] hover:border-[#B89B5E] transition-colors"
          >
            Explore All Collections
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
