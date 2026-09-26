import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'
import Breadcrumbs from '../components/common/Breadcrumbs'

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    isFreeShipping,
    amountToFreeShipping,
    freeShippingProgress,
    appliedPromo,
    discountAmount,
    estimatedShipping,
    orderTotal,
    applyPromoCode,
    removePromoCode
  } = useCart()

  const [promoInput, setPromoInput] = useState('')
  const navigate = useNavigate()

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (promoInput.trim()) {
      applyPromoCode(promoInput)
      setPromoInput('')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        <Breadcrumbs items={[{ label: 'Bag' }]} />
        <div className="py-24 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#EAE6DD] dark:bg-[#202020] mx-auto flex items-center justify-center text-[#8A8A8A]">
            <Tag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide">
            Your bag is empty.
          </h2>
          <p className="text-xs sm:text-sm text-[#777777] dark:text-[#AAAAAA] leading-relaxed">
            You currently have no garments in your shopping bag. Explore our collection of pure minimalist tailoring.
          </p>
          <div className="pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] text-xs uppercase tracking-luxury font-semibold hover:bg-[#B89B5E] dark:hover:bg-[#B89B5E] dark:hover:text-white transition-colors"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      <Breadcrumbs items={[{ label: 'Shopping Bag' }]} />

      {/* Header */}
      <div className="py-8 border-b border-[#E5E1D8] dark:border-[#2C2C2C] mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E] block mb-1">
            Order Review
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl uppercase font-normal tracking-tight">
            Your Shopping Bag
          </h1>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs uppercase tracking-luxury text-[#8A8A8A] hover:text-[#A84D4D] transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Empty Bag</span>
        </button>
      </div>

      {/* Free Shipping Alert Bar */}
      <div className="bg-[#EFECE4] dark:bg-[#181818] p-4 border border-[#E5E1D8] dark:border-[#2C2C2C] mb-8">
        <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-2 font-medium">
          {isFreeShipping ? (
            <span className="text-[#4F7A5A] flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-4 h-4" />
              You qualify for Complimentary Express Delivery
            </span>
          ) : (
            <span>
              Add <span className="text-[#B89B5E] font-semibold">{formatPrice(amountToFreeShipping)}</span> more for Complimentary Delivery
            </span>
          )}
          <span className="text-[#8A8A8A]">{freeShippingProgress}%</span>
        </div>
        <div className="w-full bg-[#E5E1D8] dark:bg-[#2C2C2C] h-1.5 overflow-hidden">
          <div
            className={`h-full ${isFreeShipping ? 'bg-[#4F7A5A]' : 'bg-[#B89B5E]'}`}
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Bag Items & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Items List Column */}
        <div className="lg:col-span-8 divide-y divide-[#E5E1D8] dark:divide-[#2C2C2C]">
          {cartItems.map((item) => (
            <div key={item.cartItemId} className="py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Thumbnail */}
              <Link to={`/product/${item.id}`} className="w-24 h-32 bg-[#EAE6DD] dark:bg-[#202020] shrink-0 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center" />
              </Link>

              {/* Info */}
              <div className="flex-1 space-y-1">
                <span className="text-[10px] text-[#8A8A8A] uppercase tracking-luxury">
                  {item.category}
                </span>
                <Link to={`/product/${item.id}`} className="font-serif text-lg font-medium hover:text-[#B89B5E] transition-colors block">
                  {item.name}
                </Link>
                <div className="flex items-center gap-3 text-xs text-[#777777]">
                  <span>Size: <strong className="text-[#111111] dark:text-[#F7F5F0]">{item.size}</strong></span>
                  {item.color?.name && (
                    <span>Color: <strong className="text-[#111111] dark:text-[#F7F5F0]">{item.color.name}</strong></span>
                  )}
                </div>
                <p className="text-sm font-medium pt-1">
                  {formatPrice(item.price)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="inline-flex items-center border border-[#E5E1D8] dark:border-[#2C2C2C]">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="px-3 py-1 text-sm hover:bg-[#EAE6DD] dark:hover:bg-[#252525] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3.5 py-1 text-xs font-semibold">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="px-3 py-1 text-sm hover:bg-[#EAE6DD] dark:hover:bg-[#252525] transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="text-right min-w-24">
                  <span className="font-serif text-base font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-[#999999] hover:text-[#A84D4D] transition-colors p-1"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-[#EFECE4] dark:bg-[#181818] p-6 sm:p-8 border border-[#E5E1D8] dark:border-[#2C2C2C] space-y-6 sticky top-24">
            <h2 className="font-serif text-xl uppercase tracking-wide border-b border-[#E5E1D8] dark:border-[#2C2C2C] pb-4">
              Summary
            </h2>

            {/* Price Line Breakdown */}
            <div className="space-y-3 text-xs uppercase tracking-wider">
              <div className="flex justify-between text-[#666666] dark:text-[#AAAAAA]">
                <span>Subtotal</span>
                <span className="font-medium text-[#111111] dark:text-[#F7F5F0]">{formatPrice(subtotal)}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-[#4F7A5A]">
                  <span>Discount ({appliedPromo.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#666666] dark:text-[#AAAAAA]">
                <span>Estimated Shipping</span>
                <span className="font-medium text-[#111111] dark:text-[#F7F5F0]">
                  {estimatedShipping === 0 ? 'Complimentary' : formatPrice(estimatedShipping)}
                </span>
              </div>

              <div className="flex justify-between text-[#666666] dark:text-[#AAAAAA]">
                <span>Taxes</span>
                <span className="text-[#111111] dark:text-[#F7F5F0]">Included</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-[#E5E1D8] dark:border-[#2C2C2C] flex items-baseline justify-between">
              <span className="font-serif text-lg uppercase tracking-wide">Estimated Total</span>
              <span className="font-serif text-2xl font-semibold">{formatPrice(orderTotal)}</span>
            </div>

            {/* Promo code input */}
            <form onSubmit={handleApplyPromo} className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo Code (e.g. VELORA10)"
                  className="flex-1 bg-white dark:bg-[#111111] px-3.5 py-2 text-xs uppercase tracking-wider border border-[#E5E1D8] dark:border-[#333333] focus:outline-none focus:border-[#111111] dark:focus:border-[#F7F5F0]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] text-xs uppercase tracking-luxury font-medium hover:bg-[#B89B5E] transition-colors"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="mt-2 flex items-center justify-between text-xs text-[#4F7A5A]">
                  <span>{appliedPromo.description}</span>
                  <button type="button" onClick={removePromoCode} className="text-[#A84D4D] underline hover:no-underline text-[11px]">
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Checkout CTA */}
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] py-4 text-xs uppercase tracking-luxury font-semibold hover:bg-[#B89B5E] dark:hover:bg-[#B89B5E] dark:hover:text-white transition-all transform hover:-translate-y-0.5 shadow-sm flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[10px] text-[#8A8A8A] uppercase tracking-wider text-center space-y-1">
              <p>🔒 256-Bit SSL Encrypted Checkout</p>
              <p>Carbon Neutral Delivery Provided by DHL Express</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
