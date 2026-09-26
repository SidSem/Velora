import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

// Context Providers
import { AppProvider } from './context/AppContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

// Layout Components
import AnnouncementBar from './components/layout/AnnouncementBar'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/drawers/CartDrawer'
import SearchOverlay from './components/drawers/SearchOverlay'
import ProductQuickView from './components/product/ProductQuickView'
import SizeGuideModal from './components/common/SizeGuideModal'
import Toast from './components/common/Toast'
import LoadingScreen from './components/common/LoadingScreen'
import ScrollToTop from './components/common/ScrollToTop'

// Pages
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Journal from './pages/Journal'
import About from './pages/About'
import NotFound from './pages/NotFound'

function AppContent() {
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    // Show subtle branded loading intro for 800ms
    const timer = setTimeout(() => {
      setInitialLoading(false)
    }, 750)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] dark:bg-[#111111] text-[#111111] dark:text-[#F7F5F0] transition-colors duration-300 selection:bg-[#B89B5E] selection:text-white">
      {/* Initial Branded Loader */}
      <AnimatePresence>
        {initialLoading && <LoadingScreen />}
      </AnimatePresence>

      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Interactive Overlays & Modals */}
      <CartDrawer />
      <SearchOverlay />
      <ProductQuickView />
      <SizeGuideModal />
      <Toast />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AppProvider>
    </Router>
  )
}
