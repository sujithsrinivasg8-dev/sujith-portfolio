import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/**
 * GlassyButton — recreation of the Framer marketplace "GlassyButton"
 * Liquid glass effect with refraction, hover ripple, icon morph.
 */
export default function GlassyButton({
  children,
  href,
  onClick,
  variant = 'default',
  icon = true,
  size = 'md',
}) {
  const [hover, setHover] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const Wrap = href ? motion.a : motion.button
  const props = href ? { href } : { onClick }

  const sizes = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-9 py-4 text-base',
  }

  const variants = {
    default: 'bg-white/8 border-white/20 text-cream',
    amber: 'bg-amber/12 border-amber/40 text-amber',
    electric: 'bg-electric/10 border-electric/30 text-electric',
  }

  return (
    <Wrap
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMove}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center gap-3 rounded-full border backdrop-blur-xl overflow-hidden font-mono uppercase tracking-wider ${sizes[size]} ${variants[variant]}`}
      style={{
        boxShadow: hover
          ? '0 0 40px rgba(255,107,26,0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
          : '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        transition: 'box-shadow 0.4s',
      }}
    >
      {/* Liquid glass shine */}
      <motion.div
        animate={{ opacity: hover ? 1 : 0 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle 100px at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.35), transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      {/* Border highlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '1px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4), transparent 50%, rgba(255,255,255,0.1))',
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
            x: hover ? 4 : 0,
            rotate: hover ? 0 : -45,
          }}
          transition={{ duration: 0.3 }}
          className="relative z-10 flex"
        >
          <ArrowUpRight size={14} />
        </motion.span>
      )}
    </Wrap>
  )
}
