import { useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion'

/**
 * ReelCarousel — recreation of Framer marketplace "ReelCarousel"
 * A continuously auto-scrolling carousel of cards/reels.
 * Pauses on hover. Click to highlight.
 * Used to showcase projects, skills, or media reels in a visually engaging strip.
 */

function wrap(min, max, v) {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

export default function ReelCarousel({
  items = [],
  speed = 0.5,
  gap = 24,
  cardWidth = 280,
  cardHeight = 180,
  className = '',
}) {
  const [paused, setPaused] = useState(false)
  const [activeIdx, setActiveIdx] = useState(null)
  const x = useMotionValue(0)
  const containerRef = useRef(null)

  const totalWidth = (cardWidth + gap) * items.length

  useAnimationFrame((_, delta) => {
    if (paused) return
    const current = x.get()
    x.set(current - speed * (delta / 16))
  })

  // Clamp x into repeating range
  const loopX = useTransform(x, (v) => wrap(-totalWidth, 0, v))

  if (!items || items.length === 0) return null

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--bg, #0A0A0A), transparent)' }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--bg, #0A0A0A), transparent)' }}
      />

      <motion.div
        ref={containerRef}
        style={{ x: loopX, display: 'flex', gap }}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items, ...items].map((item, i) => {
          const origIdx = i % items.length
          const isActive = activeIdx === origIdx

          return (
            <motion.div
              key={i}
              onClick={() => setActiveIdx(isActive ? null : origIdx)}
              animate={{
                scale: isActive ? 1.06 : 1,
                opacity: activeIdx !== null && !isActive ? 0.55 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                width: cardWidth,
                height: cardHeight,
                flex: 'none',
                cursor: 'pointer',
              }}
            >
              <div
                className="w-full h-full rounded-xl overflow-hidden relative group"
                style={{
                  background: item.bg || 'linear-gradient(135deg, rgba(255,107,26,0.15), rgba(124,92,252,0.15))',
                  border: isActive
                    ? '1px solid rgba(255,107,26,0.6)'
                    : '1px solid rgba(245,241,234,0.08)',
                  transition: 'border-color 0.2s',
                }}
              >
                {/* Thumbnail image */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title || ''}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: 0.7 }}
                  />
                )}

                {/* Overlay gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)',
                  }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {item.tag && (
                    <div className="font-mono text-[9px] uppercase tracking-widest text-amber/80 mb-1">
                      {item.tag}
                    </div>
                  )}
                  {item.title && (
                    <div className="font-display text-cream text-sm leading-tight">
                      {item.title}
                    </div>
                  )}
                  {item.subtitle && (
                    <div className="font-mono text-[10px] text-cream/50 mt-0.5">
                      {item.subtitle}
                    </div>
                  )}
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber animate-pulse" />
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
