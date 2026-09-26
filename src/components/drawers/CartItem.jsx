import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatPrice'
import { useCart } from '../../context/CartContext'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart, closeCart } = useCart()

  return (
    <div className="flex gap-4 py-4 border-b border-[#E5E1D8]/60 dark:border-[#2C2C2C]/60">
      {/* Product Image */}
      <Link
        to={`/product/${item.id}`}
        onClick={closeCart}
        className="w-20 h-26 bg-[#EAE6DD] dark:bg-[#202020] shrink-0 overflow-hidden"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center"
        />
      </Link>

      {/* Info & Quantity */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <Link
              to={`/product/${item.id}`}
              onClick={closeCart}
              className="font-serif text-sm font-medium hover:text-[#B89B5E] transition-colors line-clamp-1 pr-2"
            >
              {item.name}
            </Link>
            <button
              type="button"
              onClick={() => removeFromCart(item.cartItemId)}
              className="text-[#999999] hover:text-[#A84D4D] transition-colors p-0.5"
              aria-label="Remove item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-[#8A8A8A] mt-1">
            Size: {item.size} {item.color?.name && `• ${item.color.name}`}
          </p>

          <p className="text-xs font-medium text-[#111111] dark:text-[#F7F5F0] mt-1">
            {formatPrice(item.price)}
          </p>
        </div>

        {/* Bottom row with quantity adjuster and line total */}
        <div className="flex items-center justify-between mt-3">
          <div className="inline-flex items-center border border-[#E5E1D8] dark:border-[#2C2C2C]">
            <button
              type="button"
              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
              className="px-2.5 py-0.5 text-xs hover:bg-[#EAE6DD] dark:hover:bg-[#252525] transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-2.5 py-0.5 text-xs font-semibold">{item.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
              className="px-2.5 py-0.5 text-xs hover:bg-[#EAE6DD] dark:hover:bg-[#252525] transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <span className="text-xs font-semibold">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  )
}
