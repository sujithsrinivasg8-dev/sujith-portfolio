import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import TextVideoMask from './TextVideoMask'
import GlassyButton from './GlassyButton'

const PHRASES = [
  'Building event-driven systems at 15K TPS',
  'AI-powered fraud detection · RAG · LLMs',
  'Spring Boot · Kafka · AWS · Kubernetes',
  '6 years across banking, retail & e-commerce',
]

export default function Hero() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const ref = useRef(null)
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 800], [0, 150])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  useEffect(() => {
    const t = setInterval(() => setPhraseIdx((p) => (p + 1) % PHRASES.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-screen w-full overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 noise-bg" />

      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,241,234,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,234,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />

      {/* Vertical line decorations */}
      <div className="absolute left-12 top-0 bottom-0 hidden md:flex flex-col justify-between py-32 z-10 pointer-events-none">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/30 -rotate-90 origin-top-left translate-y-32">
          // PORTFOLIO · 2025
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/30 -rotate-90 origin-bottom-left">
          // V.6.0 — SOFTWARE ENGINEER
        </div>
      </div>
      <div className="absolute right-12 top-0 bottom-0 hidden md:flex flex-col justify-between py-32 items-end z-10 pointer-events-none">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/30 rotate-90 origin-top-right translate-y-32">
          CINCINNATI · OH · USA
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/30 rotate-90 origin-bottom-right">
          (513) 258 · 3186
        </div>
      </div>

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 min-h-screen flex flex-col justify-center items-center px-6 md:px-24 pt-24"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-12 h-px bg-amber" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
            Software Engineer · Distributed Systems
          </span>
          <div className="w-12 h-px bg-amber" />
        </motion.div>

        {/* Big masked text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="w-full max-w-6xl"
        >
          <TextVideoMask text="SUJITH" />
          <TextVideoMask text="SRINIVAS" />
        </motion.div>

        {/* Rotating phrase */}
        <div className="mt-12 h-8 overflow-hidden">
          {PHRASES.map((p, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                y: phraseIdx === i ? 0 : phraseIdx > i ? -32 : 32,
                opacity: phraseIdx === i ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-sm md:text-base text-cream/80 absolute"
            >
              <span className="text-amber mr-2">▸</span>
              {p}
            </motion.div>
          ))}
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap gap-4 mt-16"
        >
          <GlassyButton href="#projects" variant="amber" size="lg">
            View My Work
          </GlassyButton>
          <GlassyButton href="#contact" variant="default" size="lg">
            Let's Talk
          </GlassyButton>
          <a
            href="/Sujith_Srinivas_G.pdf"
            download
            className="group inline-flex items-center gap-3 px-9 py-4 rounded-full border border-electric/30 bg-electric/5 text-electric font-mono uppercase tracking-wider text-base hover:bg-electric/10 transition"
            style={{ backdropFilter: 'blur(20px)' }}
          >
            Résumé
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-y-0.5 transition">
              <path d="M12 3 L12 16 M6 11 L12 17 L18 11 M5 21 L19 21" />
            </svg>
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-12 left-0 right-0 px-6 md:px-24"
        >
          <div className="flex flex-wrap items-center justify-between gap-6 max-w-6xl mx-auto pt-8 border-t border-cream/10">
            {[
              { num: '6+', label: 'Years building backend systems' },
              { num: '15K', label: 'Transactions/sec sustained' },
              { num: '50M+', label: 'Users served (Flipkart)' },
              { num: '99.9%', label: 'System availability' },
            ].map((s, i) => (
              <div key={i} className="flex-1 min-w-[140px]">
                <div className="font-display text-3xl md:text-4xl text-cream">{s.num}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-cream/40 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2"
        >
          <ArrowDown size={16} className="text-amber" />
        </motion.div>
      </motion.div>
    </section>
  )
}
