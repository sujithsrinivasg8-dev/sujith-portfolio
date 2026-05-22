import { motion } from 'framer-motion'
import FFMap3D from './FFMap3D'
import RadiusOnScroll from './RadiusOnScroll'

export default function Journey() {
  return (
    <section id="journey" className="relative py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-amber" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
            03 — The Journey
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <h2 className="font-display text-5xl md:text-7xl text-cream leading-tight">
            From Bapatla to <em className="text-amber">Cincinnati.</em>
          </h2>
          <p className="text-cream/60 text-base leading-relaxed max-w-md">
            Engineering campuses in coastal India to financial systems in the
            US Midwest — every move sharpened how I think about scale,
            reliability, and what production really demands.
          </p>
        </div>
      </div>

      {/* Map */}
      <RadiusOnScroll startRadius={48} endRadius={24}>
        <div className="max-w-7xl mx-auto">
          <FFMap3D />
        </div>
      </RadiusOnScroll>

      {/* Numbers strip */}
      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { num: '2', label: 'Continents', sub: 'India → USA' },
          { num: '4', label: 'Cities lived', sub: 'BPT · BLR · HYD · CIN' },
          { num: '3', label: 'Companies', sub: 'Flipkart · Insight · PNC' },
          { num: '∞', label: 'Lessons', sub: 'Still learning' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="border-t border-cream/10 pt-4"
          >
            <div className="font-display text-5xl md:text-6xl text-cream">{s.num}</div>
            <div className="font-mono text-xs uppercase tracking-widest text-amber mt-2">{s.label}</div>
            <div className="font-mono text-[10px] text-cream/40 mt-1">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
