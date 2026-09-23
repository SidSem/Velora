import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/product/ProductCard'
import { useApp } from '../context/AppContext'

export default function Home() {
  const { isSubscribed, subscribeNewsletter } = useApp()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterError, setNewsletterError] = useState('')

  // Carousel ref for New Arrivals
  const carouselRef = useRef(null)

  const featuredProducts = PRODUCTS.filter(p => p.isFeatured).slice(0, 4)
  const newArrivals = PRODUCTS.filter(p => p.isNew)
  const bestsellerProducts = PRODUCTS.filter(p => p.isBestseller).slice(0, 4)

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!newsletterEmail || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
      setNewsletterError('Please enter a valid email address')
      return
    }
    setNewsletterError('')
    subscribeNewsletter(newsletterEmail)
    setNewsletterEmail('')
  }

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center -mt-[80px] pt-[80px] overflow-hidden bg-[#161616]">
        {/* Background Image with subtle zoom */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
            alt="VELORA Autumn Winter 2026 Collection"
            className="w-full h-full object-cover object-center filter brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-[#F7F5F0]">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xs sm:text-sm font-semibold tracking-luxury uppercase text-[#D4CFC4] mb-4"
          >
            Autumn / Winter 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight uppercase leading-[1.05] mb-8"
          >
            The Art of<br />
            <span className="italic font-light">Simplicity.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-[#F7F5F0] text-[#111111] text-xs uppercase tracking-luxury font-semibold hover:bg-[#B89B5E] hover:text-white transition-all transform hover:-translate-y-0.5 shadow-lg"
            >
              Explore Collection
            </Link>
            <Link
              to="/shop?filter=new"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#F7F5F0] text-[#F7F5F0] text-xs uppercase tracking-luxury font-semibold hover:bg-[#F7F5F0] hover:text-[#111111] transition-all transform hover:-translate-y-0.5 backdrop-blur-xs"
            >
              Shop New Arrivals
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-luxury uppercase text-[#8A8A8A]">
              Scroll to explore
            </span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[#B89B5E] to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* 2. EDITORIAL INTRO STATEMENT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <span className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E]">
            The VELORA Manifesto
          </span>
          <blockquote className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-tight text-[#111111] dark:text-[#F7F5F0]">
            “Clothing should speak quietly,
            <br />
            <span className="italic font-light text-[#8A8A8A]">but stay remembered.”</span>
          </blockquote>
          <p className="text-sm sm:text-base text-[#666666] dark:text-[#9B9B9B] max-w-xl mx-auto leading-relaxed pt-2">
            We abandon seasonal gimmicks in favor of pure silhouettes, certified natural fibers, and deliberate craftsmanship designed to endure for decades.
          </p>
        </motion.div>
      </section>

      {/* 3. FEATURED COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E5E1D8] dark:border-[#2C2C2C]">
          <div>
            <span className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E] block mb-1">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl uppercase font-normal tracking-tight">
              Featured Pieces
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 sm:mt-0 text-xs uppercase tracking-luxury font-medium text-[#111111] dark:text-[#F7F5F0] hover:text-[#B89B5E] transition-colors flex items-center gap-1.5"
          >
            <span>View All Curations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. CATEGORY SPLIT (WOMEN / MEN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Women Panel */}
          <Link
            to="/shop?gender=women"
            className="group relative h-[480px] sm:h-[620px] overflow-hidden bg-[#161616] flex items-end p-8 sm:p-12 text-[#F7F5F0]"
          >
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
              alt="Women Collection"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10 space-y-3">
              <span className="text-[11px] tracking-luxury uppercase text-[#D4CFC4]">
                Collection
              </span>
              <h3 className="font-serif text-4xl sm:text-5xl uppercase tracking-tight">
                Women
              </h3>
              <p className="text-xs text-[#BBBBBB] max-w-xs line-clamp-2">
                Fluid bias-cut silk slips, sculptural wide trousers, and cocooning double-faced cashmere coats.
              </p>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury font-medium text-[#B89B5E] group-hover:text-white transition-colors pt-2">
                <span>Explore Wardrobe</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* Men Panel */}
          <Link
            to="/shop?gender=men"
            className="group relative h-[480px] sm:h-[620px] overflow-hidden bg-[#161616] flex items-end p-8 sm:p-12 text-[#F7F5F0]"
          >
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
              alt="Men Collection"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10 space-y-3">
              <span className="text-[11px] tracking-luxury uppercase text-[#D4CFC4]">
                Collection
              </span>
              <h3 className="font-serif text-4xl sm:text-5xl uppercase tracking-tight">
                Men
              </h3>
              <p className="text-xs text-[#BBBBBB] max-w-xs line-clamp-2">
                Normandy linen overshirts, Japanese selvedge denim, and unconstructed Italian tropical wool blazers.
              </p>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury font-medium text-[#B89B5E] group-hover:text-white transition-colors pt-2">
                <span>Explore Wardrobe</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 5. NEW ARRIVALS HORIZONTAL CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#E5E1D8] dark:border-[#2C2C2C]">
          <div>
            <span className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E] block mb-1">
              Seasonal Release
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl uppercase font-normal tracking-tight">
              New Arrivals
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollCarousel('left')}
              className="p-2.5 border border-[#E5E1D8] dark:border-[#2C2C2C] hover:border-[#111111] dark:hover:border-[#F7F5F0] hover:text-[#B89B5E] transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel('right')}
              className="p-2.5 border border-[#E5E1D8] dark:border-[#2C2C2C] hover:border-[#111111] dark:hover:border-[#F7F5F0] hover:text-[#B89B5E] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {newArrivals.map((product) => (
            <div key={product.id} className="min-w-[260px] sm:min-w-[290px] md:min-w-[310px] shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 6. EDITORIAL SECTION (MAGAZINE STYLE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center bg-[#EFECE4] dark:bg-[#181818] p-8 sm:p-12 lg:p-16 border border-[#E5E1D8] dark:border-[#2C2C2C]">
          {/* Left Large Editorial Image */}
          <div className="lg:col-span-7 relative aspect-[4/5] overflow-hidden bg-[#111111]">
            <img
              src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1200&auto=format&fit=crop"
              alt="The New Minimalism Editorial"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/80 px-3 py-1 text-[10px] uppercase tracking-luxury text-[#111111] dark:text-[#F7F5F0] backdrop-blur-xs">
              Editorial AW26
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E]">
              Editorial Focus
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal uppercase leading-tight tracking-tight">
              The New<br />
              <span className="italic font-light">Minimalism</span>
            </h2>
            <p className="text-sm sm:text-base text-[#555555] dark:text-[#AAAAAA] leading-relaxed">
              We define true luxury not by ostentatious branding or fleeting trends, but by the weight of the weave, the clean line of a shoulder, and the quiet confidence of deliberate restraint.
            </p>
            <p className="text-xs sm:text-sm text-[#777777] dark:text-[#888888] leading-relaxed">
              Every garment in our collection is produced in limited runs alongside multi-generational artisans across Europe and Japan.
            </p>
            <div className="pt-2">
              <Link
                to="/journal"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury font-semibold text-[#111111] dark:text-[#F7F5F0] border-b border-[#111111] dark:border-[#F7F5F0] pb-1 hover:text-[#B89B5E] hover:border-[#B89B5E] transition-colors"
              >
                <span>Read The Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BESTSELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E] block mb-1">
            Wardrobe Staples
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl uppercase font-normal tracking-tight">
            Enduring Bestsellers
          </h2>
          <p className="text-xs sm:text-sm text-[#777777] dark:text-[#888888] mt-2">
            The most sought-after foundational pieces consistently favored by our patrons.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestsellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. NEWSLETTER / ATELIER PRIVILEGES */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-[#EFECE4] dark:bg-[#181818] border border-[#E5E1D8] dark:border-[#2C2C2C] p-8 sm:p-14 space-y-6">
          <span className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E]">
            Atelier Privileges
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl uppercase font-normal tracking-tight">
            Stay In The Loop
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] dark:text-[#AAAAAA] max-w-md mx-auto leading-relaxed">
            Receive first access to new seasonal collections, private archive releases, and editorial essays.
          </p>

          {isSubscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] dark:bg-[#222222] text-[#B89B5E] text-xs uppercase tracking-luxury">
              <Check className="w-4 h-4 text-[#4F7A5A]" />
              <span>You have joined the VELORA Collector Register</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value)
                    if (newsletterError) setNewsletterError('')
                  }}
                  placeholder="Enter your email address"
                  className="flex-1 bg-white dark:bg-[#111111] px-4 py-3 text-xs border border-[#E5E1D8] dark:border-[#333333] focus:border-[#111111] dark:focus:border-[#F7F5F0] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] text-xs uppercase tracking-luxury font-semibold hover:bg-[#B89B5E] dark:hover:bg-[#B89B5E] dark:hover:text-white transition-colors"
                >
                  Join
                </button>
              </div>
              {newsletterError && (
                <p className="text-xs text-[#A84D4D] text-left">{newsletterError}</p>
              )}
            </form>
          )}

          <p className="text-[10px] text-[#8A8A8A] uppercase tracking-luxury">
            Zero noise. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  )
}
