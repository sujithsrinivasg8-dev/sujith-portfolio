import { motion } from 'framer-motion'
import TextVideoMask from './TextVideoMask'
import GlassyButton from './GlassyButton'
import Unfocused from './Unfocused'
import ExpandedMask from './ExpandedMask'
import RagPipeline from './RagPipeline'
import FraudStream from './FraudStream'

/**
 * AIPage — a dedicated page showcasing Sujith's AI/ML work.
 * All content is grounded in the resume: PNC fraud detection with
 * RAG-based LLM workflows, Python/scikit-learn, LangChain/LangGraph.
 * Reuses existing site components to keep the visual language consistent.
 */

const CAPABILITIES = [
  {
    no: '01', title: 'RAG Pipelines', accent: '#FF6B1A',
    tag: 'Retrieval-augmented generation',
    points: ['Vector search over historical fraud patterns + policy docs', 'Context injection for explainable, grounded LLM verdicts', 'Sub-second retrieval at production scale'],
  },
  {
    no: '02', title: 'LLM Orchestration', accent: '#00FFB2',
    tag: 'LangChain · LangGraph',
    points: ['Chained reasoning steps for edge-case decisions', 'Structured outputs wired into downstream services', 'Guardrails + audit-grade decision logging'],
  },
  {
    no: '03', title: 'ML Classification', accent: '#7C5CFC',
    tag: 'Python · scikit-learn',
    points: ['Real-time anomaly scoring on transaction streams', 'Feature engineering from behavioral baselines', 'Model evaluation tuned on real SLOs, not vanity metrics'],
  },
  {
    no: '04', title: 'Streaming Inference', accent: '#FF6B1A',
    tag: 'Kafka · Kinesis · DynamoDB',
    points: ['Event-driven scoring at 10K+ events/sec', 'Sub-10ms feature-store reads', 'Fault-tolerant, exactly-once processing'],
  },
  {
    no: '05', title: 'Production AI Ops', accent: '#00FFB2',
    tag: 'Observability for ML',
    points: ['Latency + drift monitoring via Prometheus/Grafana', 'Distributed tracing across the inference path', '99.9% availability under peak traffic'],
  },
  {
    no: '06', title: 'Explainability', accent: '#7C5CFC',
    tag: 'Compliance-ready',
    points: ['Human-readable reason for every automated decision', 'Full audit trail in ELK for regulators', 'Combines ML scores with LLM reasoning'],
  },
]

// Full AI/ML stack from the resume, grouped.
const AI_STACK = [
  { group: 'Languages', items: ['Python', 'SQL'] },
  { group: 'ML', items: ['scikit-learn', 'Fraud Detection Systems', 'Anomaly Detection'] },
  { group: 'LLM / GenAI', items: ['LLMs', 'RAG', 'LangChain', 'LangGraph', 'Vector Search', 'Embeddings'] },
  { group: 'Data & Streaming', items: ['Apache Kafka', 'AWS Kinesis', 'DynamoDB', 'Redis', 'Stream Processing'] },
  { group: 'Serving & Cloud', items: ['AWS Lambda', 'ECS', 'EKS', 'Docker', 'Kubernetes'] },
  { group: 'ML Observability', items: ['Prometheus', 'Grafana', 'ELK Stack', 'AWS X-Ray', 'Distributed Tracing'] },
]

// How AI shows up across the career (grounded in resume timeline).
const AI_TIMELINE = [
  {
    company: 'PNC Bank', period: '2026 — Present', color: '#FF6B1A', weight: 'AI-CORE',
    text: 'AI-powered fraud detection with Python, scikit-learn, and RAG-based LLM workflows analyzing millions of transactions daily — the flagship AI work.',
  },
  {
    company: 'Insight Global', period: '2021 — 2024', color: '#00FFB2', weight: 'DATA',
    text: 'Built the Kafka data pipelines and real-time dashboards that are the foundation any production ML system depends on for clean, timely signals.',
  },
  {
    company: 'Flipkart', period: '2019 — 2021', color: '#7C5CFC', weight: 'SCALE',
    text: 'Engineered Kafka streaming and caching at 50M-user scale — the high-throughput data backbone pattern that later fed model inference.',
  },
]

// Production-AI philosophy (mirrors homepage philosophy tone).
const AI_PHILOSOPHY = [
  { no: '01', title: 'Models are services, not notebooks', text: 'A model that works in a notebook routinely fails in production. The hard part — latency, drift, exactly-once data, rollback — is engineering, and that\u2019s where I live.' },
  { no: '02', title: 'Every decision must be explainable', text: 'In a bank, "the model said so" is not an answer. I pair ML scores with RAG-grounded LLM reasoning so every automated verdict carries an audit-grade reason.' },
  { no: '03', title: 'AI rides on solid data infrastructure', text: 'RAG and LLMs are only as good as the stream feeding them. Six years of Kafka, Kinesis, and caching work is what makes the AI layer actually reliable.' },
]


const AI_PROJECTS = [
  {
    badge: 'PNC BANK · 2026 · FLAGSHIP',
    title: 'AI fraud detection with RAG + LLMs.',
    thumbBg: 'linear-gradient(135deg, #FF6B1A 0%, #2a0a00 100%)',
    summary: 'Production fraud-detection engine analyzing millions of transactions daily, combining a fast scikit-learn classifier with a RAG-based LLM reasoning layer for explainable verdicts.',
    stack: ['Python', 'scikit-learn', 'RAG', 'LangChain', 'LLMs', 'Kafka', 'DynamoDB'],
    metrics: [{ v: '−40%', l: 'detection latency' }, { v: 'Millions', l: 'txns/day analyzed' }, { v: '< 150ms', l: 'decision p95' }, { v: '99.9%', l: 'availability' }],
    problem: 'PNC needed sub-second fraud decisioning at scale, without false-positive spikes, and every automated rejection had to be explainable to compliance.',
    approach: [
      'Fast scikit-learn classifier scores every transaction in real time against behavioral baselines',
      'High-risk edge cases escalate to a RAG layer: vector search retrieves similar confirmed-fraud patterns and policy context',
      'LangChain orchestrates an LLM that reasons over the retrieved context and produces a grounded, explainable verdict',
      'Feature store on DynamoDB serves behavioral signals with sub-10ms reads',
      'Full observability: Prometheus/Grafana metrics, distributed tracing, ELK audit logs',
    ],
    impact: [
      'Reduced fraud detection latency by 40%',
      'Improved anomaly detection accuracy on hard edge cases by fusing ML + LLM reasoning',
      'Delivered audit-grade explainability for every automated decision',
      'Sustained 99.9% availability through peak transaction surges',
    ],
  },
  {
    badge: 'AI INFRASTRUCTURE',
    title: 'Event-driven model serving.',
    thumbBg: 'linear-gradient(135deg, #00FFB2 0%, #002a1a 100%)',
    summary: 'The streaming backbone that feeds the models — Kafka/Kinesis pipelines delivering transaction events to inference services at 10K+ events/sec with exactly-once guarantees.',
    stack: ['Apache Kafka', 'AWS Kinesis', 'Java 17', 'Spring Boot', 'DynamoDB', 'EKS'],
    metrics: [{ v: '10K+', l: 'events/sec' }, { v: '< 10ms', l: 'feature reads' }, { v: 'Exactly', l: 'once semantics' }, { v: '15+', l: 'downstream svcs' }],
    problem: 'AI models are only as good as the data path feeding them. Inference needed a low-latency, fault-tolerant stream that never dropped or double-counted an event.',
    approach: [
      'Kafka topics partitioned on customer ID for ordered, parallel processing',
      'Outbox pattern + idempotency keys for exactly-once delivery to model services',
      'Kinesis for cross-region replication and disaster recovery',
      'Autoscaling inference pods on EKS driven by consumer lag',
    ],
    impact: [
      'Fed model inference at 10K+ events/sec with sub-100ms end-to-end latency',
      'Zero data-loss events across the pipeline',
      'Eliminated cascading failures with circuit breakers around every call',
    ],
  },
  {
    badge: 'ML ENGINEERING',
    title: 'From notebook to production.',
    thumbBg: 'linear-gradient(135deg, #7C5CFC 0%, #1a0033 100%)',
    summary: 'The discipline that turns a model into a service: feature engineering, evaluation, packaging, and the observability that keeps it honest once it\u2019s live.',
    stack: ['Python', 'scikit-learn', 'Vector DBs', 'LangGraph', 'Prometheus', 'Grafana'],
    metrics: [{ v: '4', l: 'golden signals' }, { v: '100%', l: 'trace coverage' }, { v: 'Real', l: 'SLO-based alerts' }, { v: '−30%', l: 'MTTR' }],
    problem: 'A model that works in a notebook routinely fails in production — drift, latency, silent degradation. The gap is engineering, not data science.',
    approach: [
      'Feature engineering pipeline reproducible from raw events',
      'Evaluation tuned on real business SLOs rather than offline accuracy alone',
      'Latency + drift monitoring wired into Prometheus/Grafana',
      'Anomaly-based alerting so degradation is caught before customers feel it',
    ],
    impact: [
      'Cut mean-time-to-resolution by 30%',
      '100% inference-path trace coverage',
      'Caught model drift proactively via live monitoring',
    ],
  },
]

function AIThumb({ p }) {
  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden" style={{ background: p.thumbBg }}>
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full opacity-40">
        {/* neural-net flourish */}
        {[80, 200, 320].map((cx, ci) => (
          [120, 250, 380].map((cy, ri) => (
            <circle key={`${ci}-${ri}`} cx={cx} cy={cy} r="4" fill="rgba(255,255,255,0.4)" />
          ))
        ))}
        {[80, 200, 320].map((x1) => (
          [120, 250, 380].map((y1) => (
            [80, 200, 320].map((x2) => (
              x2 > x1 ? <line key={`${x1}-${y1}-${x2}`} x1={x1} y1={y1} x2={x2} y2={250} stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" /> : null
            ))
          ))
        ))}
        <text x="200" y="270" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="90" fontFamily="Instrument Serif">{p.metrics[0].v}</text>
      </svg>
      <div className="absolute bottom-24 left-6 right-6 flex gap-2 flex-wrap">
        {p.metrics.slice(0, 2).map((m, i) => (
          <div key={i} className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 font-mono text-[10px] text-white">
            <span className="font-bold">{m.v}</span><span className="text-white/60 ml-1">{m.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AIDetail({ p }) {
  return (
    <div className="text-cream">
      <p className="font-display text-2xl text-cream/90 leading-snug mb-8">{p.summary}</p>
      <div className="flex flex-wrap gap-2 mb-10">
        {p.stack.map((t) => <span key={t} className="chip">{t}</span>)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 rounded-xl border border-amber/20 bg-amber/5">
        {p.metrics.map((m, i) => (
          <div key={i}>
            <div className="font-display text-3xl text-amber">{m.v}</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-cream/50 mt-1">{m.l}</div>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <div className="font-mono text-xs uppercase tracking-widest text-amber mb-3">◆ Problem</div>
        <p className="text-base text-cream/80 leading-relaxed">{p.problem}</p>
      </div>
      <div className="mb-8">
        <div className="font-mono text-xs uppercase tracking-widest text-electric mb-3">◆ Approach</div>
        <ul className="space-y-2">
          {p.approach.map((a, i) => (
            <li key={i} className="flex gap-3 text-cream/80 text-sm leading-relaxed"><span className="text-electric mt-1">▸</span><span>{a}</span></li>
          ))}
        </ul>
      </div>
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-violet mb-3">◆ Impact</div>
        <ul className="space-y-2">
          {p.impact.map((a, i) => (
            <li key={i} className="flex gap-3 text-cream/80 text-sm leading-relaxed"><span className="text-violet mt-1">●</span><span>{a}</span></li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function AIPage() {
  return (
    <main className="pt-24">
      {/* HERO */}
      <section className="relative px-6 md:px-16 lg:px-24 pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 noise-bg" />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <a href="#/" className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/40 hover:text-amber transition">← Back to portfolio</a>
            <div className="w-8 h-px bg-amber" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">AI / ML Engineering</span>
          </div>

          <div className="max-w-5xl">
            <TextVideoMask text="AI / ML" />
          </div>

          <p className="font-display text-3xl md:text-5xl text-cream/90 leading-tight mt-10 max-w-3xl">
            I don't just <em className="text-amber">use</em> models —
            I ship them to production, at scale, with the
            observability and explainability a <em className="text-electric">bank</em> demands.
          </p>

          <div className="flex flex-wrap gap-4 mt-12">
            <GlassyButton href="#ai-demo" variant="amber" size="lg">See it run</GlassyButton>
            <GlassyButton href="#ai-work" variant="default" size="lg">View AI projects</GlassyButton>
          </div>

          {/* stat strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-cream/10">
            {[
              { num: 'Millions', label: 'Transactions analyzed daily' },
              { num: '−40%', label: 'Fraud detection latency' },
              { num: 'RAG', label: 'LLM reasoning in production' },
              { num: '99.9%', label: 'Inference availability' },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display text-3xl md:text-4xl text-cream">{s.num}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-cream/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE DEMO — RAG pipeline */}
      <section id="ai-demo" className="relative px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-amber" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">01 — How it works</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-end mb-16">
            <h2 className="font-display text-5xl md:text-7xl text-cream leading-tight">
              A transaction's journey through the <em className="text-amber">model.</em>
            </h2>
            <p className="text-cream/60 max-w-md leading-relaxed">
              The actual inference path from the PNC fraud system — ML scoring, RAG retrieval, LLM reasoning, explainable decision. Auto-plays, or click any stage.
            </p>
          </div>
          <RagPipeline />
        </div>
      </section>

      {/* LIVE STREAM */}
      <section className="relative px-6 md:px-16 lg:px-24 py-24 bg-gradient-to-b from-ink to-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-electric" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-electric">02 — In motion</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-end mb-16">
            <h2 className="font-display text-5xl md:text-7xl text-cream leading-tight">
              Watch it <em className="text-electric">score</em> in real time.
            </h2>
            <p className="text-cream/60 max-w-md leading-relaxed">
              A simulated feed of transactions being scored and actioned — the kind of throughput the production system handles continuously.
            </p>
          </div>
          <FraudStream />
        </div>
      </section>

      {/* CAPABILITIES — Unfocused grid */}
      <section className="relative px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-amber" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">03 — Capabilities</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-end mb-16">
            <h2 className="font-display text-5xl md:text-7xl text-cream leading-tight">
              The full AI <em className="text-amber">toolkit.</em>
            </h2>
            <p className="text-cream/60 max-w-md leading-relaxed">
              Hover any card to focus. Everything here is shipped work, not coursework.
            </p>
          </div>
          <Unfocused blurAmount={6} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((c, idx) => (
              <motion.div key={c.no}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                className="relative p-7 rounded-2xl glass h-full" style={{ borderColor: `${c.accent}40` }}>
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-xs" style={{ color: c.accent }}>{c.no}</span>
                  <div className="w-2 h-2 rounded-full" style={{ background: c.accent }} />
                </div>
                <h3 className="font-display text-2xl text-cream mb-1">{c.title}</h3>
                <p className="font-mono text-[10px] uppercase tracking-wider mb-5" style={{ color: c.accent }}>{c.tag}</p>
                <ul className="space-y-2.5">
                  {c.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-xs text-cream/70 leading-relaxed">
                      <span style={{ color: c.accent }} className="mt-0.5">▸</span><span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </Unfocused>
        </div>
      </section>

      {/* AI PROJECTS — ExpandedMask */}
      <section id="ai-work" className="relative px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-amber" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">04 — AI Projects</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-end mb-16">
            <h2 className="font-display text-5xl md:text-7xl text-cream leading-tight">
              AI work, <em className="text-amber">shipped.</em>
            </h2>
            <p className="text-cream/60 max-w-md leading-relaxed">
              Click any tile for the full case study — problem, approach, impact, metrics.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_PROJECTS.map((p, idx) => (
              <ExpandedMask key={p.title} index={`ai-${idx}`} badge={p.badge} title={p.title}
                thumbBg={p.thumbBg} thumbContent={<AIThumb p={p} />} expandedContent={<AIDetail p={p} />} />
            ))}
          </div>
        </div>
      </section>

      {/* AI ACROSS THE CAREER — timeline */}
      <section className="relative px-6 md:px-16 lg:px-24 py-24 bg-gradient-to-b from-black to-ink">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-electric" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-electric">05 — AI Across My Career</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-end mb-16">
            <h2 className="font-display text-5xl md:text-7xl text-cream leading-tight">
              The road to <em className="text-electric">production AI.</em>
            </h2>
            <p className="text-cream/60 max-w-md leading-relaxed">
              The AI work didn't appear from nowhere — six years of data and streaming engineering is what makes it reliable.
            </p>
          </div>
          <div className="space-y-4">
            {AI_TIMELINE.map((t, i) => (
              <motion.div key={t.company}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="grid md:grid-cols-[200px_1fr] gap-6 p-6 rounded-2xl glass border border-cream/10">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ color: t.color, background: `${t.color}1a`, border: `1px solid ${t.color}40` }}>
                    {t.weight}
                  </span>
                  <div className="font-display text-2xl text-cream mt-3">{t.company}</div>
                  <div className="font-mono text-[10px] text-cream/40 mt-1">{t.period}</div>
                </div>
                <p className="text-cream/70 leading-relaxed self-center">{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI TECH STACK */}
      <section className="relative px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-amber" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">06 — AI Tech Stack</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-cream leading-tight mb-16 max-w-3xl">
            Every tool, <em className="text-amber">at a glance.</em>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_STACK.map((g, i) => (
              <motion.div key={g.group}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="p-6 rounded-2xl border border-cream/10 bg-cream/[0.02]">
                <div className="font-mono text-[10px] uppercase tracking-widest text-amber mb-4">{g.group}</div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => <span key={it} className="chip">{it}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative px-6 md:px-16 lg:px-24 py-24 bg-gradient-to-b from-ink to-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-violet" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-violet">07 — How I Think About AI</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-cream leading-tight mb-16 max-w-3xl">
            Production AI is an <em className="text-violet">engineering</em> discipline.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {AI_PHILOSOPHY.map((p) => (
              <motion.div key={p.no}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}
                className="border-l border-violet/30 pl-6 py-2">
                <div className="font-mono text-xs text-violet mb-3">{p.no}</div>
                <h4 className="font-display text-2xl text-cream mb-3">{p.title}</h4>
                <p className="text-sm text-cream/60 leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Education tie-in */}
          <div className="mt-20 grid md:grid-cols-[1fr_auto] gap-8 items-center p-8 rounded-2xl glass border border-cream/10">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-electric mb-2">◆ Academic Foundation</div>
              <h4 className="font-display text-3xl text-cream">M.S. Business Analytics</h4>
              <p className="text-sm text-cream/60 mt-2 max-w-xl">
                A graduate degree centered on statistics, machine learning, and data-driven
                decision-making — the formal grounding behind the applied ML work.
              </p>
            </div>
            <div className="text-right">
              <div className="font-display text-2xl text-cream">University of Cincinnati</div>
              <div className="font-mono text-[10px] text-cream/40 mt-1">DEC 2025</div>
              <div className="font-display text-3xl text-electric mt-3">3.85 <span className="text-cream/30 text-sm">/ 4.0</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA back */}
      <section className="relative px-6 md:px-16 lg:px-24 py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-5xl md:text-7xl text-cream leading-tight mb-8">
            Want the <em className="text-amber">whole picture?</em>
          </h2>
          <p className="text-cream/60 mb-10">
            This is the AI slice. The full portfolio covers the backend, cloud, and systems work behind it.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <GlassyButton href="#/" variant="amber" size="lg">← Back to portfolio</GlassyButton>
            <GlassyButton href="#/#contact" variant="default" size="lg">Get in touch</GlassyButton>
          </div>
        </div>
      </section>
    </main>
  )
}
