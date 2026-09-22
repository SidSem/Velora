import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'

export default function MobileMenu({ isOpen, onClose, navLinks }) {
  const location = useLocation()
  const { wishlistCount } = useWishlist()
  const { totalItems, openCart } = useCart()

  // Close on route change
  useEffect(() => {
    onClose()
  }, [location.pathname])

  // Prevent background scrolling when menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-full max-w-sm h-full bg-[#F7F5F0] dark:bg-[#111111] text-[#111111] dark:text-[#F7F5F0] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl border-r border-[#E5E1D8] dark:border-[#2C2C2C]"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E5E1D8] dark:border-[#2C2C2C]">
                <span className="font-serif text-2xl font-bold tracking-[0.25em] uppercase">
                  VELORA
                </span>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-[#111111] dark:text-[#F7F5F0] hover:text-[#B89B5E] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Primary Navigation Links */}
              <nav className="mt-8 space-y-5">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  >
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className="group flex items-center justify-between font-serif text-xl sm:text-2xl hover:text-[#B89B5E] transition-colors py-1"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#B89B5E]" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Secondary links / Categories */}
              <div className="mt-10 pt-6 border-t border-[#E5E1D8] dark:border-[#2C2C2C]">
                <p className="text-[11px] font-semibold tracking-luxury uppercase text-[#8A8A8A] mb-4">
                  Curated Categories
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs tracking-wide uppercase font-medium">
                  <Link to="/shop?category=coats" onClick={onClose} className="hover:text-[#B89B5E] py-1">
                    Coats & Outerwear
                  </Link>
                  <Link to="/shop?category=knitwear" onClick={onClose} className="hover:text-[#B89B5E] py-1">
                    Fine Knitwear
                  </Link>
                  <Link to="/shop?category=trousers" onClick={onClose} className="hover:text-[#B89B5E] py-1">
                    Pleated Trousers
                  </Link>
                  <Link to="/shop?category=shirts" onClick={onClose} className="hover:text-[#B89B5E] py-1">
                    Linen & Poplin
                  </Link>
                  <Link to="/shop?category=dresses" onClick={onClose} className="hover:text-[#B89B5E] py-1">
                    Silk Slip Dresses
                  </Link>
                  <Link to="/shop?category=accessories" onClick={onClose} className="hover:text-[#B89B5E] py-1">
                    Leather Goods
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#E5E1D8] dark:border-[#2C2C2C] space-y-4">
              <div className="flex items-center justify-between text-xs tracking-wider uppercase font-medium">
                <Link
                  to="/wishlist"
                  onClick={onClose}
                  className="flex items-center gap-2 hover:text-[#B89B5E] transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist ({wishlistCount})</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    openCart()
                  }}
                  className="flex items-center gap-2 hover:text-[#B89B5E] transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Bag ({totalItems})</span>
                </button>
              </div>

              <div className="text-[11px] text-[#8A8A8A] flex justify-between pt-2">
                <span>Currency: INR (₹)</span>
                <span>Region: Worldwide Delivery</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
