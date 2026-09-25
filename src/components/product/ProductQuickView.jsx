import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Star, ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatPrice'
import { useApp } from '../../context/AppContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

export default function ProductQuickView() {
  const { quickViewProduct, closeQuickView, openSizeGuide } = useApp()
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)

  // Reset state on product change
  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImageIndex(0)
      setSelectedSize(quickViewProduct.sizes?.[0] || '')
      setSelectedColor(quickViewProduct.colors?.[0] || null)
      setQuantity(1)
    }
  }, [quickViewProduct])

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeQuickView()
    }
    if (quickViewProduct) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [quickViewProduct, closeQuickView])

  if (!quickViewProduct) return null

  const isFavorited = isInWishlist(quickViewProduct.id)

  const handleAddToCart = () => {
    const success = addToCart(quickViewProduct, selectedSize, selectedColor, quantity, true)
    if (success) {
      closeQuickView()
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-[#F7F5F0] dark:bg-[#181818] text-[#111111] dark:text-[#F7F5F0] border border-[#E5E1D8] dark:border-[#2C2C2C] shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 text-[#8A8A8A] hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="p-6 sm:p-8 flex flex-col space-y-4">
              <div className="relative aspect-[3/4] w-full bg-[#EAE6DD] dark:bg-[#222222] overflow-hidden">
                <img
                  src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />
              </div>

              {/* Thumbnails */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex gap-2">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-20 bg-[#EAE6DD] overflow-hidden border transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#111111] dark:border-[#F7F5F0] opacity-100'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#E5E1D8] dark:border-[#2C2C2C]">
              <div>
                {/* Meta */}
                <div className="flex items-center justify-between text-[11px] uppercase tracking-luxury text-[#8A8A8A] mb-2">
                  <span>{quickViewProduct.category} • {quickViewProduct.gender}</span>
                  <div className="flex items-center gap-1 text-[#B89B5E]">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[#111111] dark:text-[#F7F5F0] font-medium">{quickViewProduct.rating}</span>
                    <span className="text-[#8A8A8A]">({quickViewProduct.reviews})</span>
                  </div>
                </div>

                {/* Name */}
                <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mb-3">
                  {quickViewProduct.name}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-xl font-medium">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.oldPrice && (
                    <span className="text-sm text-[#8A8A8A] line-through">
                      {formatPrice(quickViewProduct.oldPrice)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#666666] dark:text-[#AAAAAA] leading-relaxed mb-6">
                  {quickViewProduct.description}
                </p>

                {/* Color Selector */}
                {quickViewProduct.colors && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-2">
                      <span className="text-[#8A8A8A]">Color:</span>
                      <span className="font-medium">{selectedColor?.name}</span>
                    </div>
                    <div className="flex gap-2">
                      {quickViewProduct.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c)}
                          className={`w-7 h-7 rounded-full transition-all relative flex items-center justify-center ${
                            selectedColor?.name === c.name
                              ? 'ring-2 ring-[#111111] dark:ring-[#F7F5F0] ring-offset-2 ring-offset-[#F7F5F0] dark:ring-offset-[#181818]'
                              : 'opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: c.hex, border: '1px solid rgba(0,0,0,0.15)' }}
                          aria-label={c.name}
                          title={c.name}
                        >
                          {selectedColor?.name === c.name && (
                            <Check className={`w-3.5 h-3.5 ${c.hex.toLowerCase() === '#ffffff' || c.hex.toLowerCase() === '#faf8f5' ? 'text-black' : 'text-white'}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {quickViewProduct.sizes && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-2">
                      <span className="text-[#8A8A8A]">Size:</span>
                      <button
                        type="button"
                        onClick={openSizeGuide}
                        className="text-[11px] underline tracking-wide text-[#8A8A8A] hover:text-[#B89B5E] transition-colors"
                      >
                        Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`min-w-10 px-3 py-2 text-xs uppercase font-medium border transition-colors ${
                            selectedSize === s
                              ? 'bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] border-[#111111] dark:border-[#F7F5F0]'
                              : 'bg-transparent border-[#E5E1D8] dark:border-[#2C2C2C] text-[#555555] dark:text-[#AAAAAA] hover:border-[#111111] dark:hover:border-[#F7F5F0]'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-6">
                  <span className="block text-xs uppercase tracking-wider text-[#8A8A8A] mb-2">
                    Quantity:
                  </span>
                  <div className="inline-flex items-center border border-[#E5E1D8] dark:border-[#2C2C2C]">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-1.5 text-sm hover:bg-[#EBE7DC] dark:hover:bg-[#252525] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-semibold">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-1.5 text-sm hover:bg-[#EBE7DC] dark:hover:bg-[#252525] transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#E5E1D8] dark:border-[#2C2C2C]">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] py-3 px-6 text-xs uppercase tracking-luxury font-semibold hover:bg-[#B89B5E] dark:hover:bg-[#B89B5E] dark:hover:text-white transition-colors"
                  >
                    Add to Bag
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(quickViewProduct)}
                    className="p-3 border border-[#E5E1D8] dark:border-[#2C2C2C] hover:border-[#B89B5E] transition-colors"
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#A84D4D] text-[#A84D4D]' : ''}`} />
                  </button>
                </div>

                <Link
                  to={`/product/${quickViewProduct.id}`}
                  onClick={closeQuickView}
                  className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-luxury font-medium text-[#8A8A8A] hover:text-[#B89B5E] transition-colors pt-1"
                >
                  <span>View Full Product Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
