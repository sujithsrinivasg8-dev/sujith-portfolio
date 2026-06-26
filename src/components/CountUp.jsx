import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, animate } from 'framer-motion'

/**
 * Counts a number up from 0 to `to` the first time it scrolls into view.
 * Preserves prefix/suffix (e.g. "$", "K", "M+", "%") and decimal places.
 * Respects prefers-reduced-motion by snapping straight to the final value.
 */
export default function CountUp({ to, decimals = 0, prefix = '', suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const value = useMotionValue(0)

  const format = (n) => `${prefix}${n.toFixed(decimals)}${suffix}`

  useEffect(() => {
    if (!inView) return

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      if (ref.current) ref.current.textContent = format(to)
      return
    }

    const controls = animate(value, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to])

  return <span ref={ref}>{format(0)}</span>
}
