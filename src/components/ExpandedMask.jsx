import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

/**
 * ExpandedMask — recreation of Framer marketplace "ExpandedMask"
 * A small circular/rectangular masked preview that expands on click,
 * revealing full-screen detail content with a smooth mask animation.
 */
export default function ExpandedMask({
  thumbnail,    // node or image src for collapsed state
  thumbBg,      // background color/gradient for the thumb
  badge,        // label shown on thumb
  title,        // expanded view title
  expandedContent, // node shown when expanded
  index = 0,
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        layoutId={`mask-card-${index}`}
        onClick={() => setOpen(true)}
        whileHover={{ y: -6 }}
        className="relative w-full text-left overflow-hidden rounded-2xl group cursor-none"
        style={{
          aspectRatio: '4/5',
          background: thumbBg || 'linear-gradient(135deg, #FF6B1A, #7C5CFC)',
          border: '1px solid rgba(245,241,234,0.08)',
        }}
        data-cursor="EXPAND"
      >
        {typeof thumbnail === 'string' ? (
          <motion.img
            layoutId={`mask-img-${index}`}
            src={thumbnail}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.55) contrast(1.15)' }}
          />
        ) : (
          <motion.div layoutId={`mask-img-${index}`} className="absolute inset-0">
            {thumbnail}
          </motion.div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

        {/* Badge */}
        {badge && (
          <motion.div
            layoutId={`mask-badge-${index}`}
            className="absolute top-4 left-4 chip chip-amber backdrop-blur-md"
          >
            {badge}
          </motion.div>
        )}

        {/* Title */}
        <motion.div
          layoutId={`mask-title-${index}`}
          className="absolute bottom-6 left-6 right-6"
        >
          <h3 className="font-display text-2xl md:text-3xl text-cream leading-tight">{title}</h3>
        </motion.div>

        {/* Expand affordance */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center group-hover:bg-amber group-hover:border-amber transition">
          <svg viewBox="0 0 20 20" width="14" height="14" fill="none" className="text-cream group-hover:text-ink">
            <path d="M4 12 L4 16 L8 16 M16 8 L16 4 L12 4 M4 4 L8 4 L4 4 L4 8 M16 16 L16 12 M4 16 L8 12 M16 4 L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[9000] flex items-center justify-center p-4 md:p-12"
            style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)' }}
          >
            <motion.div
              layoutId={`mask-card-${index}`}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-ink rounded-3xl border border-cream/10"
              style={{ aspectRatio: 'auto' }}
            >
              {/* Hero image */}
              <div className="relative w-full" style={{ aspectRatio: '21/9', overflow: 'hidden', borderRadius: '24px 24px 0 0' }}>
                {typeof thumbnail === 'string' ? (
                  <motion.img
                    layoutId={`mask-img-${index}`}
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.7) contrast(1.1)' }}
                  />
                ) : (
                  <motion.div layoutId={`mask-img-${index}`} className="w-full h-full">
                    {thumbnail}
                  </motion.div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <motion.div
                  layoutId={`mask-badge-${index}`}
                  className="absolute top-6 left-6 chip chip-amber backdrop-blur-md"
                >
                  {badge}
                </motion.div>

                <motion.div
                  layoutId={`mask-title-${index}`}
                  className="absolute bottom-8 left-8 right-8"
                >
                  <h2 className="font-display text-4xl md:text-6xl text-cream leading-none">
                    {title}
                  </h2>
                </motion.div>

                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-cream text-ink flex items-center justify-center hover:bg-amber transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Expanded content */}
              <div className="p-8 md:p-12">
                {expandedContent}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
