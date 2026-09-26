import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Clock, User, X, Share2 } from 'lucide-react'
import { ARTICLES } from '../data/journal'
import Breadcrumbs from '../components/common/Breadcrumbs'

export default function Journal() {
  const [selectedArticle, setSelectedArticle] = useState(null)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      <Breadcrumbs items={[{ label: 'The Journal' }]} />

      {/* Header */}
      <div className="py-8 sm:py-14 border-b border-[#E5E1D8] dark:border-[#2C2C2C] mb-12">
        <span className="text-[11px] font-semibold tracking-luxury uppercase text-[#B89B5E] block mb-2">
          Editorial Essays & Archive
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl sm:text-6xl uppercase font-normal tracking-tight">
              The Journal
            </h1>
            <p className="text-xs sm:text-sm text-[#777777] dark:text-[#999999] mt-2 max-w-xl leading-relaxed">
              Dispatches on fabric provenance, architectural tailoring, and the enduring philosophy of minimalist restraint.
            </p>
          </div>
        </div>
      </div>

      {/* Lead Article */}
      {ARTICLES.length > 0 && (
        <div className="mb-16">
          <div
            onClick={() => setSelectedArticle(ARTICLES[0])}
            className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#EFECE4]/50 dark:bg-[#181818] p-6 sm:p-10 border border-[#E5E1D8] dark:border-[#2C2C2C] hover:border-[#111111] dark:hover:border-[#F7F5F0] transition-colors"
          >
            <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#111111]">
              <img
                src={ARTICLES[0].image}
                alt={ARTICLES[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-luxury text-[#8A8A8A]">
                <span>{ARTICLES[0].date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {ARTICLES[0].readTime}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal leading-tight group-hover:text-[#B89B5E] transition-colors">
                {ARTICLES[0].title}
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] dark:text-[#AAAAAA] leading-relaxed line-clamp-3">
                {ARTICLES[0].excerpt}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs uppercase tracking-luxury font-semibold text-[#111111] dark:text-[#F7F5F0]">
                <span>Read Full Essay</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ARTICLES.slice(1).map((article) => (
          <article
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="group cursor-pointer flex flex-col space-y-4"
          >
            <div className="aspect-[3/2] overflow-hidden bg-[#EAE6DD] dark:bg-[#202020]">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-luxury text-[#8A8A8A]">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="font-serif text-xl font-normal group-hover:text-[#B89B5E] transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-[#666666] dark:text-[#AAAAAA] leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs uppercase tracking-luxury font-medium text-[#111111] dark:text-[#F7F5F0]">
                <span>Read Story</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Modal Reading View */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-3xl bg-[#F7F5F0] dark:bg-[#181818] text-[#111111] dark:text-[#F7F5F0] border border-[#E5E1D8] dark:border-[#2C2C2C] shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto z-10"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 text-[#8A8A8A] hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-luxury text-[#8A8A8A]">
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.author}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-normal leading-tight uppercase">
                  {selectedArticle.title}
                </h1>

                <p className="font-serif italic text-base sm:text-lg text-[#666666] dark:text-[#CCCCCC] border-l-2 border-[#B89B5E] pl-4">
                  {selectedArticle.subtitle}
                </p>

                <div className="aspect-[16/9] w-full overflow-hidden bg-[#111111]">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#444444] dark:text-[#BBBBBB] leading-relaxed pt-4">
                  {selectedArticle.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="pt-8 border-t border-[#E5E1D8] dark:border-[#2C2C2C] flex items-center justify-between">
                  <span className="text-xs uppercase tracking-luxury text-[#8A8A8A]">VELORA Atelier Archives</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href)
                    }}
                    className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#B89B5E] hover:underline"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Dispatch</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
