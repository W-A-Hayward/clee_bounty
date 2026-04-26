import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type MagneticButtonProps = {
  children: ReactNode
  onClick?: () => void
  href?: string
  className?: string
  strength?: number
  disabled?: boolean
  type?: 'button' | 'submit'
}

function MagneticButton({
  children,
  onClick,
  href,
  className = '',
  strength = 0.32,
  disabled = false,
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 })

  const handleMove = (event: React.MouseEvent) => {
    if (disabled) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((event.clientX - cx) * strength)
    y.set((event.clientY - cy) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const innerX = useTransform(springX, (v) => v * 0.5)
  const innerY = useTransform(springY, (v) => v * 0.5)

  if (href) {
    return (
      <motion.a
        ref={ref as never}
        className={className}
        href={href}
        style={{ x: springX, y: springY, display: 'inline-flex' }}
        onMouseLeave={reset}
        onMouseMove={handleMove}
      >
        <motion.span style={{ x: innerX, y: innerY, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          {children}
        </motion.span>
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as never}
      className={className}
      disabled={disabled}
      onClick={onClick}
      onMouseLeave={reset}
      onMouseMove={handleMove}
      style={{ x: springX, y: springY }}
      type={type}
    >
      <motion.span style={{ x: innerX, y: innerY, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        {children}
      </motion.span>
    </motion.button>
  )
}

export default MagneticButton
