import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const MESSAGES = [
  { text: 'FREE COMPLIMENTARY SHIPPING ON ORDERS OVER ₹5,000', link: '/shop' },
  { text: 'EXPLORE THE AUTUMN / WINTER 2026 EDITORIAL COLLECTION', link: '/shop' },
  { text: 'EFFORTLESS RETURNS & EXCHANGES WITHIN 30 DAYS', link: '/about' }
]

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % MESSAGES.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const current = MESSAGES[currentIndex]

  return (
    <div className="bg-[#111111] dark:bg-[#090909] text-[#F7F5F0] text-[11px] sm:text-xs tracking-luxury uppercase py-2 px-4 border-b border-[#222222] z-50 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[20px] text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <Link to={current.link} className="hover:text-[#B89B5E] transition-colors flex items-center gap-1.5 font-medium">
              <span>{current.text}</span>
              <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 text-[#B89B5E]" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
