import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * RadiusOnScroll — recreation of the Framer marketplace "RadiusOnScroll"
 * Container's border-radius animates from large → 0 (or vice versa)
 * based on scroll progress relative to its viewport position.
 */
export default function RadiusOnScroll({
  children,
  startRadius = 60,
  endRadius = 0,
  className = '',
  style = {},
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  const radius = useTransform(
    scrollYProgress,
    [0, 1],
    [startRadius, endRadius]
  )
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])

  return (
    <motion.div
      ref={ref}
      style={{
        borderRadius: radius,
        scale,
        overflow: 'hidden',
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
