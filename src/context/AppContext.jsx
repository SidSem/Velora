import { createContext, useContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useLocalStorage('velora_theme', 'light')

  // Search overlay state
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useLocalStorage('velora_recent_searches', [
    'Cashmere', 'Linen shirt', 'Wide leg', 'Wool coat', 'Silk dress'
  ])

  // Quick View modal state
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  // Size Guide modal state
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)

  // Toast notifications queue
  const [toasts, setToasts] = useState([])

  // Newsletter subscription status
  const [isSubscribed, setIsSubscribed] = useLocalStorage('velora_newsletter_subscribed', false)

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const showToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4)
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const openQuickView = (product) => {
    setQuickViewProduct(product)
  }

  const closeQuickView = () => {
    setQuickViewProduct(null)
  }

  const openSearch = () => setIsSearchOpen(true)
  const closeSearch = () => setIsSearchOpen(false)

  const addRecentSearch = (term) => {
    if (!term || !term.trim()) return
    const clean = term.trim()
    setRecentSearches(prev => [clean, ...prev.filter(t => t.toLowerCase() !== clean.toLowerCase())].slice(0, 8))
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
  }

  const subscribeNewsletter = (email) => {
    setIsSubscribed(true)
    showToast(`Subscribed successfully with ${email}`, 'success')
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isSearchOpen,
        openSearch,
        closeSearch,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isSizeGuideOpen,
        openSizeGuide: () => setIsSizeGuideOpen(true),
        closeSizeGuide: () => setIsSizeGuideOpen(false),
        toasts,
        showToast,
        removeToast,
        isSubscribed,
        subscribeNewsletter,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
