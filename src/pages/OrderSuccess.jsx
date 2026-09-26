import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Package, Calendar, MapPin, CreditCard } from 'lucide-react'
import { formatPrice } from '../utils/formatPrice'

export default function OrderSuccess() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('velora_last_order')
      if (stored) {
        setOrder(JSON.parse(stored))
      } else {
        // Fallback demo order
        setOrder({
          orderNumber: 'VL-2026-48291',
          date: 'September 21, 2026',
          total: 18490,
          subtotal: 18490,
          shipping: 0,
          shippingAddress: {
            name: 'Elena Vance',
            address: '124 Via de Tornabuoni, Suite 4B',
            city: 'Florence, Tuscany',
            postalCode: '50123',
            email: 'elena.vance@atelier.com'
          },
          paymentMethod: 'Card ending in 8912',
          items: [
            {
              id: 3,
              name: 'Cocoon Cashmere Wrap Coat',
              price: 18490,
              quantity: 1,
              size: 'M',
              color: { name: 'Camel Tan' },
              image: 'https://images.unsplash.com/photo-1539533018447-63fcce667823?q=80&w=1000&auto=format&fit=crop'
            }
          ]
        })
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  if (!order) return null

  // Estimated delivery date (3 business days from now)
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 3)
  const formattedDelivery = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-28">
      {/* Animated Checkmark and Header */}
      <div className="text-center space-y-4 mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-18 h-18 bg-[#4F7A5A] text-white rounded-full mx-auto flex items-center justify-center shadow-lg"
        >
          <Check className="w-9 h-9 stroke-[2.5]" />
        </motion.div>

        <span className="text-xs font-semibold tracking-luxury uppercase text-[#B89B5E] block">
          Confirmation Receipt
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl uppercase font-normal tracking-tight">
          Order Confirmed
        </h1>

        <p className="text-sm text-[#777777] dark:text-[#AAAAAA] max-w-md mx-auto">
          Thank you for choosing VELORA. Your garments are being prepared for dispatch with utmost care.
        </p>

        <div className="inline-block bg-[#EFECE4] dark:bg-[#1C1C1C] px-4 py-2 border border-[#E5E1D8] dark:border-[#2C2C2C] text-xs font-mono tracking-widest mt-2">
          ORDER #{order.orderNumber}
        </div>
      </div>

      {/* Delivery & Address Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-xs">
        <div className="p-5 bg-[#EFECE4] dark:bg-[#181818] border border-[#E5E1D8] dark:border-[#2C2C2C] space-y-2">
          <div className="flex items-center gap-2 text-[#B89B5E] uppercase tracking-wider font-semibold">
            <Calendar className="w-4 h-4" />
            <span>Estimated Delivery</span>
          </div>
          <p className="font-medium text-sm text-[#111111] dark:text-[#F7F5F0]">
            {formattedDelivery}
          </p>
          <p className="text-[#8A8A8A]">Courier tracking will be sent to {order.shippingAddress?.email}</p>
        </div>

        <div className="p-5 bg-[#EFECE4] dark:bg-[#181818] border border-[#E5E1D8] dark:border-[#2C2C2C] space-y-2">
          <div className="flex items-center gap-2 text-[#B89B5E] uppercase tracking-wider font-semibold">
            <MapPin className="w-4 h-4" />
            <span>Destination</span>
          </div>
          <p className="font-medium text-[#111111] dark:text-[#F7F5F0]">
            {order.shippingAddress?.name}
          </p>
          <p className="text-[#8A8A8A] leading-relaxed">
            {order.shippingAddress?.address}, {order.shippingAddress?.city} {order.shippingAddress?.postalCode}
          </p>
        </div>

        <div className="p-5 bg-[#EFECE4] dark:bg-[#181818] border border-[#E5E1D8] dark:border-[#2C2C2C] space-y-2">
          <div className="flex items-center gap-2 text-[#B89B5E] uppercase tracking-wider font-semibold">
            <CreditCard className="w-4 h-4" />
            <span>Payment Method</span>
          </div>
          <p className="font-medium text-[#111111] dark:text-[#F7F5F0]">
            {order.paymentMethod}
          </p>
          <p className="text-[#8A8A8A]">Billed amount: {formatPrice(order.total)} (Taxes included)</p>
        </div>
      </div>

      {/* Purchased Items List */}
      <div className="border border-[#E5E1D8] dark:border-[#2C2C2C] p-6 sm:p-8 bg-[#EFECE4]/30 dark:bg-[#161616] mb-8">
        <h2 className="font-serif text-xl uppercase tracking-wide mb-6 pb-3 border-b border-[#E5E1D8] dark:border-[#2C2C2C]">
          Items Summary
        </h2>
        <div className="divide-y divide-[#E5E1D8]/60 dark:divide-[#2C2C2C]/60">
          {order.items?.map((item, idx) => (
            <div key={idx} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 object-cover bg-[#EAE6DD] dark:bg-[#202020]"
                />
                <div className="text-xs">
                  <p className="font-serif text-sm font-medium">{item.name}</p>
                  <p className="text-[#8A8A8A] mt-0.5">
                    Size: {item.size} {item.color?.name && `• ${item.color.name}`}
                  </p>
                  <p className="text-[#8A8A8A]">Quantity: {item.quantity}</p>
                </div>
              </div>
              <span className="text-sm font-medium">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="pt-6 border-t border-[#E5E1D8] dark:border-[#2C2C2C] space-y-2 text-xs uppercase tracking-wider max-w-xs ml-auto">
          <div className="flex justify-between text-[#777777]">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal || order.total)}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-[#4F7A5A]">
              <span>Discount</span>
              <span>-{formatPrice(order.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-[#777777]">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? 'Complimentary' : formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between text-sm font-serif font-semibold text-[#111111] dark:text-[#F7F5F0] pt-2 border-t border-[#E5E1D8] dark:border-[#2C2C2C]">
            <span>Total Paid</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Bottom CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/shop"
          className="w-full sm:w-auto px-8 py-4 bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] text-xs uppercase tracking-luxury font-semibold hover:bg-[#B89B5E] dark:hover:bg-[#B89B5E] dark:hover:text-white transition-colors text-center"
        >
          Continue Shopping
        </Link>
        <Link
          to="/journal"
          className="w-full sm:w-auto px-8 py-4 border border-[#111111] dark:border-[#F7F5F0] text-[#111111] dark:text-[#F7F5F0] text-xs uppercase tracking-luxury font-semibold hover:bg-[#111111] hover:text-[#F7F5F0] dark:hover:bg-[#F7F5F0] dark:hover:text-[#111111] transition-colors text-center"
        >
          Read The Journal
        </Link>
      </div>
    </div>
  )
}
