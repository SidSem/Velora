import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import { useApp } from '../../context/AppContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const { isScrolled } = useScrollDirection(30)
  const { theme, toggleTheme, openSearch } = useApp()
  const { totalItems, openCart } = useCart()
  const { wishlistCount } = useWishlist()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isHome = location.pathname === '/'

  const navLinks = [
    { name: 'New Arrivals', to: '/shop?filter=new' },
    { name: 'Women', to: '/shop?gender=women' },
    { name: 'Men', to: '/shop?gender=men' },
    { name: 'Collections', to: '/shop' },
    { name: 'Journal', to: '/journal' },
    { name: 'About', to: '/about' },
  ]

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-nav border-b border-[#E5E1D8] dark:border-[#2C2C2C] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] py-3'
            : isHome
            ? 'bg-transparent py-5 border-b border-transparent'
            : 'bg-[#F7F5F0] dark:bg-[#111111] py-4.5 border-b border-[#E5E1D8]/60 dark:border-[#2C2C2C]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 -ml-1 text-[#111111] dark:text-[#F7F5F0] hover:text-[#B89B5E] transition-colors focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="group flex flex-col items-center sm:items-start text-left focus:outline-none"
              >
                <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.25em] text-[#111111] dark:text-[#F7F5F0] uppercase transition-colors group-hover:text-[#B89B5E]">
                  VELORA
                </span>
                <span className="text-[9px] tracking-luxury uppercase text-[#8A8A8A] dark:text-[#9B9B9B] -mt-1 hidden sm:block">
                  Simplicity Defined
                </span>
              </Link>
            </div>

            {/* Desktop Center Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-[13px] tracking-wide-editorial uppercase font-medium transition-colors relative py-1 hover:text-[#B89B5E] ${
                      isActive
                        ? 'text-[#111111] dark:text-[#F7F5F0] font-semibold'
                        : 'text-[#555555] dark:text-[#AAAAAA]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B89B5E]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-1.5 text-[#111111] dark:text-[#F7F5F0] hover:text-[#B89B5E] transition-colors rounded-full focus:outline-none"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#B89B5E]" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                )}
              </button>

              {/* Search Icon */}
              <button
                type="button"
                onClick={openSearch}
                className="p-1.5 text-[#111111] dark:text-[#F7F5F0] hover:text-[#B89B5E] transition-colors rounded-full focus:outline-none"
                aria-label="Search collection"
                title="Search collection"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Wishlist Link with Badge */}
              <Link
                to="/wishlist"
                className="relative p-1.5 text-[#111111] dark:text-[#F7F5F0] hover:text-[#B89B5E] transition-colors rounded-full focus:outline-none hidden sm:block"
                aria-label="View wishlist"
                title="View wishlist"
              >
                <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium leading-none"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>

              {/* Bag Button with Animated Badge */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-1.5 text-[#111111] dark:text-[#F7F5F0] hover:text-[#B89B5E] transition-colors rounded-full focus:outline-none"
                aria-label="Open shopping bag"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-1 -right-1 bg-[#B89B5E] text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-semibold leading-none shadow-sm"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  )
}
