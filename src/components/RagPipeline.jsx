import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * RagPipeline — an animated, auto-playing walkthrough of a RAG-based
 * fraud-detection inference. Demonstrates the AI work visually rather
 * than describing it. Cycles through stages on a timer; user can also
 * click a stage to jump to it.
 */

const STAGES = [
  {
    id: 'ingest',
    label: 'Transaction In',
    color: '#FF6B1A',
    detail: 'A live transaction event arrives via Kafka — amount, merchant, geo, device, velocity signals.',
    code: '{ "amount": 4280.00, "merchant": "UNKNOWN_LLC", "geo": "NG", "device": "new", "velocity_1h": 7 }',
  },
  {
    id: 'features',
    label: 'Feature Lookup',
    color: '#00FFB2',
    detail: 'Sub-10ms feature-store read from DynamoDB pulls the customer\u2019s behavioral baseline.',
    code: 'features = store.get(user_id)  # avg_txn=$120, home_geo=US, devices=2',
  },
  {
    id: 'ml',
    label: 'ML Anomaly Score',
    color: '#7C5CFC',
    detail: 'scikit-learn classifier scores the transaction against the baseline in real time.',
    code: 'risk = clf.predict_proba(x)[0][1]  # → 0.91  (high anomaly)',
  },
  {
    id: 'retrieve',
    label: 'RAG Retrieval',
    color: '#FF6B1A',
    detail: 'For high-risk edge cases, a vector search retrieves similar past fraud patterns + policy docs.',
    code: 'ctx = vectordb.search(embed(txn), k=5)  # similar confirmed-fraud cases',
  },
  {
    id: 'llm',
    label: 'LLM Reasoning',
    color: '#00FFB2',
    detail: 'LangChain feeds context + transaction to an LLM that reasons and produces an explainable verdict.',
    code: 'verdict = chain.invoke({ txn, ctx })  # "BLOCK \u2014 matches pattern #2231: geo+device+velocity"',
  },
  {
    id: 'decision',
    label: 'Decision + Audit',
    color: '#7C5CFC',
    detail: 'Decision returns in <150ms with a human-readable reason logged for compliance.',
    code: '{ "action": "BLOCK", "confidence": 0.94, "latency_ms": 143, "reason": "..." }',
  },
]

export default function RagPipeline() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      setActive((a) => (a + 1) % STAGES.length)
    }, 2600)
    return () => clearInterval(t)
  }, [playing])

  const stage = STAGES[active]

  return (
    <div className="relative">
      {/* Stage rail */}
      <div className="flex flex-wrap gap-2 mb-8">
        {STAGES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setActive(i); setPlaying(false) }}
            className="relative flex-1 min-w-[120px] text-left px-4 py-3 rounded-xl border transition-all"
            style={{
              borderColor: i === active ? s.color : 'rgba(245,241,234,0.1)',
              background: i === active ? `${s.color}12` : 'transparent',
            }}
          >
            <div className="font-mono text-[9px] uppercase tracking-widest" style={{ color: i === active ? s.color : 'rgba(245,241,234,0.4)' }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="text-xs mt-1 font-medium" style={{ color: i === active ? '#F5F1EA' : 'rgba(245,241,234,0.5)' }}>
              {s.label}
            </div>
            {/* progress underline */}
            {i === active && playing && (
              <motion.div
                key={active}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.6, ease: 'linear' }}
                className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                style={{ background: s.color }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Active stage detail */}
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {/* Left: flow diagram */}
        <div className="relative rounded-2xl glass border border-cream/10 p-8 overflow-hidden" style={{ minHeight: 320 }}>
          <svg viewBox="0 0 300 260" className="w-full h-full">
            <defs>
              <filter id="rag-glow"><feGaussianBlur stdDeviation="2.5"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            {STAGES.map((s, i) => {
              const cy = 25 + i * 42
              const on = i <= active
              return (
                <g key={s.id}>
                  {i < STAGES.length - 1 && (
                    <line x1="40" y1={cy} x2="40" y2={cy + 42}
                      stroke={i < active ? s.color : 'rgba(245,241,234,0.15)'} strokeWidth="2" strokeDasharray="3 3"/>
                  )}
                  <circle cx="40" cy={cy} r={i === active ? 11 : 8}
                    fill={on ? s.color : 'rgba(245,241,234,0.1)'}
                    filter={i === active ? 'url(#rag-glow)' : undefined}
                    style={{ transition: 'all 0.4s' }}/>
                  <text x="62" y={cy + 4} fill={on ? '#F5F1EA' : 'rgba(245,241,234,0.4)'}
                    fontFamily="JetBrains Mono, monospace" fontSize="11" style={{ transition: 'fill 0.4s' }}>
                    {s.label}
                  </text>
                  {i === active && (
                    <circle cx="40" cy={cy} r="11" fill="none" stroke={s.color} strokeWidth="1.5">
                      <animate attributeName="r" values="11;20;11" dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite"/>
                    </circle>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Right: detail card */}
        <div className="rounded-2xl border p-8 flex flex-col" style={{ borderColor: `${stage.color}40`, background: `${stage.color}08`, minHeight: 320 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: stage.color }}>
                Stage {active + 1} / {STAGES.length}
              </div>
              <h4 className="font-display text-3xl text-cream mb-4">{stage.label}</h4>
              <p className="text-sm text-cream/70 leading-relaxed mb-6 flex-1">{stage.detail}</p>
              <div className="rounded-lg bg-ink/60 border border-cream/10 p-4 font-mono text-[11px] text-electric overflow-x-auto">
                <span className="text-cream/30 select-none">{'>'} </span>{stage.code}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Play/pause */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button onClick={() => setPlaying((p) => !p)}
          className="chip chip-amber">
          {playing ? '⏸ Pause' : '▶ Auto-play'}
        </button>
        <span className="font-mono text-[10px] text-cream/30 uppercase tracking-widest">
          Click any stage to inspect
        </span>
      </div>
    </div>
  )
}
