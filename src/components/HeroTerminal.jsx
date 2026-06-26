import { motion } from 'framer-motion'

/**
 * HeroTerminal — a compact, animated "identity" terminal for the hero.
 * Conveys role, focus, core stack and live availability at a glance —
 * far more meaningful than an empty portrait placeholder.
 */
const LINES = [
  { text: '$ whoami', className: 'text-cream/40' },
  { text: 'sujith srinivas g — software engineer', className: 'text-electric' },
  { text: '$ cat focus.txt', className: 'text-cream/40' },
  { text: 'High-throughput, low-latency backend platforms', className: 'text-cream/85' },
  { text: '$ stack --core', className: 'text-cream/40' },
  { text: 'Java · Spring Boot · Kafka · AWS · Kubernetes', className: 'text-amber' },
  { text: '$ uptime --prod', className: 'text-cream/40' },
  { text: '99.9% availability · 6 yrs · 3 companies', className: 'text-cream/85' },
]

export default function HeroTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="w-full max-w-md rounded-2xl glass border border-cream/10 overflow-hidden shadow-2xl"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-cream/5 border-b border-cream/10">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="font-mono text-[10px] text-cream/40">sujith@portfolio: ~</span>
      </div>

      {/* Body */}
      <div className="p-5 font-mono text-[12px] md:text-[13px] leading-relaxed space-y-1">
        {LINES.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 + i * 0.12, duration: 0.4 }}
            className={l.className}
          >
            {l.text}
          </motion.div>
        ))}

        {/* Live status line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 + LINES.length * 0.12 }}
          className="flex items-center gap-2 pt-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
          <span className="text-electric">available</span>
          <span className="text-cream/40">· Cincinnati, OH · EST</span>
          <span className="ml-1 inline-block w-[7px] h-[14px] bg-amber animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  )
}
