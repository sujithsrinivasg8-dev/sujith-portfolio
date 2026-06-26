import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import TextVideoMask from './TextVideoMask'
import GlassyButton from './GlassyButton'
import ShowcaseCard from './ShowcaseCard'
import CountUp from './CountUp'

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
          (317) 523 · 0756
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
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-12 h-px bg-amber" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
            Software Engineer · Distributed Systems
          </span>
          <div className="w-12 h-px bg-amber" />
        </motion.div>

        {/* Name + Profile Picture Row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10"
        >
          {/* Big masked text — compact & smart */}
          <div className="flex-1 text-center md:text-left">
            <TextVideoMask text="SUJITH" style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: 1 }} />
            <TextVideoMask text="SRINIVAS" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: 1 }} />
          </div>

          {/* Profile picture via ShowcaseCard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex-shrink-0"
          >
            <ShowcaseCard
              image="/og-image.png"
              name="Sujith Srinivas G"
              role="Software Engineer"
              style={{ width: 180, height: 220 }}
            />
          </motion.div>
        </motion.div>

        {/* Rotating subtitle — centered */}
        <div className="mt-10 h-8 overflow-visible w-full flex items-center justify-center">
          <div className="relative h-8 w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={phraseIdx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-sm md:text-base text-cream/80 flex items-center gap-2 text-center"
              >
                <span className="text-amber">▸</span>
                {PHRASES[phraseIdx]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA buttons — clearly visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap gap-4 mt-14 justify-center"
        >
          <GlassyButton href="#projects" variant="amber" size="lg">
            View My Work &#8593;
          </GlassyButton>
          <GlassyButton href="#contact" variant="default" size="lg">
            Let&apos;s Talk &#8593;
          </GlassyButton>
          <GlassyButton href="/Sujith_Srinivas_G.pdf" variant="electric" size="lg" download>
            R&eacute;sum&eacute; &#8595;
          </GlassyButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-16 flex flex-wrap gap-8 justify-center"
        >
          {[
            { to: 6, suffix: '+', label: 'Years building backend systems' },
            { to: 15, suffix: 'K', label: 'Transactions/sec sustained' },
            { to: 50, suffix: 'M+', label: 'Users served (Flipkart)' },
            { to: 99.9, decimals: 1, suffix: '%', label: 'System availability' },
          ].map((s, i) => (
            <div key={i} className="flex-1 min-w-[140px] text-center">
              <div className="font-display text-3xl md:text-4xl text-cream tabular-nums">
                <CountUp to={s.to} decimals={s.decimals || 0} suffix={s.suffix} />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-cream/40 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <ArrowDown size={16} className="text-amber" />
      </motion.div>
    </section>
  )
}
