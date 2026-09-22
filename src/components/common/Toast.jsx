import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function Toast() {
  const { toasts, removeToast } = useApp()

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success'
          const isError = toast.type === 'error'

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-auto flex items-center justify-between p-4 bg-[#111111] dark:bg-[#1C1C1C] text-[#F7F5F0] border border-[#2D2D2D] shadow-xl"
            >
              <div className="flex items-center space-x-3 mr-2">
                {isSuccess && <CheckCircle2 className="w-4 h-4 text-[#4F7A5A] shrink-0" />}
                {isError && <AlertCircle className="w-4 h-4 text-[#A84D4D] shrink-0" />}
                {!isSuccess && !isError && <Info className="w-4 h-4 text-[#B89B5E] shrink-0" />}
                <p className="text-xs tracking-wide leading-snug">{toast.message}</p>
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-[#888888] hover:text-[#FFFFFF] transition-colors p-1"
                aria-label="Dismiss toast"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
