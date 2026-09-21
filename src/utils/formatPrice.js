/**
 * Format numeric price into INR currency string: ₹4,490
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  if (typeof amount !== 'number') return '₹0'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}
