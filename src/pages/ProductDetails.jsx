import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronDown,
  Ruler,
  Check,
  Share2
} from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { formatPrice } from '../utils/formatPrice'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/product/ProductCard'
import Breadcrumbs from '../components/common/Breadcrumbs'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { openSizeGuide, showToast } = useApp()

  const product = PRODUCTS.find(p => p.id === Number(id))

  // Local state
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState('details') // 'details' | 'material' | 'fit' | 'shipping'

  // Sync state on product id change
  useEffect(() => {
    if (product) {
      setActiveImageIndex(0)
      setSelectedSize(product.sizes?.[0] || '')
      setSelectedColor(product.colors?.[0] || null)
      setQuantity(1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [id, product])

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl mb-4">Piece Not Found</h2>
        <p className="text-sm text-[#8A8A8A] mb-8">
          The garment you are looking for may have been archived or retired from our active collection.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] text-xs uppercase tracking-luxury font-medium hover:bg-[#B89B5E] transition-colors"
        >
          Return to Atelier Catalog
        </Link>
      </div>
    )
  }

  const isFavorited = isInWishlist(product.id)

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPos({ x, y })
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity, true)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      showToast('Link copied to clipboard', 'info')
    }
  }

  // Related products
  const relatedProducts = PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop', to: '/shop' },
          { label: product.category, to: `/shop?category=${product.category.toLowerCase()}` },
          { label: product.name }
        ]}
      />

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-4 pb-16">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto no-scrollbar shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-22 sm:w-20 sm:h-28 bg-[#EAE6DD] dark:bg-[#202020] overflow-hidden border transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#111111] dark:border-[#F7F5F0] opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Large Active Image with Zoom */}
          <div
            className="relative flex-1 aspect-[3/4] bg-[#EAE6DD] dark:bg-[#1E1E1E] overflow-hidden cursor-crosshair group"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover object-center transition-transform duration-300 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    }
                  : undefined
              }
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
              {product.isNew && (
                <span className="bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] text-[9px] font-semibold tracking-luxury uppercase px-2.5 py-1">
                  New Season
                </span>
              )}
              {product.oldPrice && (
                <span className="bg-[#A84D4D] text-white text-[9px] font-semibold tracking-luxury uppercase px-2.5 py-1">
                  Sale Archive
                </span>
              )}
            </div>

            {/* Zoom Hint */}
            <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-xs text-white text-[10px] tracking-luxury uppercase px-2 py-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              Hover to Inspect
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Commerce Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header / Category & Rating */}
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-luxury text-[#8A8A8A] mb-2">
                <span>VELORA Atelier • {product.gender}</span>
                <div className="flex items-center gap-1.5">
                  <span className="flex text-[#B89B5E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </span>
                  <span className="text-[#111111] dark:text-[#F7F5F0] font-semibold">{product.rating}</span>
                  <span>({product.reviews} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-normal uppercase tracking-tight text-[#111111] dark:text-[#F7F5F0] leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-medium text-[#111111] dark:text-[#F7F5F0]">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-[#8A8A8A] line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                <span className="text-[11px] text-[#8A8A8A] uppercase tracking-wider">
                  Tax included.
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#555555] dark:text-[#AAAAAA] leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-2.5">
                  <span className="text-[#8A8A8A]">Selected Shade:</span>
                  <span className="font-medium text-[#111111] dark:text-[#F7F5F0]">
                    {selectedColor?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full transition-all relative flex items-center justify-center ${
                        selectedColor?.name === c.name
                          ? 'ring-2 ring-[#111111] dark:ring-[#F7F5F0] ring-offset-2 ring-offset-[#F7F5F0] dark:ring-offset-[#111111]'
                          : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex, border: '1px solid rgba(0,0,0,0.15)' }}
                      title={c.name}
                    >
                      {selectedColor?.name === c.name && (
                        <Check className={`w-4 h-4 ${c.hex === '#FFFFFF' || c.hex === '#FAF8F5' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector & Guide */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-2.5">
                  <span className="text-[#8A8A8A]">Select Size:</span>
                  <button
                    type="button"
                    onClick={openSizeGuide}
                    className="flex items-center gap-1 text-[11px] underline tracking-wider text-[#8A8A8A] hover:text-[#B89B5E] transition-colors"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size & Fit Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-12 px-4 py-2.5 text-xs uppercase font-medium border transition-colors ${
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

            {/* Quantity Selector */}
            <div className="pt-2">
              <span className="block text-xs uppercase tracking-wider text-[#8A8A8A] mb-2">
                Quantity:
              </span>
              <div className="inline-flex items-center border border-[#E5E1D8] dark:border-[#2C2C2C]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-[#EAE6DD] dark:hover:bg-[#252525] transition-colors text-sm"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-5 py-2 text-xs font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-[#EAE6DD] dark:hover:bg-[#252525] transition-colors text-sm"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] py-4 px-6 text-xs uppercase tracking-luxury font-semibold hover:bg-[#B89B5E] dark:hover:bg-[#B89B5E] dark:hover:text-white transition-all transform hover:-translate-y-0.5 shadow-sm"
                >
                  Add to Bag • {formatPrice(product.price * quantity)}
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className="p-4 border border-[#E5E1D8] dark:border-[#2C2C2C] hover:border-[#B89B5E] transition-colors"
                  aria-label="Wishlist toggle"
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#A84D4D] text-[#A84D4D]' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-4 border border-[#E5E1D8] dark:border-[#2C2C2C] hover:border-[#B89B5E] transition-colors"
                  aria-label="Share piece"
                  title="Share"
                >
                  <Share2 className="w-5 h-5 text-[#8A8A8A]" />
                </button>
              </div>
            </div>

            {/* Reassurances */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#E5E1D8] dark:border-[#2C2C2C] text-xs text-[#777777]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B89B5E] shrink-0" />
                <span>Complimentary Delivery &gt; ₹5,000</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#B89B5E] shrink-0" />
                <span>30-Day Effortless Returns</span>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="pt-4 border-t border-[#E5E1D8] dark:border-[#2C2C2C] divide-y divide-[#E5E1D8] dark:divide-[#2C2C2C]">
              {/* Details Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'details' ? '' : 'details')}
                  className="w-full py-4 flex items-center justify-between text-xs font-semibold uppercase tracking-luxury text-left"
                >
                  <span>Product Details</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'details' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'details' && (
                  <div className="pb-4 text-xs text-[#666666] dark:text-[#AAAAAA] space-y-2">
                    <ul className="list-disc list-inside space-y-1.5 leading-relaxed">
                      {product.details?.map((d, idx) => (
                        <li key={idx}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Material & Care Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'material' ? '' : 'material')}
                  className="w-full py-4 flex items-center justify-between text-xs font-semibold uppercase tracking-luxury text-left"
                >
                  <span>Composition & Provenance</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'material' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'material' && (
                  <div className="pb-4 text-xs text-[#666666] dark:text-[#AAAAAA] space-y-2 leading-relaxed">
                    <p><strong>Primary Fiber:</strong> {product.material}</p>
                    <p>Every fiber is ethically tracked from regenerative partner farms through closed-loop finishing facilities in Florence and Normandy.</p>
                  </div>
                )}
              </div>

              {/* Shipping Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
                  className="w-full py-4 flex items-center justify-between text-xs font-semibold uppercase tracking-luxury text-left"
                >
                  <span>Complimentary Shipping & Returns</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pb-4 text-xs text-[#666666] dark:text-[#AAAAAA] space-y-2 leading-relaxed">
                    <p>Orders are dispatched in biodegradable FSC-certified boxes accompanied by a cotton garment cover. Standard insured transit takes 2-4 business days.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-16 border-t border-[#E5E1D8] dark:border-[#2C2C2C]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl uppercase font-normal tracking-tight">
              Complete The Look
            </h3>
            <Link
              to={`/shop?category=${product.category.toLowerCase()}`}
              className="text-xs uppercase tracking-luxury text-[#B89B5E] hover:underline"
            >
              More in {product.category}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
