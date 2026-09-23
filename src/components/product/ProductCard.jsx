import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Eye, ShoppingBag } from 'lucide-react'
import { formatPrice } from '../../utils/formatPrice'
import { useWishlist } from '../../context/WishlistContext'
import { useApp } from '../../context/AppContext'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product, showQuickAdd = true }) {
  const [isHovered, setIsHovered] = useState(false)
  const [activeColorIndex, setActiveColorIndex] = useState(0)
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { openQuickView } = useApp()
  const { addToCart } = useCart()

  if (!product) return null

  const isFavorited = isInWishlist(product.id)
  const primaryImage = product.images?.[0]
  const secondaryImage = product.images?.[1] || primaryImage

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // If multiple sizes, open quickview modal for size selection; if single size (e.g. One Size), add directly
    if (product.sizes.length === 1) {
      addToCart(product, product.sizes[0], product.colors?.[activeColorIndex])
    } else {
      openQuickView(product)
    }
  }

  const handleWishlistClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  const handleQuickViewClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    openQuickView(product)
  }

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with aspect ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EAE6DD] dark:bg-[#1E1E1E]">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {/* Primary image */}
          <img
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered && secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />
          {/* Secondary image for hover flip */}
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </Link>

        {/* Badges (New, Sale, Bestseller) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none z-10">
          {product.isNew && (
            <span className="bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] text-[9px] font-semibold tracking-luxury uppercase px-2 py-0.5">
              New
            </span>
          )}
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="bg-[#A84D4D] text-white text-[9px] font-semibold tracking-luxury uppercase px-2 py-0.5">
              Sale
            </span>
          )}
          {product.isBestseller && !product.isNew && (
            <span className="bg-[#B89B5E] text-white text-[9px] font-semibold tracking-luxury uppercase px-2 py-0.5">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-full text-[#111111] dark:text-[#F7F5F0] hover:text-[#B89B5E] transition-all transform hover:scale-110 shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-[#A84D4D] text-[#A84D4D]' : ''
            }`}
          />
        </button>

        {/* Quick View / Quick Add Action Bar on Desktop Hover */}
        {showQuickAdd && (
          <div className="absolute bottom-0 inset-x-0 p-3 hidden sm:flex items-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/50 to-transparent pt-8 z-10">
            <button
              type="button"
              onClick={handleQuickAdd}
              className="flex-1 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-sm text-[#111111] dark:text-[#F7F5F0] text-xs uppercase tracking-luxury font-medium py-2.5 px-3 hover:bg-[#111111] hover:text-[#F7F5F0] dark:hover:bg-[#F7F5F0] dark:hover:text-[#111111] transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{product.sizes.length === 1 ? 'Quick Add' : 'Choose Size'}</span>
            </button>
            <button
              type="button"
              onClick={handleQuickViewClick}
              aria-label="Quick preview"
              title="Quick preview"
              className="bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-sm p-2.5 text-[#111111] dark:text-[#F7F5F0] hover:bg-[#111111] hover:text-[#F7F5F0] dark:hover:bg-[#F7F5F0] dark:hover:text-[#111111] transition-all"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Product Metadata Details */}
      <div className="pt-3 pb-1 flex flex-col space-y-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-luxury text-[#8A8A8A]">
          <span>{product.category} • {product.gender}</span>
          <span className="flex items-center gap-1">
            <span className="text-[#B89B5E]">★</span>
            <span>{product.rating}</span>
          </span>
        </div>

        {/* Title */}
        <Link
          to={`/product/${product.id}`}
          className="font-serif text-sm sm:text-[15px] font-medium text-[#111111] dark:text-[#F7F5F0] hover:text-[#B89B5E] transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Price Row */}
        <div className="flex items-baseline space-x-2 text-xs sm:text-sm pt-0.5">
          <span className="font-medium text-[#111111] dark:text-[#F7F5F0]">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-[#8A8A8A] line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Color Swatch Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center space-x-1.5 pt-1.5">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setActiveColorIndex(idx)}
                aria-label={`Color ${color.name}`}
                title={color.name}
                className={`w-3 h-3 rounded-full transition-transform ${
                  activeColorIndex === idx ? 'scale-125 ring-1 ring-[#111111] dark:ring-[#F7F5F0] ring-offset-1 ring-offset-transparent' : 'opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex, border: '1px solid rgba(0,0,0,0.1)' }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
