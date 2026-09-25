import { X, RotateCcw, Check } from 'lucide-react'
import { CATEGORIES } from '../../data/categories'
import { formatPrice } from '../../utils/formatPrice'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '28', '30', '32', '34', '36', 'One Size']

const COLOR_OPTIONS = [
  { name: 'Obsidian Black', hex: '#111111' },
  { name: 'Warm Cream', hex: '#F0ECE1' },
  { name: 'Oatmeal Ecru', hex: '#E8E2D6' },
  { name: 'Camel Tan', hex: '#B88B58' },
  { name: 'Sage Green', hex: '#7A8B7B' },
  { name: 'Charcoal Grey', hex: '#2C2D30' },
  { name: 'Raw Indigo', hex: '#1C273C' },
  { name: 'Cognac Brown', hex: '#7A3E20' },
]

export default function FilterPanel({
  filters,
  setFilters,
  resetFilters,
  totalResults,
  isMobile = false,
  onCloseMobile = () => {}
}) {
  const handleCategoryChange = (catSlug) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === catSlug ? 'all' : catSlug
    }))
  }

  const handleGenderChange = (gender) => {
    setFilters(prev => ({
      ...prev,
      gender: prev.gender === gender ? 'all' : gender
    }))
  }

  const toggleSize = (size) => {
    setFilters(prev => {
      const exists = prev.selectedSizes.includes(size)
      return {
        ...prev,
        selectedSizes: exists
          ? prev.selectedSizes.filter(s => s !== size)
          : [...prev.selectedSizes, size]
      }
    })
  }

  const toggleColor = (colorName) => {
    setFilters(prev => {
      const exists = prev.selectedColors.includes(colorName)
      return {
        ...prev,
        selectedColors: exists
          ? prev.selectedColors.filter(c => c !== colorName)
          : [...prev.selectedColors, colorName]
      }
    })
  }

  return (
    <div className={`space-y-8 ${isMobile ? 'p-6' : ''}`}>
      {/* Top filter header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E1D8] dark:border-[#2C2C2C]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-luxury uppercase">Filters</span>
          <span className="text-[11px] text-[#8A8A8A]">({totalResults} pieces)</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={resetFilters}
            className="text-[11px] uppercase tracking-wider text-[#8A8A8A] hover:text-[#111111] dark:hover:text-[#FFFFFF] flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          {isMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1 text-[#8A8A8A] hover:text-[#111111] dark:hover:text-[#FFFFFF]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Gender Filter */}
      <div>
        <h4 className="text-[11px] font-semibold tracking-luxury uppercase text-[#8A8A8A] mb-3">
          Audience
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {['all', 'women', 'men'].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => handleGenderChange(g)}
              className={`py-2 text-xs uppercase tracking-wider font-medium border transition-colors ${
                filters.gender === g
                  ? 'bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] border-[#111111] dark:border-[#F7F5F0]'
                  : 'bg-transparent border-[#E5E1D8] dark:border-[#2C2C2C] text-[#666666] dark:text-[#AAAAAA] hover:border-[#111111] dark:hover:border-[#F7F5F0]'
              }`}
            >
              {g === 'all' ? 'All' : g}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-[11px] font-semibold tracking-luxury uppercase text-[#8A8A8A] mb-3">
          Categories
        </h4>
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={`w-full text-left py-1.5 px-2 text-xs uppercase tracking-wider flex items-center justify-between transition-colors ${
                filters.category === cat.id
                  ? 'text-[#B89B5E] font-semibold bg-[#B89B5E]/10'
                  : 'text-[#555555] dark:text-[#AAAAAA] hover:text-[#111111] dark:hover:text-[#F7F5F0]'
              }`}
            >
              <span>{cat.name}</span>
              {filters.category === cat.id && <span className="text-xs">●</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h4 className="text-[11px] font-semibold tracking-luxury uppercase text-[#8A8A8A] mb-3">
          Size
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((size) => {
            const isSelected = filters.selectedSizes.includes(size)
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-2.5 py-1.5 text-xs uppercase font-medium border transition-colors ${
                  isSelected
                    ? 'bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] border-[#111111] dark:border-[#F7F5F0]'
                    : 'bg-transparent border-[#E5E1D8] dark:border-[#2C2C2C] text-[#666666] dark:text-[#AAAAAA] hover:border-[#111111] dark:hover:border-[#F7F5F0]'
                }`}
              >
                {size}
              </button>
            )
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h4 className="text-[11px] font-semibold tracking-luxury uppercase text-[#8A8A8A] mb-3">
          Color Palette
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {COLOR_OPTIONS.map((c) => {
            const isSelected = filters.selectedColors.includes(c.name)
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => toggleColor(c.name)}
                className={`flex flex-col items-center p-1.5 border transition-all ${
                  isSelected
                    ? 'border-[#B89B5E] bg-[#B89B5E]/10'
                    : 'border-transparent hover:border-[#E5E1D8] dark:hover:border-[#2C2C2C]'
                }`}
                title={c.name}
              >
                <div
                  className="w-5 h-5 rounded-full mb-1 flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: c.hex, border: '1px solid rgba(0,0,0,0.15)' }}
                >
                  {isSelected && (
                    <Check className={`w-3 h-3 ${c.hex === '#FFFFFF' || c.hex === '#F0ECE1' ? 'text-black' : 'text-white'}`} />
                  )}
                </div>
                <span className="text-[9px] text-center text-[#777777] line-clamp-1">
                  {c.name.split(' ')[0]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between text-[11px] font-semibold tracking-luxury uppercase text-[#8A8A8A] mb-3">
          <span>Max Price</span>
          <span className="text-[#111111] dark:text-[#F7F5F0] font-medium">
            {formatPrice(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="1990"
          max="25000"
          step="500"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-[#B89B5E] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#8A8A8A] mt-1 font-mono">
          <span>₹1,990</span>
          <span>₹25,000</span>
        </div>
      </div>

      {/* Checkbox Status Flags */}
      <div className="space-y-3 pt-2">
        <label className="flex items-center gap-2.5 text-xs uppercase tracking-wider cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.onlyNew}
            onChange={(e) => setFilters(prev => ({ ...prev, onlyNew: e.target.checked }))}
            className="rounded-none border-[#E5E1D8] accent-[#B89B5E] w-4 h-4 cursor-pointer"
          />
          <span>New Season Only</span>
        </label>

        <label className="flex items-center gap-2.5 text-xs uppercase tracking-wider cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.onlySale}
            onChange={(e) => setFilters(prev => ({ ...prev, onlySale: e.target.checked }))}
            className="rounded-none border-[#E5E1D8] accent-[#B89B5E] w-4 h-4 cursor-pointer"
          />
          <span>Privilege Archive Sale</span>
        </label>
      </div>

      {isMobile && (
        <div className="pt-4">
          <button
            type="button"
            onClick={onCloseMobile}
            className="w-full bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] py-3 text-xs uppercase tracking-luxury font-semibold"
          >
            Apply Filters ({totalResults} Pieces)
          </button>
        </div>
      )}
    </div>
  )
}
