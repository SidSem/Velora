import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F5F0] dark:bg-[#111111] text-[#111111] dark:text-[#F7F5F0]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center space-y-4"
      >
        <span className="font-serif text-3xl sm:text-4xl tracking-[0.3em] uppercase font-bold">
          VELORA
        </span>
        <span className="text-[10px] tracking-luxury uppercase text-[#8A8A8A]">
          Defined by Simplicity
        </span>
        <div className="w-32 h-[1.5px] bg-[#E5E1D8] dark:bg-[#2C2C2C] overflow-hidden mt-3 relative">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            className="w-full h-full bg-[#B89B5E]"
          />
        </div>
      </motion.div>
    </div>
  )
}
