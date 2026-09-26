import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-24">
      <span className="font-serif text-7xl sm:text-9xl font-light text-[#D4CFC4] dark:text-[#2C2C2C] mb-4">
        404
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl uppercase tracking-wide font-normal mb-3">
        Page Not Found
      </h1>
      <p className="text-sm text-[#777777] dark:text-[#AAAAAA] max-w-sm mb-8 leading-relaxed">
        The destination you requested does not exist or has been relocated within our atelier archive.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/"
          className="px-8 py-3.5 bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] text-xs uppercase tracking-luxury font-semibold hover:bg-[#B89B5E] transition-colors"
        >
          Return Home
        </Link>
        <Link
          to="/shop"
          className="px-8 py-3.5 border border-[#111111] dark:border-[#F7F5F0] text-[#111111] dark:text-[#F7F5F0] text-xs uppercase tracking-luxury font-semibold hover:bg-[#111111] hover:text-white dark:hover:bg-[#F7F5F0] dark:hover:text-[#111111] transition-colors flex items-center gap-2"
        >
          <span>Explore Shop</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
