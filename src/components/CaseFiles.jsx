import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { CASE_STUDIES } from '../data/caseStudies'

/**
 * CaseFiles — cinematic entry cards for the three flagship AI case studies.
 * 3D mouse-tilt cards with layered depth, accent glow, and animated
 * mini-architecture flourish. Links to #/case/<slug>.
 */

function TiltCard({ cs, index }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 })

  const onMove = (e) => {
    if (reduce) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }
  const onLeave = () => { mx.set(0.5); my.set(0.5) }

  return (
    <motion.a
      href={`#/case/${cs.slug}`}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformStyle: 'preserve-3d', perspective: 1200 }}
      className="group relative block rounded-2xl overflow-hidden border border-cream/10 hover:border-cream/25 transition-colors"
      data-cursor="OPEN"
    >
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: cs.gradient, opacity: 0.16 }} />
      <div className="absolute inset-0 glass" />
      {/* Accent aura that intensifies on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 55% at 50% 0%, ${cs.accent}1f, transparent 70%)` }}
      />

      <div className="relative p-7 md:p-8" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex items-start justify-between mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: cs.accent }}>
            Case {cs.number} — {cs.badge}
          </span>
          <ArrowUpRight size={16} className="text-cream/40 group-hover:text-cream group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>

        <h3 className="font-display text-3xl md:text-[2.1rem] text-cream leading-tight mb-4 min-h-[4.5rem]">
          {cs.shortTitle}
        </h3>

        <p className="text-sm text-cream/60 leading-relaxed mb-8 line-clamp-3">
          {cs.oneLiner}
        </p>

        {/* Mini flow flourish */}
        <div className="flex items-center gap-1.5 mb-8" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span
                className="inline-block w-7 h-4 rounded-sm border"
                style={{ borderColor: `${cs.accent}66`, background: `${cs.accent}0d` }}
              />
              {i < 3 && (
                <motion.span
                  animate={reduce ? {} : { opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.35 }}
                  className="font-mono text-[9px]"
                  style={{ color: cs.accent }}
                >
                  ▸
                </motion.span>
              )}
            </span>
          ))}
          <span className="ml-2 font-mono text-[8px] uppercase tracking-widest text-cream/30">
            live diagram inside
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {cs.stack.slice(0, 4).map((t) => (
            <span key={t} className="chip text-[9px]" style={{ padding: '2px 8px' }}>{t}</span>
          ))}
          {cs.stack.length > 4 && (
            <span className="chip text-[9px]" style={{ padding: '2px 8px' }}>+{cs.stack.length - 4}</span>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
        style={{ background: cs.accent }} />
    </motion.a>
  )
}

export default function CaseFiles({ heading = true }) {
  return (
    <div>
      {heading && (
        <div className="grid md:grid-cols-2 gap-12 items-end mb-14">
          <h2 className="font-display text-5xl md:text-7xl text-cream leading-tight">
            The AI <em className="text-amber">case files.</em>
          </h2>
          <p className="text-cream/60 max-w-md leading-relaxed">
            Three deep, end-to-end builds — agentic security operations, an
            LLM document pipeline, and an internal AI platform. Each opens
            into a full cinematic case study with live architecture diagrams.
          </p>
        </div>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1600 }}>
        {CASE_STUDIES.map((cs, i) => (
          <TiltCard key={cs.slug} cs={cs} index={i} />
        ))}
      </div>
    </div>
  )
}
