import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Ruler } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function SizeGuideModal() {
  const { isSizeGuideOpen, closeSizeGuide } = useApp()
  const [unit, setUnit] = useState('cm') // 'cm' | 'in'
  const [activeTab, setActiveTab] = useState('tops') // 'tops' | 'bottoms'

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeSizeGuide()
    }
    if (isSizeGuideOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isSizeGuideOpen, closeSizeGuide])

  if (!isSizeGuideOpen) return null

  const topsData = [
    { size: 'XS', chestCm: '86-91', chestIn: '34-36', waistCm: '71-76', waistIn: '28-30', shoulderCm: '42', shoulderIn: '16.5' },
    { size: 'S', chestCm: '91-96', chestIn: '36-38', waistCm: '76-81', waistIn: '30-32', shoulderCm: '44', shoulderIn: '17.3' },
    { size: 'M', chestCm: '96-101', chestIn: '38-40', waistCm: '81-86', waistIn: '32-34', shoulderCm: '46', shoulderIn: '18.1' },
    { size: 'L', chestCm: '101-106', chestIn: '40-42', waistCm: '86-91', waistIn: '34-36', shoulderCm: '48', shoulderIn: '18.9' },
    { size: 'XL', chestCm: '106-112', chestIn: '42-44', waistCm: '91-97', waistIn: '36-38', shoulderCm: '50', shoulderIn: '19.7' },
  ]

  const bottomsData = [
    { size: '28 / XS', waistCm: '71-74', waistIn: '28-29', hipCm: '88-91', hipIn: '34.5-36', inseamCm: '81', inseamIn: '32' },
    { size: '30 / S', waistCm: '76-79', waistIn: '30-31', hipCm: '93-96', hipIn: '36.5-38', inseamCm: '82', inseamIn: '32.5' },
    { size: '32 / M', waistCm: '81-84', waistIn: '32-33', hipCm: '98-101', hipIn: '38.5-40', inseamCm: '83', inseamIn: '32.8' },
    { size: '34 / L', waistCm: '86-89', waistIn: '34-35', hipCm: '103-106', hipIn: '40.5-42', inseamCm: '84', inseamIn: '33' },
    { size: '36 / XL', waistCm: '91-94', waistIn: '36-37', hipCm: '108-111', hipIn: '42.5-44', inseamCm: '85', inseamIn: '33.5' },
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSizeGuide}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#F7F5F0] dark:bg-[#181818] text-[#111111] dark:text-[#F7F5F0] border border-[#E5E1D8] dark:border-[#2C2C2C] shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E1D8] dark:border-[#2C2C2C]">
            <div className="flex items-center gap-2.5">
              <Ruler className="w-5 h-5 text-[#B89B5E]" />
              <h2 className="font-serif text-xl sm:text-2xl tracking-wide uppercase">
                Atelier Sizing Guide
              </h2>
            </div>
            <button
              onClick={closeSizeGuide}
              className="p-1 text-[#8A8A8A] hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between my-6">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('tops')}
                className={`text-xs uppercase tracking-wider px-3.5 py-1.5 transition-colors border ${
                  activeTab === 'tops'
                    ? 'bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] border-[#111111] dark:border-[#F7F5F0]'
                    : 'bg-transparent border-[#E5E1D8] dark:border-[#2C2C2C] text-[#666666] dark:text-[#AAAAAA]'
                }`}
              >
                Tops & Outerwear
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bottoms')}
                className={`text-xs uppercase tracking-wider px-3.5 py-1.5 transition-colors border ${
                  activeTab === 'bottoms'
                    ? 'bg-[#111111] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#111111] border-[#111111] dark:border-[#F7F5F0]'
                    : 'bg-transparent border-[#E5E1D8] dark:border-[#2C2C2C] text-[#666666] dark:text-[#AAAAAA]'
                }`}
              >
                Trousers & Denim
              </button>
            </div>

            {/* Units Toggle */}
            <div className="flex items-center text-xs border border-[#E5E1D8] dark:border-[#2C2C2C]">
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 font-medium transition-colors ${
                  unit === 'cm'
                    ? 'bg-[#B89B5E] text-white'
                    : 'text-[#666666] dark:text-[#AAAAAA]'
                }`}
              >
                CM
              </button>
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-3 py-1 font-medium transition-colors ${
                  unit === 'in'
                    ? 'bg-[#B89B5E] text-white'
                    : 'text-[#666666] dark:text-[#AAAAAA]'
                }`}
              >
                IN
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E5E1D8] dark:border-[#2C2C2C] text-[#8A8A8A] text-[11px] tracking-wider uppercase">
                  <th className="py-2.5 px-3">Size</th>
                  {activeTab === 'tops' ? (
                    <>
                      <th className="py-2.5 px-3">Chest ({unit.toUpperCase()})</th>
                      <th className="py-2.5 px-3">Waist ({unit.toUpperCase()})</th>
                      <th className="py-2.5 px-3">Shoulder ({unit.toUpperCase()})</th>
                    </>
                  ) : (
                    <>
                      <th className="py-2.5 px-3">Waist ({unit.toUpperCase()})</th>
                      <th className="py-2.5 px-3">Hips ({unit.toUpperCase()})</th>
                      <th className="py-2.5 px-3">Inseam ({unit.toUpperCase()})</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E1D8]/60 dark:divide-[#2C2C2C]/60">
                {(activeTab === 'tops' ? topsData : bottomsData).map((row) => (
                  <tr key={row.size} className="hover:bg-[#EBE7DC]/40 dark:hover:bg-[#202020] transition-colors">
                    <td className="py-3 px-3 font-semibold">{row.size}</td>
                    {activeTab === 'tops' ? (
                      <>
                        <td className="py-3 px-3 text-[#555555] dark:text-[#CCCCCC]">
                          {unit === 'cm' ? row.chestCm : row.chestIn}
                        </td>
                        <td className="py-3 px-3 text-[#555555] dark:text-[#CCCCCC]">
                          {unit === 'cm' ? row.waistCm : row.waistIn}
                        </td>
                        <td className="py-3 px-3 text-[#555555] dark:text-[#CCCCCC]">
                          {unit === 'cm' ? row.shoulderCm : row.shoulderIn}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-3 text-[#555555] dark:text-[#CCCCCC]">
                          {unit === 'cm' ? row.waistCm : row.waistIn}
                        </td>
                        <td className="py-3 px-3 text-[#555555] dark:text-[#CCCCCC]">
                          {unit === 'cm' ? row.hipCm : row.hipIn}
                        </td>
                        <td className="py-3 px-3 text-[#555555] dark:text-[#CCCCCC]">
                          {unit === 'cm' ? row.inseamCm : row.inseamIn}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measuring Instructions */}
          <div className="mt-8 p-4 bg-[#EFECE4] dark:bg-[#202020] text-xs text-[#555555] dark:text-[#BBBBBB] space-y-2">
            <p className="font-semibold uppercase tracking-wider text-[#111111] dark:text-[#F7F5F0]">
              How to measure:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
              <li><strong>Chest/Bust:</strong> Measure around the fullest part of your chest, keeping tape horizontal.</li>
              <li><strong>Waist:</strong> Measure around your natural waistline, where trousers naturally rest.</li>
              <li><strong>Fit note:</strong> VELORA garments feature relaxed, modern silhouettes. If between sizes, size down for closer fit or take your regular size for intended drape.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
