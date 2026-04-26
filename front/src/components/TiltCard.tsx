import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type TiltCardProps = {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  intensity?: number
}

function TiltCard({ children, className = '', href, onClick, intensity = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 180, damping: 16 })
  const sy = useSpring(my, { stiffness: 180, damping: 16 })

  const rotateY = useTransform(sx, [0, 1], [intensity, -intensity])
  const rotateX = useTransform(sy, [0, 1], [-intensity, intensity])

  const glareX = useTransform(sx, (v) => `${v * 100}%`)
  const glareY = useTransform(sy, (v) => `${v * 100}%`)

  const handleMove = (event: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((event.clientX - rect.left) / rect.width)
    my.set((event.clientY - rect.top) / rect.height)
  }

  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  const Component: typeof motion.a | typeof motion.div = href ? motion.a : motion.div

  return (
    <Component
      ref={ref as never}
      className={className}
      href={href}
      onClick={onClick}
      onMouseLeave={reset}
      onMouseMove={handleMove}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
        position: 'relative',
      }}
    >
      <motion.span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: useTransform(
            [glareX, glareY],
            ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(196, 255, 90, 0.12), transparent 55%)`,
          ),
          pointerEvents: 'none',
          opacity: 1,
        }}
      />
      <span style={{ position: 'relative', display: 'block', height: '100%' }}>{children}</span>
    </Component>
  )
}

export default TiltCard
