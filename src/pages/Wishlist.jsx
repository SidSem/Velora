import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'
import Breadcrumbs from '../components/common/Breadcrumbs'

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleMoveToBag = (product) => {
    const size = product.sizes?.[0] || 'M'
    const color = product.colors?.[0] || null
    addToCart(product, size, color, 1, true)
    removeFromWishlist(product.id)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      <Breadcrumbs items={[{ label: 'Wishlist' }]} />

      {/* Header */}
      <div className="py-8 border-b border-[#E5E1D8] dark:border-[#2C2C2C] mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E] block mb-1">
            Personal Registry
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl uppercase font-normal tracking-tight">
            My Wishlist ({wishlistItems.length})
          </h1>
        </div>

        {wishlistItems.length > 0 && (
          <button
            type="button"
            onClick={clearWishlist}
            className="text-xs uppercase tracking-luxury text-[#8A8A8A] hover:text-[#A84D4D] transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {wishlistItems.length === 0 ? (
        <div className="py-24 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#EAE6DD] dark:bg-[#202020] mx-auto flex items-center justify-center text-[#8A8A8A]">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide">
            Your wishlist is waiting.
          </h2>
          <p className="text-xs sm:text-sm text-[#777777] dark:text-[#AAAAAA] leading-relaxed">
            Curate your ideal wardrobe. Save signature pieces as you explore and revisit them at your leisure.
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
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="group relative flex flex-col">
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full bg-[#EAE6DD] dark:bg-[#202020] overflow-hidden">
                <Link to={`/product/${product.id}`} className="block w-full h-full">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Remove from wishlist */}
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/60 rounded-full text-[#A84D4D] hover:bg-white dark:hover:bg-black transition-colors"
                  aria-label="Remove from wishlist"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Info */}
              <div className="pt-3 pb-1 flex flex-col space-y-1">
                <span className="text-[10px] text-[#8A8A8A] uppercase tracking-luxury">
                  {product.category}
                </span>
                <Link
                  to={`/product/${product.id}`}
                  className="font-serif text-sm font-medium hover:text-[#B89B5E] transition-colors line-clamp-1"
                >
                  {product.name}
                </Link>
                <div className="flex items-baseline gap-2 text-xs font-medium">
                  <span>{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="text-[11px] text-[#8A8A8A] line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>

                {/* Move to bag button */}
                <button
                  type="button"
                  onClick={() => handleMoveToBag(product)}
                  className="mt-3 w-full py-2.5 px-3 bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] text-xs uppercase tracking-luxury font-medium hover:bg-[#B89B5E] dark:hover:bg-[#B89B5E] dark:hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move To Bag</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
