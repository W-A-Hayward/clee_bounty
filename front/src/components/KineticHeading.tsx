import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type KineticHeadingProps = {
  prefix: string
  rotatingWords: string[]
  suffix?: string
  intervalMs?: number
}

function KineticHeading({ prefix, rotatingWords, suffix = '', intervalMs = 2400 }: KineticHeadingProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [rotatingWords.length, intervalMs])

  return (
    <h1 className="kinetic-heading">
      <span className="kinetic-prefix">{prefix}</span>
      <span className="kinetic-rotator" aria-live="polite">
        <AnimatePresence initial={false} mode="wait">
          <motion.em
            key={rotatingWords[index]}
            animate={{ y: 0, opacity: 1 }}
            className="kinetic-word"
            exit={{ y: -36, opacity: 0 }}
            initial={{ y: 36, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {rotatingWords[index]}
          </motion.em>
        </AnimatePresence>
      </span>
      {suffix && <span className="kinetic-suffix">{suffix}</span>}
    </h1>
  )
}

export default KineticHeading
