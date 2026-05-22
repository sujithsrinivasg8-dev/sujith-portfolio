import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Book3D — recreation of Framer marketplace "Book" component
 * A 3D book with cover, spine, pages. Opens on hover/click revealing
 * the inside content. Multiple pages can flip individually.
 */
export default function Book3D({
  title,
  subtitle,
  author,
  cover,
  spine = '#8B0000',
  pages = [],
  className = '',
}) {
  const [open, setOpen] = useState(false)
  const [pageIdx, setPageIdx] = useState(0)

  return (
    <div className={`relative ${className}`} style={{ perspective: 2000 }}>
      <motion.div
        animate={{ rotateY: open ? -160 : 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 14 }}
        onHoverStart={() => setOpen(true)}
        onHoverEnd={() => setOpen(false)}
        style={{
          width: '100%',
          aspectRatio: '3/4',
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
          cursor: 'none',
        }}
      >
        {/* Cover (front of book) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: cover || `linear-gradient(135deg, ${spine}, #2a0000)`,
            borderRadius: '4px 12px 12px 4px',
            backfaceVisibility: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset -8px 0 20px rgba(0,0,0,0.4)',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid rgba(245,241,234,0.1)',
          }}
        >
          {/* Spine accent */}
          <div style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0,
            width: 12,
            background: `linear-gradient(180deg, ${spine}, #1a0000)`,
            borderRadius: '4px 0 0 4px',
            borderRight: '1px solid rgba(0,0,0,0.5)',
          }} />

          <div>
            <div className="font-mono uppercase tracking-[0.3em] text-[10px] text-amber/80 mb-2">
              ▶ TURN PAGE
            </div>
            <h3 className="font-display text-cream text-3xl leading-tight">{title}</h3>
            {subtitle && (
              <p className="font-mono text-xs text-cream/60 mt-2 uppercase tracking-wider">
                {subtitle}
              </p>
            )}
          </div>

          {/* Cover ornament */}
          <div className="flex items-end justify-between">
            <div className="w-12 h-12 border border-amber/40 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                <path d="M4 4 L20 4 L20 20 L4 20 Z M4 12 L20 12 M12 4 L12 20" stroke="#FF6B1A" strokeWidth="1" />
              </svg>
            </div>
            {author && (
              <div className="font-mono text-[10px] text-cream/40 uppercase tracking-wider text-right">
                {author}
              </div>
            )}
          </div>

          {/* Page edges illusion */}
          <div style={{
            position: 'absolute',
            right: 0, top: 4, bottom: 4,
            width: 6,
            background: 'repeating-linear-gradient(180deg, #F5F1EA 0, #F5F1EA 1px, #D5C9B5 1px, #D5C9B5 2px)',
            borderRadius: '0 4px 4px 0',
          }} />
        </div>

        {/* Inside left page (behind cover when open) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #F5F1EA, #E8DDCB)',
            borderRadius: '4px 12px 12px 4px',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            padding: '36px 32px',
            color: '#1a1a1a',
            fontSize: '11px',
            lineHeight: 1.6,
          }}
        >
          {pages[pageIdx] && (
            <div>
              <div className="font-mono uppercase tracking-widest text-[9px] text-amber mb-3">
                ◆ {pages[pageIdx].chapter || 'CHAPTER'}
              </div>
              <h4 className="font-display text-2xl mb-4 text-ink leading-snug">
                {pages[pageIdx].title}
              </h4>
              <p style={{ color: '#444', fontSize: 11 }}>
                {pages[pageIdx].text}
              </p>
              {pages.length > 1 && (
                <div className="absolute bottom-6 left-8 right-8 flex justify-between font-mono text-[9px] text-ink/40">
                  <span>
                    {String(pageIdx + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); setPageIdx(Math.max(0, pageIdx - 1)) }}
                      className="hover:text-amber transition"
                    >◄</button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setPageIdx(Math.min(pages.length - 1, pageIdx + 1)) }}
                      className="hover:text-amber transition"
                    >►</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Static back page visible behind */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #F5F1EA, #DCD0BC)',
          borderRadius: '4px 12px 12px 4px',
          zIndex: -1,
          padding: '36px 32px',
          color: '#1a1a1a',
        }}
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-amber/60">
          ◆ INDEX
        </div>
        <h4 className="font-display text-xl mt-2 mb-3 text-ink">Career chapters</h4>
        <ul className="space-y-1.5 text-[10px] text-ink/70 font-mono">
          {pages.map((p, i) => (
            <li key={i} className="flex justify-between">
              <span>{p.chapter || `Ch. ${i+1}`}</span>
              <span className="text-ink/40">··· {String(i+1).padStart(2,'0')}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
