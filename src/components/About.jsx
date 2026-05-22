import { motion } from 'framer-motion'
import ShowcaseCard from './ShowcaseCard'
import CursorMaskReveal from './CursorMaskReveal'

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 md:px-16 lg:px-24">
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-amber" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
            02 — About Me
          </span>
        </div>
        <h2 className="font-display text-5xl md:text-7xl text-cream max-w-4xl leading-tight">
          Engineer who builds systems that
          <em className="text-amber"> don't fail </em>
          under load.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
        {/* Left: ShowcaseCard with intro */}
        <ShowcaseCard
          eyebrow="// Profile · 2025"
          title="6 years building scale."
          description="Software Engineer with deep expertise in scalable microservices, event-driven architectures, and AI-powered systems. I've designed pipelines processing 15K+ transactions/sec at PNC Bank, served 50M+ users at Flipkart, and shipped RAG-based fraud detection in production."
          meta={
            <>
              <span>📍 Cincinnati, OH</span>
              <span>·</span>
              <span>🎓 MS Business Analytics</span>
              <span>·</span>
              <span className="text-electric">● Open to work</span>
            </>
          }
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {['Java 17', 'Spring Boot', 'Kafka', 'Python', 'AWS', 'RAG/LLM'].map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </ShowcaseCard>

        {/* Right: CursorMaskReveal */}
        <div
          className="relative rounded-2xl overflow-hidden border border-cream/10 glass"
          style={{ minHeight: 500 }}
        >
          <CursorMaskReveal
            topContent={
              <div
                className="w-full h-full flex flex-col justify-center items-center p-12 text-center"
                style={{
                  background: 'linear-gradient(135deg, #FF6B1A 0%, #7C5CFC 100%)',
                }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/80 mb-4">
                  ◆ Move your cursor to reveal
                </div>
                <h3 className="font-display text-4xl md:text-5xl text-ink leading-tight max-w-md">
                  What I bring to your team.
                </h3>
                <div className="mt-8 grid grid-cols-3 gap-6 w-full max-w-md">
                  {['Backend', 'Cloud', 'AI/ML'].map((t) => (
                    <div key={t} className="font-display text-xl text-ink/80">{t}</div>
                  ))}
                </div>
              </div>
            }
            bottomContent={
              <div className="w-full h-full bg-ink p-12 flex flex-col justify-center">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-electric mb-6">
                  ◆ HIDDEN LAYER · Engineering DNA
                </div>
                <div className="space-y-5">
                  <div>
                    <div className="font-display text-3xl text-cream">Throughput obsession.</div>
                    <p className="text-sm text-cream/60 mt-1">15K TPS · sub-100ms latency · 99.9% uptime</p>
                  </div>
                  <div>
                    <div className="font-display text-3xl text-amber">Event-driven thinking.</div>
                    <p className="text-sm text-cream/60 mt-1">Kafka, Kinesis, fault-tolerant streams</p>
                  </div>
                  <div>
                    <div className="font-display text-3xl text-electric">AI-native systems.</div>
                    <p className="text-sm text-cream/60 mt-1">RAG · LLMs · LangChain · production scale</p>
                  </div>
                  <div>
                    <div className="font-display text-3xl text-violet">Full lifecycle.</div>
                    <p className="text-sm text-cream/60 mt-1">Design → build → deploy → observe → scale</p>
                  </div>
                </div>
              </div>
            }
            radius={200}
          />
        </div>
      </div>

      {/* Philosophy strip */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mt-24">
        {[
          {
            no: '01',
            title: 'Scale-first design',
            text: 'Every system I touch is designed for 10x growth. Sharding, partitioning, caching, circuit breakers — built in, not bolted on.',
          },
          {
            no: '02',
            title: 'Observability is sacred',
            text: 'You can\'t fix what you can\'t see. Prometheus, Grafana, ELK, distributed tracing — instrumented from day one.',
          },
          {
            no: '03',
            title: 'AI as infrastructure',
            text: 'LLMs aren\'t novelty — they\'re production primitives. RAG, LangChain, LangGraph wired into real workflows.',
          },
        ].map((item) => (
          <motion.div
            key={item.no}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="border-l border-amber/30 pl-6 py-2"
          >
            <div className="font-mono text-xs text-amber mb-3">{item.no}</div>
            <h4 className="font-display text-2xl text-cream mb-3">{item.title}</h4>
            <p className="text-sm text-cream/60 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
