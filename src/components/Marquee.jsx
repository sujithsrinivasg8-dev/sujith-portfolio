import { motion } from 'framer-motion'

const STACK = [
  'Java 17', 'Spring Boot', 'Python', 'Apache Kafka', 'AWS Kinesis',
  'Microservices', 'Kubernetes', 'EKS', 'Docker', 'PostgreSQL', 'DynamoDB',
  'Redis', 'MongoDB', 'LangChain', 'RAG / LLMs', 'scikit-learn',
  'Prometheus', 'Grafana', 'ELK Stack', 'OAuth2 / JWT', 'React.js',
  'Angular', 'TypeScript', 'GraphQL', 'gRPC', 'Jenkins CI/CD',
]

export default function Marquee() {
  return (
    <section className="py-12 border-y border-cream/10 overflow-hidden bg-ink relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #0A0A0A, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, #0A0A0A, transparent)' }} />

      <div className="flex gap-12 whitespace-nowrap">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 shrink-0"
        >
          {[...STACK, ...STACK].map((tech, i) => (
            <span key={i} className="font-display text-3xl md:text-5xl text-cream/30 flex items-center gap-12">
              {tech}
              <span className="text-amber">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
