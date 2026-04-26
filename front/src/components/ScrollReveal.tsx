import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type ScrollRevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
  duration?: number
}

function ScrollReveal({ children, delay = 0, className = '', y = 28, duration = 0.7 }: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
