import { motion } from 'framer-motion'
import Book3D from './Book3D'

const EXPERIENCE = [
  {
    company: 'PNC Bank',
    role: 'Software Engineer',
    location: 'USA',
    period: 'Feb 2026 — Present',
    color: '#FF6B1A',
    bg: 'linear-gradient(135deg, #FF6B1A 0%, #2a0a00 100%)',
    bullets: [
      'Engineered fraud & risk decisioning microservices processing 22K+ transactions/sec at sub-100ms latency · −28% false positives',
      'Built Kafka Streams pipelines across 15+ services, absorbing 3x peak holiday volume · zero downtime',
      'Built AI fraud & document intelligence with Python, scikit-learn, RAG/LLM, AWS Textract · −40% detection latency · 85% of loan reviews automated at 99.2% accuracy',
      'Migrated 3 legacy monoliths to AWS EKS · 99.99% availability with canary releases',
      'Cut AWS Lambda spend $22K/month · −30% MTTR via Prometheus, Grafana, New Relic, X-Ray',
    ],
    tech: ['Java 21', 'Spring Boot 3', 'Kafka Streams', 'DynamoDB', 'EKS', 'GraphQL', 'RAG / LLM', 'AWS Textract'],
  },
  {
    company: 'Insight Global',
    role: 'Software Engineer',
    location: 'India',
    period: 'Nov 2021 — Aug 2024',
    color: '#7C5CFC',
    bg: 'linear-gradient(135deg, #7C5CFC 0%, #1a0033 100%)',
    bullets: [
      'Scaled a financial transaction platform to 50K+ daily transactions for 2M+ monthly active customers',
      'Optimized API response times 40% via Redis caching, indexing, query tuning & database sharding',
      'Led 4 engineers migrating monoliths to Docker/Kubernetes/EKS · −60% deploy time · −$18K/month cloud costs',
      'Integrated Kafka event streaming at 8K+ events/sec for real-time fraud alerting · −25% false positives',
      'Pioneered GraphQL for mobile APIs · −45% payload size · +30% app performance',
    ],
    tech: ['Java', 'Spring Boot', 'Angular', 'Kafka', 'AWS EKS', 'Redis', 'GraphQL', 'Resilience4j'],
  },
  {
    company: 'Flipkart',
    role: 'Software Developer',
    location: 'India',
    period: 'Mar 2019 — Oct 2021',
    color: '#00FFB2',
    bg: 'linear-gradient(135deg, #00FFB2 0%, #002a1a 100%)',
    bullets: [
      'Supported 50M+ MAU and 20K+ req/sec during peak sale events · −30% API latency',
      'Cut report generation from 12s to 3s via PostgreSQL/MySQL index & query tuning',
      'Integrated Redis caching for 10M+ daily users · −200ms API latency on hot endpoints',
      'Reduced duplicate transactions 99% with idempotency keys across Kafka pipelines at 15K+ events/sec',
      'Adopted gRPC + Protocol Buffers · −120ms inter-service latency during sale events',
    ],
    tech: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'PostgreSQL', 'MySQL', 'gRPC', 'Hystrix'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-black via-ink to-ink">
      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-amber" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
            06 — Career
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <h2 className="font-display text-5xl md:text-7xl text-cream leading-tight">
            The career in <em className="text-amber">three chapters.</em>
          </h2>
          <p className="text-cream/60 max-w-md leading-relaxed">
            Hover any book to flip it open. Six years across three companies,
            two continents, and many production fires put out.
          </p>
        </div>
      </div>

      {/* 3D Books row */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        {EXPERIENCE.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: idx * 0.15, duration: 0.8 }}
          >
            <Book3D
              title={exp.company}
              subtitle={exp.role}
              author={exp.period}
              cover={exp.bg}
              spine={exp.color}
              pages={exp.bullets.map((b, i) => ({
                chapter: `Highlight ${i + 1}`,
                title: b.split('·')[0].trim(),
                text: b.includes('·')
                  ? b.split('·').slice(1).map(s => s.trim()).join(' · ')
                  : b,
              }))}
            />
            {/* Caption */}
            <div className="mt-6 pt-6 border-t border-cream/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: exp.color }} />
                <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">
                  {exp.location} · {exp.period}
                </span>
              </div>
              <h4 className="font-display text-2xl text-cream">{exp.company}</h4>
              <p className="text-xs text-cream/50 mt-1">{exp.role}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {exp.tech.slice(0, 4).map((t) => (
                  <span key={t} className="chip text-[9px]" style={{ padding: '2px 8px' }}>{t}</span>
                ))}
                {exp.tech.length > 4 && (
                  <span className="chip text-[9px]" style={{ padding: '2px 8px' }}>+{exp.tech.length - 4}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Education footer */}
      <div className="max-w-7xl mx-auto mt-32 grid md:grid-cols-2 gap-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber mb-2 col-span-full">
          ◆ Education
        </div>
        <div className="glass rounded-2xl p-8 border border-cream/10 hover-lift">
          <div className="font-mono text-[10px] uppercase tracking-widest text-amber">
            Dec 2025
          </div>
          <h4 className="font-display text-3xl text-cream mt-3">M.S. Business Analytics</h4>
          <p className="text-sm text-cream/60 mt-2">University of Cincinnati</p>
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-cream/10">
            <span className="font-mono text-xs text-cream/50">GPA</span>
            <span className="font-display text-2xl text-electric">3.85 <span className="text-cream/30 text-sm">/ 4.0</span></span>
          </div>
        </div>
        <div className="glass rounded-2xl p-8 border border-cream/10 hover-lift">
          <div className="font-mono text-[10px] uppercase tracking-widest text-amber">
            Apr 2018
          </div>
          <h4 className="font-display text-3xl text-cream mt-3">B.Tech Civil Engineering</h4>
          <p className="text-sm text-cream/60 mt-2">Bapatla Engineering College</p>
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-cream/10">
            <span className="font-mono text-xs text-cream/50">GPA</span>
            <span className="font-display text-2xl text-electric">3.2 <span className="text-cream/30 text-sm">/ 4.0</span></span>
          </div>
        </div>
      </div>
    </section>
  )
}
