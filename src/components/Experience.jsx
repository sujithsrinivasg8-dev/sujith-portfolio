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
      'Engineered microservices processing 15K+ transactions/sec with sub-100ms latency · +35% throughput',
      'Architected Kafka/Kinesis event-driven systems handling 10K+ events/sec across 15+ services',
      'Built AI-powered fraud detection with Python, scikit-learn, RAG/LLM workflows · −40% detection latency',
      'Led EKS cloud-native design achieving 99.9% availability under peak loads',
      'Reduced MTTR 30% via Prometheus, Grafana, ELK, distributed tracing',
    ],
    tech: ['Java 17', 'Spring Boot', 'Kafka', 'AWS Kinesis', 'Python', 'RAG / LLM', 'EKS', 'Prometheus'],
  },
  {
    company: 'Insight Global',
    role: 'Software Engineer',
    location: 'India',
    period: 'Nov 2021 — Aug 2024',
    color: '#7C5CFC',
    bg: 'linear-gradient(135deg, #7C5CFC 0%, #1a0033 100%)',
    bullets: [
      'Built microservices supporting 5K+ req/sec · −30% response latency across distributed architectures',
      'Developed React.js & Angular dashboards with TypeScript for real-time data visualization',
      'Engineered Kafka pipelines processing 8K+ events/sec for enterprise workflows',
      'Reduced AWS infrastructure costs 20%+ through efficient resource provisioning',
      'Cut release cycle time 25% via Docker, Kubernetes, Jenkins CI/CD',
    ],
    tech: ['Java', 'Spring Boot', 'React.js', 'Angular', 'Kafka', 'AWS', 'Docker', 'Resilience4j'],
  },
  {
    company: 'Flipkart',
    role: 'Software Developer',
    location: 'India',
    period: 'Mar 2019 — Oct 2021',
    color: '#00FFB2',
    bg: 'linear-gradient(135deg, #00FFB2 0%, #002a1a 100%)',
    bullets: [
      'Supported 50M+ MAU and 20K+ req/sec during Big Billion Days · −30% API latency',
      'Optimized product catalog REST APIs over 10M+ listings · +35% search response',
      'Built Redis caching layers · −40% DB load during peak sale traffic',
      'Engineered Kafka streaming pipelines for 15K+ events/sec real-time order/inventory sync',
      'Cut deployment time 40% via Docker, Kubernetes, Jenkins CI/CD automation',
    ],
    tech: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'MySQL', 'MongoDB', 'AWS EC2/S3', 'Hystrix'],
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
