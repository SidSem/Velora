import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowLeft,
  CheckCircle,
  Truck,
  Sparkles,
  AlertCircle
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, subtotal, discountAmount, estimatedShipping, orderTotal, clearCart, appliedPromo } = useCart()

  // Form State
  const [formData, setFormData] = useState({
    email: 'elena.vance@atelier.com',
    firstName: 'Elena',
    lastName: 'Vance',
    address: '124 Via de Tornabuoni, Suite 4B',
    city: 'Florence',
    state: 'Tuscany',
    postalCode: '50123',
    phone: '+39 055 210984',
    shippingMethod: 'complimentary', // 'complimentary' | 'express'
    cardName: 'ELENA VANCE',
    cardNumber: '4532 8921 4490 8912',
    cardExpiry: '08/28',
    cardCvv: '482'
  })

  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  // Redirect if cart empty and not processing
  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl mb-4">No Items to Checkout</h2>
        <p className="text-sm text-[#8A8A8A] mb-8">
          Your shopping bag is empty. Add garments before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] text-xs uppercase tracking-luxury font-medium hover:bg-[#B89B5E] transition-colors inline-block"
        >
          Explore Collection
        </Link>
      </div>
    )
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  // Format card number with spaces
  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || ''
    handleChange('cardNumber', formatted.slice(0, 19))
  }

  // Format expiry MM/YY
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/[^0-9]/g, '')
    if (val.length >= 2) {
      val = val.slice(0, 2) + '/' + val.slice(2, 4)
    }
    handleChange('cardExpiry', val.slice(0, 5))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.email || !formData.email.includes('@')) newErrors.email = 'Valid email is required'
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.address) newErrors.address = 'Shipping address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required'
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    if (!formData.cardName) newErrors.cardName = 'Cardholder name is required'
    if (!formData.cardNumber || formData.cardNumber.length < 16) newErrors.cardNumber = 'Valid 16-digit card number is required'
    if (!formData.cardExpiry || formData.cardExpiry.length < 5) newErrors.cardExpiry = 'Valid expiry (MM/YY) required'
    if (!formData.cardCvv || formData.cardCvv.length < 3) newErrors.cardCvv = 'Valid CVV required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitOrder = (e) => {
    e.preventDefault()
    if (!validate()) {
      window.scrollTo({ top: 100, behavior: 'smooth' })
      return
    }

    setIsProcessing(true)

    // Simulate luxury order verification & processing
    setTimeout(() => {
      const orderNumber = `VL-2026-${Math.floor(10000 + Math.random() * 90000)}`
      const orderPayload = {
        orderNumber,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        items: [...cartItems],
        total: orderTotal,
        subtotal,
        discountAmount,
        shipping: estimatedShipping,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          phone: formData.phone,
          email: formData.email
        },
        paymentMethod: `Card ending in ${formData.cardNumber.slice(-4)}`
      }

      try {
        localStorage.setItem('velora_last_order', JSON.stringify(orderPayload))
      } catch (err) {
        console.error(err)
      }

      clearCart()
      navigate('/order-success')
    }, 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E5E1D8] dark:border-[#2C2C2C] mb-8">
        <Link
          to="/cart"
          className="flex items-center gap-2 text-xs uppercase tracking-luxury text-[#8A8A8A] hover:text-[#111111] dark:hover:text-[#F7F5F0] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Bag</span>
        </Link>
        <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase">
          VELORA
        </span>
        <div className="flex items-center gap-1.5 text-xs text-[#8A8A8A]">
          <Lock className="w-3.5 h-3.5 text-[#B89B5E]" />
          <span className="hidden sm:inline">Secure Checkout</span>
        </div>
      </div>

      {/* Checkout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left: Interactive Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmitOrder} className="space-y-10">
            {/* 1. Contact Information */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl uppercase tracking-wide">
                  1. Contact Information
                </h2>
                <span className="text-[11px] text-[#8A8A8A]">Already have an account? Sign in</span>
              </div>
              <div className="space-y-3">
                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Email Address for Order Confirmation"
                    className={`w-full bg-transparent px-4 py-3 text-xs border ${
                      errors.email ? 'border-[#A84D4D]' : 'border-[#E5E1D8] dark:border-[#2C2C2C]'
                    } focus:border-[#111111] dark:focus:border-[#F7F5F0] focus:outline-none transition-colors`}
                  />
                  {errors.email && <p className="text-[11px] text-[#A84D4D] mt-1">{errors.email}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Mobile Telephone Number (for delivery SMS updates)"
                    className={`w-full bg-transparent px-4 py-3 text-xs border ${
                      errors.phone ? 'border-[#A84D4D]' : 'border-[#E5E1D8] dark:border-[#2C2C2C]'
                    } focus:border-[#111111] dark:focus:border-[#F7F5F0] focus:outline-none transition-colors`}
                  />
                  {errors.phone && <p className="text-[11px] text-[#A84D4D] mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div>
              <h2 className="font-serif text-xl uppercase tracking-wide mb-4">
                2. Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="First Name"
                    className={`w-full bg-transparent px-4 py-3 text-xs border ${
                      errors.firstName ? 'border-[#A84D4D]' : 'border-[#E5E1D8] dark:border-[#2C2C2C]'
                    } focus:border-[#111111] dark:focus:border-[#F7F5F0] focus:outline-none transition-colors`}
                  />
                  {errors.firstName && <p className="text-[11px] text-[#A84D4D] mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Last Name"
                    className={`w-full bg-transparent px-4 py-3 text-xs border ${
                      errors.lastName ? 'border-[#A84D4D]' : 'border-[#E5E1D8] dark:border-[#2C2C2C]'
                    } focus:border-[#111111] dark:focus:border-[#F7F5F0] focus:outline-none transition-colors`}
                  />
                  {errors.lastName && <p className="text-[11px] text-[#A84D4D] mt-1">{errors.lastName}</p>}
                </div>

                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Street Address, Apartment, Suite"
                    className={`w-full bg-transparent px-4 py-3 text-xs border ${
                      errors.address ? 'border-[#A84D4D]' : 'border-[#E5E1D8] dark:border-[#2C2C2C]'
                    } focus:border-[#111111] dark:focus:border-[#F7F5F0] focus:outline-none transition-colors`}
                  />
                  {errors.address && <p className="text-[11px] text-[#A84D4D] mt-1">{errors.address}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="City"
                    className={`w-full bg-transparent px-4 py-3 text-xs border ${
                      errors.city ? 'border-[#A84D4D]' : 'border-[#E5E1D8] dark:border-[#2C2C2C]'
                    } focus:border-[#111111] dark:focus:border-[#F7F5F0] focus:outline-none transition-colors`}
                  />
                  {errors.city && <p className="text-[11px] text-[#A84D4D] mt-1">{errors.city}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    placeholder="State / Region"
                    className="w-full bg-transparent px-4 py-3 text-xs border border-[#E5E1D8] dark:border-[#2C2C2C] focus:border-[#111111] dark:focus:border-[#F7F5F0] focus:outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    placeholder="Postal Code / PIN"
                    className={`w-full bg-transparent px-4 py-3 text-xs border ${
                      errors.postalCode ? 'border-[#A84D4D]' : 'border-[#E5E1D8] dark:border-[#2C2C2C]'
                    } focus:border-[#111111] dark:focus:border-[#F7F5F0] focus:outline-none transition-colors`}
                  />
                  {errors.postalCode && <p className="text-[11px] text-[#A84D4D] mt-1">{errors.postalCode}</p>}
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div>
              <h2 className="font-serif text-xl uppercase tracking-wide mb-4">
                3. Delivery Method
              </h2>
              <div className="border border-[#E5E1D8] dark:border-[#2C2C2C] p-4 flex items-center justify-between bg-[#EFECE4]/30 dark:bg-[#151515]">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#B89B5E]" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider">
                      Insured Express Courier (2-4 Business Days)
                    </p>
                    <p className="text-[11px] text-[#8A8A8A]">
                      Dispatched in bespoke garment preservation boxes
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold uppercase">
                  {estimatedShipping === 0 ? 'Complimentary' : formatPrice(estimatedShipping)}
                </span>
              </div>
            </div>

            {/* 4. Payment Simulation */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl uppercase tracking-wide">
                  4. Payment Details (Simulated)
                </h2>
                <span className="text-[11px] text-[#8A8A8A] flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#4F7A5A]" /> Test Environment
                </span>
              </div>

              {/* Realistic Credit Card Preview Card */}
              <div className="mb-6 bg-gradient-to-tr from-[#111111] via-[#1E1E1E] to-[#2B2720] text-[#F7F5F0] p-6 rounded-lg shadow-xl border border-[#3A3A3A] relative overflow-hidden max-w-sm">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-serif text-sm tracking-[0.2em] font-semibold text-[#B89B5E]">VELORA BLACK</span>
                  <CreditCard className="w-6 h-6 text-[#D4CFC4]" />
                </div>
                <div className="text-lg sm:text-xl font-mono tracking-widest mb-6">
                  {formData.cardNumber || '•••• •••• •••• ••••'}
                </div>
                <div className="flex justify-between items-end text-xs uppercase tracking-wider">
                  <div>
                    <span className="text-[9px] text-[#8A8A8A] block">Cardholder</span>
                    <span className="font-medium">{formData.cardName || 'YOUR NAME'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#8A8A8A] block">Expires</span>
                    <span className="font-medium">{formData.cardExpiry || 'MM/YY'}</span>
                  </div>
                </div>
              </div>

              {/* Payment inputs */}
              <div className="space-y-3">
                <div>
                  <input
                    type="text"
                    value={formData.cardName}
                    onChange={(e) => handleChange('cardName', e.target.value.toUpperCase())}
                    placeholder="Name on Card"
                    className={`w-full bg-transparent px-4 py-3 text-xs uppercase tracking-wider border ${
                      errors.cardName ? 'border-[#A84D4D]' : 'border-[#E5E1D8] dark:border-[#2C2C2C]'
                    } focus:border-[#111111] dark:focus:border-[#F7F5F0] focus:outline-none transition-colors`}
                  />
                  {errors.cardName && <p className="text-[11px] text-[#A84D4D] mt-1">{errors.cardName}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="Card Number (4532 •••• •••• ••••)"
                    className={`w-full bg-transparent px-4 py-3 text-xs tracking-wider border ${
                      errors.cardNumber ? 'border-[#A84D4D]' : 'border-[#E5E1D8] dark:border-[#2C2C2C]'
                    } focus:border-[#111111] dark:focus:border-[#F7F5F0] focus:outline-none transition-colors`}
                  />
                  {errors.cardNumber && <p className="text-[11px] text-[#A84D4D] mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      value={formData.cardExpiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className={`w-full bg-transparent px-4 py-3 text-xs border ${
                        errors.cardExpiry ? 'border-[#A84D4D]' : 'border-[#E5E1D8] dark:border-[#2C2C2C]'
                      } focus:border-[#111111] dark:focus:border-[#F7F5F0] focus:outline-none transition-colors`}
                    />
                    {errors.cardExpiry && <p className="text-[11px] text-[#A84D4D] mt-1">{errors.cardExpiry}</p>}
                  </div>

                  <div>
                    <input
                      type="password"
                      maxLength={4}
                      value={formData.cardCvv}
                      onChange={(e) => handleChange('cardCvv', e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="CVV"
                      className={`w-full bg-transparent px-4 py-3 text-xs border ${
                        errors.cardCvv ? 'border-[#A84D4D]' : 'border-[#E5E1D8] dark:border-[#2C2C2C]'
                      } focus:border-[#111111] dark:focus:border-[#F7F5F0] focus:outline-none transition-colors`}
                    />
                    {errors.cardCvv && <p className="text-[11px] text-[#A84D4D] mt-1">{errors.cardCvv}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] py-4 text-xs uppercase tracking-luxury font-semibold hover:bg-[#B89B5E] dark:hover:bg-[#B89B5E] dark:hover:text-white transition-all transform hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Authorization...</span>
                  </>
                ) : (
                  <span>Place Order • {formatPrice(orderTotal)}</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-[#EFECE4] dark:bg-[#181818] p-6 sm:p-8 border border-[#E5E1D8] dark:border-[#2C2C2C] sticky top-24 space-y-6">
            <h3 className="font-serif text-xl uppercase tracking-wide border-b border-[#E5E1D8] dark:border-[#2C2C2C] pb-4">
              Order Items ({cartItems.length})
            </h3>

            {/* Thumbnail items list */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1 divide-y divide-[#E5E1D8]/60 dark:divide-[#2C2C2C]/60">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 pt-4 first:pt-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-20 object-cover bg-[#EAE6DD] dark:bg-[#202020] shrink-0"
                  />
                  <div className="flex-1 text-xs">
                    <p className="font-serif text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-[11px] text-[#8A8A8A] mt-0.5">
                      Size: {item.size} {item.color?.name && `• ${item.color.name}`}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[#8A8A8A]">Qty: {item.quantity}</span>
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="pt-4 border-t border-[#E5E1D8] dark:border-[#2C2C2C] space-y-2.5 text-xs uppercase tracking-wider">
              <div className="flex justify-between text-[#777777]">
                <span>Subtotal</span>
                <span className="text-[#111111] dark:text-[#F7F5F0]">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#4F7A5A]">
                  <span>Discount ({appliedPromo?.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#777777]">
                <span>Delivery</span>
                <span className="text-[#111111] dark:text-[#F7F5F0]">
                  {estimatedShipping === 0 ? 'Complimentary' : formatPrice(estimatedShipping)}
                </span>
              </div>

              <div className="flex justify-between text-[#777777]">
                <span>Taxes</span>
                <span className="text-[#111111] dark:text-[#F7F5F0]">Included</span>
              </div>
            </div>

            {/* Final Total */}
            <div className="pt-4 border-t border-[#E5E1D8] dark:border-[#2C2C2C] flex items-baseline justify-between">
              <span className="font-serif text-lg uppercase tracking-wide">Total</span>
              <span className="font-serif text-2xl font-semibold">{formatPrice(orderTotal)}</span>
            </div>

            <div className="pt-2 text-[11px] text-[#8A8A8A] leading-relaxed">
              By placing your order, you agree to VELORA Atelier's terms of service and carbon-neutral transit policy.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
