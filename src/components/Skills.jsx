import { motion } from 'framer-motion'
import Unfocused from './Unfocused'

const CATEGORIES = [
  {
    no: '01',
    title: 'Backend Engineering',
    accent: 'amber',
    tagline: 'Where I spend most of my keystrokes.',
    skills: [
      { name: 'Java 17 & Spring Boot', level: 95 },
      { name: 'Microservices Architecture', level: 92 },
      { name: 'REST APIs / gRPC / WebSockets', level: 88 },
      { name: 'Resilience4j / Circuit Breakers', level: 85 },
      { name: 'Python', level: 82 },
    ],
  },
  {
    no: '02',
    title: 'Event Streaming & Data',
    accent: 'electric',
    tagline: 'Real-time pipelines at production scale.',
    skills: [
      { name: 'Apache Kafka', level: 92 },
      { name: 'AWS Kinesis', level: 86 },
      { name: 'PostgreSQL / MySQL', level: 88 },
      { name: 'MongoDB / DynamoDB', level: 85 },
      { name: 'Redis Caching', level: 87 },
    ],
  },
  {
    no: '03',
    title: 'Cloud & DevOps',
    accent: 'violet',
    tagline: 'AWS-native, container-first.',
    skills: [
      { name: 'AWS (EC2, ECS, EKS, Lambda)', level: 90 },
      { name: 'Docker & Kubernetes', level: 88 },
      { name: 'Jenkins / GitHub Actions', level: 85 },
      { name: 'AWS CDK / CloudFormation', level: 82 },
      { name: 'Terraform / IaC', level: 78 },
    ],
  },
  {
    no: '04',
    title: 'AI / ML / RAG',
    accent: 'amber',
    tagline: 'LLMs as production primitives.',
    skills: [
      { name: 'RAG Pipelines', level: 85 },
      { name: 'LangChain / LangGraph', level: 82 },
      { name: 'scikit-learn / Python ML', level: 80 },
      { name: 'Vector DBs / Embeddings', level: 78 },
      { name: 'Fraud Detection Systems', level: 88 },
    ],
  },
  {
    no: '05',
    title: 'Observability',
    accent: 'electric',
    tagline: 'You can\'t fix what you can\'t see.',
    skills: [
      { name: 'Prometheus & Grafana', level: 88 },
      { name: 'ELK Stack (Elastic, Logstash, Kibana)', level: 85 },
      { name: 'New Relic / AWS X-Ray', level: 82 },
      { name: 'Distributed Tracing', level: 85 },
      { name: 'JMeter / Locust Load Testing', level: 78 },
    ],
  },
  {
    no: '06',
    title: 'Frontend',
    accent: 'violet',
    tagline: 'When the backend needs a face.',
    skills: [
      { name: 'React.js', level: 80 },
      { name: 'Angular', level: 75 },
      { name: 'TypeScript', level: 80 },
      { name: 'HTML5 / CSS3', level: 85 },
      { name: 'Data Visualization', level: 78 },
    ],
  },
]

const accentMap = {
  amber: { text: 'text-amber', bg: 'bg-amber', border: 'border-amber/30' },
  electric: { text: 'text-electric', bg: 'bg-electric', border: 'border-electric/30' },
  violet: { text: 'text-violet', bg: 'bg-violet', border: 'border-violet/30' },
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-ink via-ink to-black">
      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-amber" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
            04 — Capabilities
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <h2 className="font-display text-5xl md:text-7xl text-cream leading-tight">
            Tech I ship to <em className="text-amber">production.</em>
          </h2>
          <p className="text-cream/60 max-w-md leading-relaxed">
            Hover any card to focus — others blur into the background.
            Not a checklist — only stacks I've shipped real systems with.
          </p>
        </div>
      </div>

      {/* Unfocused grid of skill cards */}
      <div className="max-w-7xl mx-auto">
        <Unfocused
          blurAmount={6}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CATEGORIES.map((cat, idx) => {
            const a = accentMap[cat.accent]
            return (
              <motion.div
                key={cat.no}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`relative p-7 rounded-2xl glass border ${a.border} h-full`}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className={`font-mono text-xs ${a.text}`}>{cat.no}</span>
                  <div className={`w-2 h-2 rounded-full ${a.bg}`} />
                </div>

                <h3 className="font-display text-2xl text-cream mb-2">{cat.title}</h3>
                <p className="font-mono text-[10px] uppercase tracking-wider text-cream/40 mb-6">
                  {cat.tagline}
                </p>

                <div className="space-y-3">
                  {cat.skills.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs text-cream/80">{s.name}</span>
                        <span className={`font-mono text-[10px] ${a.text}`}>{s.level}%</span>
                      </div>
                      <div className="h-1 bg-cream/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.3 }}
                          className={`h-full ${a.bg} rounded-full`}
                          style={{ boxShadow: `0 0 8px var(--${cat.accent})` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </Unfocused>
      </div>
    </section>
  )
}
