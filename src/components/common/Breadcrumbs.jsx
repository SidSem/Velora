import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null

  return (
    <nav aria-label="Breadcrumbs" className="py-4 text-[11px] uppercase tracking-luxury text-[#8A8A8A]">
      <ol className="flex items-center flex-wrap gap-2">
        <li>
          <Link to="/" className="hover:text-[#111111] dark:hover:text-[#F7F5F0] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-[#B0AAA0]" />
              {isLast || !item.to ? (
                <span className="text-[#111111] dark:text-[#F7F5F0] font-medium truncate max-w-[200px]">
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="hover:text-[#111111] dark:hover:text-[#F7F5F0] transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
