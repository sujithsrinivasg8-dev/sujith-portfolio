import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * CursorMaskReveal — recreation of Framer marketplace "CursorMaskReveal"
 * Top layer hides underneath layer. The cursor "punches a hole" through
 * the top layer (circular mask), revealing the bottom layer beneath.
 */
export default function CursorMaskReveal({
  topContent,
  bottomContent,
  radius = 180,
  className = '',
}) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: -500, y: -500 })
  const [hovering, setHovering] = useState(false)

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const mask = hovering
    ? `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, transparent 99%, black 100%)`
    : 'radial-gradient(circle 0px at 50% 50%, transparent 99%, black 100%)'

  return (
    <div
      ref={ref}
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ cursor: 'none' }}
    >
      {/* Bottom layer */}
      <div className="absolute inset-0">{bottomContent}</div>

      {/* Top layer with cursor mask */}
      <motion.div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          transition: 'mask-image 0.1s, -webkit-mask-image 0.1s',
        }}
      >
        {topContent}
      </motion.div>

      {/* Cursor ring indicator */}
      {hovering && (
        <motion.div
          animate={{ x: pos.x - radius, y: pos.y - radius }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            position: 'absolute',
            width: radius * 2,
            height: radius * 2,
            border: '1.5px solid rgba(255,107,26,0.4)',
            borderRadius: '50%',
            pointerEvents: 'none',
            top: 0, left: 0,
          }}
        />
      )}
    </div>
  )
}
