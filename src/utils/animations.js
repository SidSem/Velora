export const easeLuxury = [0.25, 1, 0.5, 1]

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeLuxury },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: easeLuxury,
    },
  }),
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const scaleModal = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeLuxury },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 12,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
}

export const drawerSlide = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.45, ease: easeLuxury },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.35, ease: 'easeInOut' },
  },
}

export const searchOverlayAnimation = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeLuxury },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
}

export const mobileMenuAnimation = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easeLuxury },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
}
