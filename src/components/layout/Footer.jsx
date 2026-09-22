import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function Footer() {
  const { openSizeGuide, isSubscribed, subscribeNewsletter } = useApp()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address')
      return
    }
    setError('')
    subscribeNewsletter(email)
    setEmail('')
  }

  return (
    <footer className="bg-[#111111] dark:bg-[#0A0A0A] text-[#F7F5F0] border-t border-[#222222] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter / Brand Statement Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#282828]">
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-[0.25em] uppercase">
                VELORA
              </span>
            </Link>
            <p className="text-[#999999] text-sm max-w-sm leading-relaxed">
              Defined by simplicity. Pure silhouettes, natural fibers, and quiet luxury tailored for the discerning modern wardrobe.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="max-w-md lg:ml-auto">
              <h3 className="text-xs font-semibold tracking-luxury uppercase text-[#B89B5E] mb-2">
                VELORA Gazette
              </h3>
              <p className="text-sm text-[#CCCCCC] mb-4">
                Receive private invitations to seasonal presentations, previews, and editorial stories.
              </p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 p-3 bg-[#1C1C1C] border border-[#333333] text-sm text-[#B89B5E]">
                  <Check className="w-4 h-4 text-[#4F7A5A]" />
                  <span>You are subscribed to the VELORA Gazette.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError('')
                      }}
                      placeholder="Enter your email address"
                      aria-label="Email address for newsletter"
                      className="w-full bg-[#1C1C1C] text-[#F7F5F0] text-sm px-4 py-3 pr-12 border border-[#333333] focus:border-[#B89B5E] focus:outline-none transition-colors placeholder:text-[#666666]"
                    />
                    <button
                      type="submit"
                      className="absolute right-1 p-2 text-[#999999] hover:text-[#B89B5E] transition-colors focus:outline-none"
                      aria-label="Subscribe to newsletter"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  {error && <p className="text-xs text-[#E57373] mt-1">{error}</p>}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#282828] text-sm">
          {/* Shop Column */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E] mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-[#AAAAAA]">
              <li>
                <Link to="/shop?filter=new" className="hover:text-[#F7F5F0] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop?gender=women" className="hover:text-[#F7F5F0] transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/shop?gender=men" className="hover:text-[#F7F5F0] transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#F7F5F0] transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=bestseller" className="hover:text-[#F7F5F0] transition-colors">
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E] mb-4">
              About
            </h4>
            <ul className="space-y-2.5 text-[#AAAAAA]">
              <li>
                <Link to="/about" className="hover:text-[#F7F5F0] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-[#F7F5F0] transition-colors">
                  The Journal
                </Link>
              </li>
              <li>
                <Link to="/about#craftsmanship" className="hover:text-[#F7F5F0] transition-colors">
                  Craftsmanship & Fibers
                </Link>
              </li>
              <li>
                <Link to="/about#sustainability" className="hover:text-[#F7F5F0] transition-colors">
                  Sustainable Practices
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E] mb-4">
              Concierge
            </h4>
            <ul className="space-y-2.5 text-[#AAAAAA]">
              <li>
                <button
                  type="button"
                  onClick={openSizeGuide}
                  className="hover:text-[#F7F5F0] transition-colors text-left"
                >
                  Size & Fit Guide
                </button>
              </li>
              <li>
                <Link to="/about#shipping" className="hover:text-[#F7F5F0] transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/about#returns" className="hover:text-[#F7F5F0] transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <a href="mailto:concierge@velora-fashion.com" className="hover:text-[#F7F5F0] transition-colors">
                  concierge@velora.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Presence Column */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E] mb-4">
              Follow
            </h4>
            <ul className="space-y-2.5 text-[#AAAAAA]">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F7F5F0] transition-colors">
                  Instagram @velorastudios
                </a>
              </li>
              <li>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F7F5F0] transition-colors">
                  Pinterest Moodboards
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F7F5F0] transition-colors">
                  Facebook Archive
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777] gap-4">
          <p>© 2026 VELORA Atelier Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px] tracking-wider uppercase">
            <span>Designed in Florence</span>
            <span>Worldwide Shipping</span>
            <span>Pure Frontend Showcase</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
