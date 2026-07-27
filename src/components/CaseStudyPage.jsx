import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CASE_STUDIES, getCaseStudy } from '../data/caseStudies'
import FlowDiagram from './FlowDiagram'
import GlassyButton from './GlassyButton'

/**
 * CaseStudyPage — cinematic long-form case study for the flagship AI projects.
 * Data-driven: renders the ordered `sections` array from caseStudies.js so
 * each page reads like the source doc. 3D perspective hero, scroll-linked
 * parallax, animated architecture diagram, typed JSON terminal, tradeoff
 * cards, and prev/next navigation between studies.
 */

// ── Section chrome ────────────────────────────────────────────────────
function SectionHeader({ label, heading, accent, index }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-px" style={{ background: accent }} />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: accent }}>
          {String(index).padStart(2, '0')} — {label}
        </span>
      </div>
      {heading && (
        <h2 className="font-display text-4xl md:text-6xl text-cream leading-tight max-w-4xl">
          {heading}
        </h2>
      )}
    </div>
  )
}

function Rise({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Typed JSON terminal ───────────────────────────────────────────────
function highlightJSON(code) {
  // Line-based tokenizer, safe for display: keys amber, strings cream,
  // numbers electric, punctuation dim.
  return code.split('\n').map((line, i) => {
    const parts = []
    const keyMatch = line.match(/^(\s*)"([^"]+)"(\s*:)(.*)$/)
    if (keyMatch) {
      parts.push(<span key="i">{keyMatch[1]}</span>)
      parts.push(<span key="k" style={{ color: '#FF6B1A' }}>&quot;{keyMatch[2]}&quot;</span>)
      parts.push(<span key="c" className="text-cream/40">{keyMatch[3]}</span>)
      const rest = keyMatch[4]
      if (/^\s*-?[\d.]+,?\s*$/.test(rest)) {
        parts.push(<span key="v" style={{ color: '#00FFB2' }}>{rest}</span>)
      } else {
        parts.push(<span key="v" className="text-cream/85">{rest}</span>)
      }
    } else {
      parts.push(<span key="l" className="text-cream/70">{line}</span>)
    }
    return (
      <div key={i} className="whitespace-pre">
        {parts}
      </div>
    )
  })
}

function TypedTerminal({ code, filename, accent }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [chars, setChars] = useState(reduce ? code.length : 0)
  const done = chars >= code.length

  useEffect(() => {
    if (!inView || reduce) return
    let n = 0
    const t = setInterval(() => {
      n += 7
      setChars(n)
      if (n >= code.length) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [inView, reduce, code.length])

  return (
    <div ref={ref} className="rounded-2xl glass border border-cream/10 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2.5 bg-cream/5 border-b border-cream/10">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="font-mono text-[10px] text-cream/40">{filename}</span>
      </div>
      <div className="p-5 md:p-7 font-mono text-[11px] md:text-[12.5px] leading-relaxed overflow-x-auto">
        {done ? (
          highlightJSON(code)
        ) : (
          <pre className="text-cream/80 whitespace-pre-wrap">
            {code.slice(0, chars)}
            <span className="inline-block w-[7px] h-[13px] align-middle animate-pulse" style={{ background: accent }} />
          </pre>
        )}
      </div>
    </div>
  )
}

// ── Section kinds ─────────────────────────────────────────────────────
function ProseSection({ s, accent, index }) {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label={s.label} heading={s.heading} accent={accent} index={index} />
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3 hidden md:block">
            <div className="sticky top-32 font-display text-8xl leading-none select-none" style={{ color: `${accent}22` }}>
              {String(index).padStart(2, '0')}
            </div>
          </div>
          <div className="md:col-span-9 lg:col-span-8 space-y-6">
            {s.paragraphs.map((p, i) => (
              <Rise key={i} delay={i * 0.08}>
                <p className="text-base md:text-lg text-cream/75 leading-relaxed">{p}</p>
              </Rise>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DiagramSection({ s, accent, index }) {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-transparent via-black/40 to-transparent">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label={s.label} heading={s.heading} accent={accent} index={index} />
        <Rise>
          <p className="text-cream/60 max-w-2xl leading-relaxed mb-10">{s.caption}</p>
        </Rise>
        <Rise delay={0.1}>
          <FlowDiagram diagram={s.diagram} accent={accent} />
        </Rise>
      </div>
    </section>
  )
}

function StagesSection({ s, accent, index }) {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label={s.label} heading={s.heading} accent={accent} index={index} />
        <div className="space-y-4">
          {s.items.map((item, i) => (
            <Rise key={item.title} delay={i * 0.05}>
              <div className="group grid md:grid-cols-[220px_1fr] gap-4 md:gap-8 p-6 md:p-8 rounded-2xl glass border border-cream/10 hover:border-cream/25 transition-colors">
                <div>
                  <div className="font-mono text-[10px] tracking-widest mb-2" style={{ color: accent }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-display text-2xl text-cream leading-tight">{item.title}</h3>
                </div>
                <p className="text-sm md:text-[15px] text-cream/70 leading-relaxed self-center">{item.text}</p>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  )
}

function TerminalSection({ s, accent, index }) {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-transparent via-black/40 to-transparent">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label={s.label} heading={s.heading} accent={accent} index={index} />
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <Rise>
            <TypedTerminal code={s.code} filename={s.filename} accent={accent} />
          </Rise>
          <Rise delay={0.15}>
            <p className="text-base md:text-lg text-cream/70 leading-relaxed border-l pl-6" style={{ borderColor: `${accent}55` }}>
              {s.after}
            </p>
          </Rise>
        </div>
      </div>
    </section>
  )
}

function CardsSection({ s, accent, index }) {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label={s.label} heading={s.heading} accent={accent} index={index} />
        {s.intro && (
          <Rise>
            <p className="text-cream/70 max-w-3xl leading-relaxed mb-10 text-base md:text-lg">{s.intro}</p>
          </Rise>
        )}
        <div className="grid md:grid-cols-2 gap-5">
          {s.items.map((item, i) => (
            <Rise key={item.title} delay={i * 0.07}>
              <div className="h-full p-7 rounded-2xl glass border transition-all hover:-translate-y-1 duration-300"
                style={{ borderColor: `${accent}30` }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs" style={{ color: accent }}>{String(i + 1).padStart(2, '0')}</span>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                </div>
                <h3 className="font-display text-2xl text-cream mb-3">{item.title}</h3>
                <p className="text-sm text-cream/65 leading-relaxed">{item.text}</p>
              </div>
            </Rise>
          ))}
        </div>
        {s.outro && (
          <Rise delay={0.2}>
            <p className="text-cream/60 max-w-3xl leading-relaxed mt-10 italic">{s.outro}</p>
          </Rise>
        )}
      </div>
    </section>
  )
}

function DecisionsSection({ s, accent, index }) {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-transparent via-black/40 to-transparent">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label={s.label} heading={s.heading} accent={accent} index={index} />
        <div className="space-y-px rounded-2xl overflow-hidden border border-cream/10">
          {s.items.map((item, i) => (
            <Rise key={item.title} delay={i * 0.05}>
              <div className="group grid md:grid-cols-[minmax(240px,1fr)_2fr] gap-4 md:gap-10 p-6 md:p-8 bg-cream/[0.02] hover:bg-cream/[0.05] transition-colors">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-[10px] mt-2 tracking-widest" style={{ color: accent }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl text-cream leading-snug">{item.title}</h3>
                </div>
                <p className="text-sm md:text-[15px] text-cream/65 leading-relaxed self-center">{item.text}</p>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  )
}

function NextSection({ s, accent, index }) {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label={s.label} heading="Where this goes from here." accent={accent} index={index} />
        <div className="grid md:grid-cols-2 gap-4">
          {s.items.map((item, i) => (
            <Rise key={i} delay={i * 0.06}>
              <div className="flex gap-4 p-5 rounded-xl border border-cream/10 bg-cream/[0.02]">
                <span className="mt-0.5" style={{ color: accent }}>▸</span>
                <p className="text-sm text-cream/70 leading-relaxed">{item}</p>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  )
}

const SECTION_RENDERERS = {
  prose: ProseSection,
  diagram: DiagramSection,
  stages: StagesSection,
  terminal: TerminalSection,
  cards: CardsSection,
  decisions: DecisionsSection,
  next: NextSection,
}

// ── Hero ──────────────────────────────────────────────────────────────
function CaseHero({ cs }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, 140])
  const opacity = useTransform(scrollY, [0, 550], [1, 0])
  const gridY = useTransform(scrollY, [0, 700], [0, -60])

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden px-6 md:px-16 lg:px-24 pt-28 pb-16">
      {/* 3D perspective grid floor */}
      {!reduce && (
        <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none" style={{ y: gridY, perspective: 700 }}>
          <div
            className="absolute inset-0"
            style={{
              transform: 'rotateX(62deg) scale(1.6)',
              transformOrigin: 'center bottom',
              backgroundImage: `linear-gradient(${cs.accent}22 1px, transparent 1px), linear-gradient(90deg, ${cs.accent}22 1px, transparent 1px)`,
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(ellipse 70% 90% at 50% 100%, black 20%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 90% at 50% 100%, black 20%, transparent 75%)',
              animation: 'caseGridFlow 4s linear infinite',
            }}
          />
        </motion.div>
      )}
      {/* Accent aura */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 55% 45% at 70% 20%, ${cs.accent}14, transparent 65%)` }} />

      <motion.div style={{ y, opacity }} className="relative max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 mb-8">
          <a href="#/ai" className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/40 hover:text-cream transition">
            ← AI / ML
          </a>
          <div className="w-8 h-px" style={{ background: cs.accent }} />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: cs.accent }}>
            Case file {cs.number} — {cs.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.95] max-w-5xl"
        >
          {cs.title.split('—')[0]}
          {cs.title.includes('—') && (
            <em className="block text-3xl md:text-5xl mt-4" style={{ color: cs.accent }}>
              {cs.title.split('—')[1]}
            </em>
          )}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-8 text-base md:text-xl text-cream/70 leading-relaxed max-w-3xl">
          {cs.oneLiner}
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
          className="flex flex-wrap gap-2 mt-8">
          {cs.stack.map((t) => (
            <span key={t} className="chip" style={{ borderColor: `${cs.accent}44`, color: cs.accent, background: `${cs.accent}0d` }}>
              {t}
            </span>
          ))}
        </motion.div>

        {/* Hero stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 border-t border-cream/10 max-w-4xl">
          {cs.heroStats.map((st, i) => (
            <div key={i}>
              <div className="font-display text-2xl md:text-4xl text-cream tabular-nums">{st.v}</div>
              <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-cream/40 mt-1">{st.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes caseGridFlow {
          0% { background-position: 0 0; }
          100% { background-position: 0 64px; }
        }
      `}</style>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────
export default function CaseStudyPage({ slug }) {
  const cs = getCaseStudy(slug)

  if (!cs) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-5xl text-cream mb-6">Case file not found.</h1>
        <GlassyButton href="#/ai" variant="amber" size="md">← Back to AI / ML</GlassyButton>
      </main>
    )
  }

  const idx = CASE_STUDIES.findIndex((c) => c.slug === slug)
  const prev = CASE_STUDIES[(idx + CASE_STUDIES.length - 1) % CASE_STUDIES.length]
  const next = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length]

  return (
    <main>
      <CaseHero cs={cs} />

      {cs.sections.map((s, i) => {
        const Renderer = SECTION_RENDERERS[s.kind]
        return Renderer ? <Renderer key={i} s={s} accent={cs.accent} index={i + 1} /> : null
      })}

      {/* Prev / next case navigation */}
      <section className="px-6 md:px-16 lg:px-24 py-20 border-t border-cream/10">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/40 mb-8">
            More case files
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <a href={`#/case/${prev.slug}`}
              className="group p-8 rounded-2xl glass border border-cream/10 hover:border-cream/30 transition-all hover:-translate-y-1 duration-300">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cream/40 mb-4">
                <ArrowLeft size={12} /> Previous
              </div>
              <div className="font-mono text-[10px] tracking-widest mb-2" style={{ color: prev.accent }}>
                CASE {prev.number}
              </div>
              <h3 className="font-display text-3xl text-cream group-hover:text-cream/80 transition">{prev.shortTitle}</h3>
            </a>
            <a href={`#/case/${next.slug}`}
              className="group p-8 rounded-2xl glass border border-cream/10 hover:border-cream/30 transition-all hover:-translate-y-1 duration-300 text-right">
              <div className="flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-widest text-cream/40 mb-4">
                Next <ArrowRight size={12} />
              </div>
              <div className="font-mono text-[10px] tracking-widest mb-2" style={{ color: next.accent }}>
                CASE {next.number}
              </div>
              <h3 className="font-display text-3xl text-cream group-hover:text-cream/80 transition">{next.shortTitle}</h3>
            </a>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-14">
            <GlassyButton href="#/ai" variant="amber" size="md">← All AI work</GlassyButton>
            <GlassyButton href="#/#contact" variant="default" size="md">Get in touch</GlassyButton>
          </div>
        </div>
      </section>
    </main>
  )
}
