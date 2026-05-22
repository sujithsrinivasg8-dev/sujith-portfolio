import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * ShowcaseCard — recreation of Framer marketplace "Showcase-Card"
 * 3D tilting card with layered depth. Inner content lifts on hover.
 * Mouse-tracking inner glow follows cursor inside card bounds.
 */
export default function ShowcaseCard({
  eyebrow,
  title,
  description,
  image,
  imageBg,
  meta,
  children,
  className = '',
}) {
  const ref = useRef(null)
  const [hover, setHover] = useState(false)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), {
    stiffness: 200, damping: 20,
  })
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), {
    stiffness: 200, damping: 20,
  })

  const glowX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glowY = useTransform(my, [0, 1], ['0%', '100%'])

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: 'preserve-3d',
        perspective: 1500,
      }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        mx.set(0.5); my.set(0.5)
      }}
      className={`relative group rounded-2xl overflow-hidden ${className}`}
    >
      {/* Outer card frame */}
      <div
        className="relative glass rounded-2xl p-8 h-full"
        style={{
          background: 'linear-gradient(135deg, rgba(255,107,26,0.05) 0%, rgba(124,92,252,0.08) 100%)',
          border: '1px solid rgba(245,241,234,0.1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Mouse-tracking glow */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle 300px at ${glowX} ${glowY}, rgba(255,107,26,0.2), transparent 70%)`,
            opacity: hover ? 1 : 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
          }}
        />

        {/* Image / Top visual */}
        {(image || imageBg) && (
          <div
            className="relative rounded-xl overflow-hidden mb-6"
            style={{
              transform: 'translateZ(40px)',
              aspectRatio: '16/9',
              background: imageBg || '#111',
            }}
          >
            {image && (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.85) contrast(1.1)' }}
              />
            )}
          </div>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <div
            className="font-mono uppercase tracking-widest text-xs text-amber mb-3"
            style={{ transform: 'translateZ(30px)' }}
          >
            {eyebrow}
          </div>
        )}

        {/* Title */}
        {title && (
          <h3
            className="font-display text-3xl md:text-4xl text-cream mb-4 leading-tight"
            style={{ transform: 'translateZ(50px)' }}
          >
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p
            className="text-cream/70 text-sm leading-relaxed mb-6"
            style={{ transform: 'translateZ(20px)' }}
          >
            {description}
          </p>
        )}

        {/* Children custom content */}
        {children && (
          <div style={{ transform: 'translateZ(30px)' }}>{children}</div>
        )}

        {/* Meta footer */}
        {meta && (
          <div
            className="flex items-center gap-4 text-xs font-mono text-cream/50 mt-auto pt-4 border-t border-cream/10"
            style={{ transform: 'translateZ(20px)' }}
          >
            {meta}
          </div>
        )}

        {/* Corner accent */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 30,
            height: 30,
            transform: 'translateZ(60px)',
          }}
        >
          <svg viewBox="0 0 30 30" fill="none">
            <path d="M2 28 L2 2 L28 2" stroke="#FF6B1A" strokeWidth="1.5" />
            <circle cx="2" cy="2" r="2" fill="#FF6B1A" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
