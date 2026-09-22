import { createContext, useContext, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useApp } from './AppContext'

const CartContext = createContext(null)

export const FREE_SHIPPING_THRESHOLD = 5000

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage('velora_cart', [])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [appliedPromo, setAppliedPromo] = useLocalStorage('velora_promo', null)
  const { showToast } = useApp()

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen(prev => !prev)

  const addToCart = (product, size, color, quantity = 1, shouldOpenDrawer = true) => {
    if (!size) {
      showToast('Please select a size', 'error')
      return false
    }

    const selectedColor = color || (product.colors && product.colors[0]) || { name: 'Default', hex: '#111111' }
    const cartItemId = `${product.id}-${selectedColor.name}-${size}`

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        }
        return updated
      } else {
        return [
          ...prev,
          {
            cartItemId,
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.images[0],
            color: selectedColor,
            size,
            quantity
          }
        ]
      }
    })

    showToast(`Added "${product.name}" to your bag`, 'success')

    if (shouldOpenDrawer) {
      setIsCartOpen(true)
    }
    return true
  }

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId))
    showToast('Item removed from bag', 'info')
  }

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  // Calculations
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))

  // Promo code calculation
  const discountRate = appliedPromo?.rate || 0
  const discountAmount = Math.round(subtotal * discountRate)
  const estimatedShipping = subtotal === 0 || isFreeShipping ? 0 : 450
  const orderTotal = Math.max(0, subtotal - discountAmount + estimatedShipping)

  const applyPromoCode = (code) => {
    const clean = (code || '').trim().toUpperCase()
    if (clean === 'VELORA10') {
      setAppliedPromo({ code: 'VELORA10', rate: 0.1, description: '10% Privileged Collector Discount' })
      showToast('Promo code VELORA10 applied: 10% off', 'success')
      return { success: true }
    } else if (clean === 'FIRST15') {
      setAppliedPromo({ code: 'FIRST15', rate: 0.15, description: '15% First Order Welcome' })
      showToast('Promo code FIRST15 applied: 15% off', 'success')
      return { success: true }
    } else {
      showToast('Invalid promotional code', 'error')
      return { success: false, message: 'Invalid promotional code' }
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
    showToast('Promo code removed', 'info')
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isFreeShipping,
        amountToFreeShipping,
        freeShippingProgress,
        appliedPromo,
        discountAmount,
        estimatedShipping,
        orderTotal,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
