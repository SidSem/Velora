import { useState, useEffect } from 'react'

/**
 * Custom hook to monitor scroll position and scroll direction
 */
export function useScrollDirection(threshold = 40) {
  const [scrollDir, setScrollDir] = useState('up')
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let lastScrollY = window.pageYOffset

    const updateScrollDir = () => {
      const currentScrollY = window.pageYOffset
      setScrollY(currentScrollY)
      setIsScrolled(currentScrollY > threshold)

      if (Math.abs(currentScrollY - lastScrollY) < 10) {
        return
      }

      setScrollDir(currentScrollY > lastScrollY ? 'down' : 'up')
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0
    }

    window.addEventListener('scroll', updateScrollDir, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollDir)
  }, [threshold])

  return { scrollDir, isScrolled, scrollY }
}
