import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin gradient progress bar pinned to the top of the viewport that
 * tracks overall page scroll. Spring-smoothed for a premium feel.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: '0%',
        background: 'linear-gradient(90deg, var(--amber), var(--electric), var(--violet))',
      }}
      className="fixed top-0 left-0 right-0 z-[1100] h-[3px]"
    />
  )
}
