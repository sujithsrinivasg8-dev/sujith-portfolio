import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * ShowcaseCard — recreation of Framer marketplace "Showcase-Card"
 * 3D tilting card with layered depth. Inner content lifts on hover.
 * Mouse-tracking inner glow follows cursor inside card bounds.
 * Also works as a profile/portrait card when image + name + role are provided.
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
  // Profile card mode props
  name,
  role,
  style = {},
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

  // Profile card mode — compact portrait with name/role
  const isProfileCard = !!(name || role)

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: 'preserve-3d',
        perspective: 1500,
        ...style,
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
        className="relative glass rounded-2xl overflow-hidden h-full"
        style={{
          background: isProfileCard
            ? 'linear-gradient(160deg, rgba(255,107,26,0.08) 0%, rgba(124,92,252,0.12) 100%)'
            : 'linear-gradient(135deg, rgba(255,107,26,0.05) 0%, rgba(124,92,252,0.08) 100%)',
          border: '1px solid rgba(245,241,234,0.15)',
          transformStyle: 'preserve-3d',
          padding: isProfileCard ? 0 : '2rem',
        }}
      >
        {/* Mouse-tracking glow */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle 200px at ${glowX} ${glowY}, rgba(255,107,26,0.25), transparent 70%)`,
            opacity: hover ? 1 : 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />

        {/* Profile card layout */}
        {isProfileCard && (
          <div style={{ transformStyle: 'preserve-3d' }}>
            {/* Photo */}
            <div
              className="relative overflow-hidden"
              style={{
                width: '100%',
                aspectRatio: '3/4',
                transform: 'translateZ(20px)',
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt={name || 'Profile'}
                  className="w-full h-full object-cover object-top"
                  style={{
                    filter: 'brightness(0.9) contrast(1.05) saturate(0.9)',
                  }}
                  onError={(e) => {
                    // Fallback to initials if image fails
                    e.target.style.display = 'none'
                    e.target.nextSibling && (e.target.nextSibling.style.display = 'flex')
                  }}
                />
              ) : null}
              {/* Fallback avatar */}
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FF6B1A33, #7C5CFC33)',
                  display: image ? 'none' : 'flex',
                }}
              >
                <span className="font-display text-6xl text-cream/60">
                  {(name || 'S').charAt(0)}
                </span>
              </div>
              {/* Bottom fade */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '50%',
                background: 'linear-gradient(to top, rgba(10,10,10,0.8), transparent)',
              }} />
            </div>

            {/* Name + Role overlay */}
            <div
              style={{
                padding: '12px 16px',
                transform: 'translateZ(30px)',
              }}
            >
              {name && (
                <div className="font-display text-cream text-base leading-tight">
                  {name}
                </div>
              )}
              {role && (
                <div className="font-mono text-[10px] uppercase tracking-widest text-amber/80 mt-0.5">
                  {role}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Standard card layout */}
        {!isProfileCard && (
          <>
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
                className="text-cream/60 text-sm md:text-base leading-relaxed mb-6"
                style={{ transform: 'translateZ(25px)' }}
              >
                {description}
              </p>
            )}

            {/* Meta */}
            {meta && (
              <div
                className="font-mono text-xs text-cream/40 uppercase tracking-wider"
                style={{ transform: 'translateZ(20px)' }}
              >
                {meta}
              </div>
            )}

            {/* Children */}
            {children && (
              <div style={{ transform: 'translateZ(20px)' }}>
                {children}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}
