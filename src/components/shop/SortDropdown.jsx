import { ChevronDown } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured Curations' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name-asc', label: 'Alphabetical: A → Z' },
  { value: 'rating', label: 'Client Rating: High → Low' },
]

export default function SortDropdown({ sortBy, setSortBy }) {
  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center space-x-2 text-xs uppercase tracking-wider">
        <span className="text-[#8A8A8A] hidden sm:inline">Sort:</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-transparent border border-[#E5E1D8] dark:border-[#2C2C2C] px-3.5 py-2 pr-8 text-xs uppercase tracking-wider focus:outline-none focus:border-[#111111] dark:focus:border-[#F7F5F0] cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#F7F5F0] dark:bg-[#181818] text-[#111111] dark:text-[#F7F5F0]">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#8A8A8A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
