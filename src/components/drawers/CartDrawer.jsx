import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { formatPrice } from '../../utils/formatPrice'
import { useCart, FREE_SHIPPING_THRESHOLD } from '../../context/CartContext'
import CartItem from './CartItem'

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    totalItems,
    subtotal,
    isFreeShipping,
    amountToFreeShipping,
    freeShippingProgress
  } = useCart()

  const navigate = useNavigate()

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeCart()
    }
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isCartOpen, closeCart])

  const handleCheckoutClick = () => {
    closeCart()
    navigate('/checkout')
  }

  const handleViewBagClick = () => {
    closeCart()
    navigate('/cart')
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#F7F5F0] dark:bg-[#181818] text-[#111111] dark:text-[#F7F5F0] border-l border-[#E5E1D8] dark:border-[#2C2C2C] shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E5E1D8] dark:border-[#2C2C2C]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#B89B5E]" />
                    <h2 className="font-serif text-xl tracking-wide uppercase">
                      Your Bag ({totalItems})
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="p-1 text-[#8A8A8A] hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors"
                    aria-label="Close bag"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Free Shipping Progress Indicator */}
                <div className="mt-4 pt-3 border-t border-[#E5E1D8]/60 dark:border-[#2C2C2C]/60">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider mb-1.5 font-medium">
                    {isFreeShipping ? (
                      <span className="text-[#4F7A5A] flex items-center gap-1 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        Complimentary Worldwide Express Shipping Unlocked!
                      </span>
                    ) : (
                      <span>
                        Add <span className="text-[#B89B5E] font-semibold">{formatPrice(amountToFreeShipping)}</span> for Complimentary Shipping
                      </span>
                    )}
                    <span className="text-[#8A8A8A]">{freeShippingProgress}%</span>
                  </div>
                  <div className="w-full bg-[#E5E1D8] dark:bg-[#2C2C2C] h-1.5 overflow-hidden">
                    <motion.div
                      className={`h-full ${isFreeShipping ? 'bg-[#4F7A5A]' : 'bg-[#B89B5E]'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${freeShippingProgress}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>

              {/* Items Body */}
              <div className="flex-1 overflow-y-auto px-6 py-2">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#EAE6DD] dark:bg-[#222222] flex items-center justify-center text-[#8A8A8A]">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-xl tracking-wide">
                      Your bag is empty.
                    </h3>
                    <p className="text-xs text-[#8A8A8A] max-w-xs">
                      Discover signature outerwear, breathable linens, and architectural knitwear.
                    </p>
                    <Link
                      to="/shop"
                      onClick={closeCart}
                      className="mt-4 inline-block bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] px-6 py-2.5 text-xs uppercase tracking-luxury font-medium hover:bg-[#B89B5E] dark:hover:bg-[#B89B5E] dark:hover:text-white transition-colors"
                    >
                      Explore Collection
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-[#E5E1D8]/60 dark:divide-[#2C2C2C]/60">
                    {cartItems.map((item) => (
                      <CartItem key={item.cartItemId} item={item} />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-[#E5E1D8] dark:border-[#2C2C2C] bg-[#EFECE4]/50 dark:bg-[#151515]">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-xs uppercase tracking-wider text-[#8A8A8A]">
                      Subtotal (Tax Included)
                    </span>
                    <span className="font-serif text-lg font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={handleCheckoutClick}
                      className="w-full bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] py-3.5 px-4 text-xs uppercase tracking-luxury font-semibold hover:bg-[#B89B5E] dark:hover:bg-[#B89B5E] dark:hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleViewBagClick}
                      className="w-full bg-transparent border border-[#111111] dark:border-[#F7F5F0] text-[#111111] dark:text-[#F7F5F0] py-3 px-4 text-xs uppercase tracking-luxury font-medium hover:bg-[#111111] hover:text-[#F7F5F0] dark:hover:bg-[#F7F5F0] dark:hover:text-[#111111] transition-colors text-center"
                    >
                      View Detailed Bag
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[#8A8A8A] uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4F7A5A]" />
                    <span>Complimentary Carbon-Neutral Delivery & Returns</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
