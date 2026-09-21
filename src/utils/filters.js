/**
 * Filter and sort products according to user criteria
 */
export function filterProducts(products, {
  category = 'all',
  gender = 'all',
  selectedSizes = [],
  selectedColors = [],
  minPrice = 0,
  maxPrice = 30000,
  onlyInStock = false,
  onlyNew = false,
  onlySale = false,
  searchQuery = '',
  sortBy = 'featured'
}) {
  let result = [...products]

  // Search query filter
  if (searchQuery && searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q)
    )
  }

  // Category filter
  if (category && category !== 'all') {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase())
  }

  // Gender filter
  if (gender && gender !== 'all') {
    result = result.filter(p => p.gender.toLowerCase() === gender.toLowerCase() || p.gender.toLowerCase() === 'unisex')
  }

  // Size filter
  if (selectedSizes.length > 0) {
    result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)))
  }

  // Color filter
  if (selectedColors.length > 0) {
    result = result.filter(p => p.colors.some(c => selectedColors.includes(c.name) || selectedColors.includes(c.hex)))
  }

  // Price range
  result = result.filter(p => p.price >= minPrice && p.price <= maxPrice)

  // Status flags
  if (onlyNew) {
    result = result.filter(p => p.isNew)
  }
  if (onlySale) {
    result = result.filter(p => p.oldPrice && p.oldPrice > p.price)
  }

  // Sorting
  switch (sortBy) {
    case 'newest':
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.id - a.id)
      break
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'featured':
    default:
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
      break
  }

  return result
}
