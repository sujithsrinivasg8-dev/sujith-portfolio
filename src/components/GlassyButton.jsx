import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownToLine } from 'lucide-react'

/**
 * GlassyButton — recreation of the Framer marketplace "GlassyButton"
 * Liquid glass effect with refraction, hover ripple, icon morph.
 * Improved visibility with stronger contrast on dark backgrounds.
 */
export default function GlassyButton({
  children,
  href,
  onClick,
  variant = 'default',
  icon = true,
  size = 'md',
  download = false,
}) {
  const [hover, setHover] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const Wrap = href ? motion.a : motion.button
  const props = href ? { href, ...(download ? { download: true } : {}) } : { onClick }

  const sizes = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-9 py-4 text-base',
  }

  const variants = {
    default: {
      bg: 'rgba(245,241,234,0.08)',
      border: 'rgba(245,241,234,0.25)',
      color: '#F5F1EA',
    },
    amber: {
      bg: 'rgba(255,107,26,0.15)',
      border: 'rgba(255,107,26,0.5)',
      color: '#FF6B1A',
    },
    electric: {
      bg: 'rgba(0,255,178,0.12)',
      border: 'rgba(0,255,178,0.4)',
      color: '#00FFB2',
    },
  }

  const v = variants[variant] || variants.default

  return (
    <Wrap
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMove}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center gap-3 rounded-full border backdrop-blur-xl overflow-hidden font-mono uppercase tracking-wider ${sizes[size]}`}
      style={{
        background: v.bg,
        borderColor: v.border,
        color: v.color,
        boxShadow: hover
          ? `0 0 30px ${v.border}, inset 0 1px 0 rgba(255,255,255,0.15)`
          : `0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`,
        transition: 'box-shadow 0.3s, background 0.3s',
        fontWeight: 600,
        letterSpacing: '0.08em',
        fontSize: size === 'lg' ? '0.8rem' : undefined,
      }}
    >
      {/* Liquid glass shine */}
      <motion.div
        animate={{ opacity: hover ? 1 : 0 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.3), transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      {/* Border highlight arc */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '1px',
          background: `linear-gradient(135deg, ${v.border}, transparent 50%, rgba(255,255,255,0.05))`,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
        }}
      />
      <span className="relative z-10">{children}</span>
      {icon && (
        <motion.span
          animate={{
            x: hover ? 3 : 0,
            rotate: hover ? 0 : (download ? 0 : -45),
          }}
          transition={{ duration: 0.25 }}
          className="relative z-10 flex"
        >
          {download ? <ArrowDownToLine size={14} /> : <ArrowUpRight size={14} />}
        </motion.span>
      )}
    </Wrap>
  )
}
