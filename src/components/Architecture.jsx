import { motion } from 'framer-motion'
import RadiusOnScroll from './RadiusOnScroll'

const NODES = [
  { x: 60, y: 140, label: 'CLIENTS', sub: 'Web · Mobile · API', color: '#F5F1EA' },
  { x: 220, y: 80, label: 'API GATEWAY', sub: 'OAuth2 · JWT · Rate-limit', color: '#FF6B1A' },
  { x: 220, y: 200, label: 'EVENT INGESTION', sub: 'Kafka · Kinesis', color: '#FF6B1A' },
  { x: 420, y: 80, label: 'MICROSERVICES', sub: 'Spring Boot · Java 17', color: '#7C5CFC' },
  { x: 420, y: 200, label: 'STREAM PROCESSING', sub: '8K+ events/sec', color: '#7C5CFC' },
  { x: 620, y: 80, label: 'AI / ML LAYER', sub: 'RAG · LLM · scikit', color: '#00FFB2' },
  { x: 620, y: 200, label: 'DATA LAYER', sub: 'Postgres · Dynamo · Redis', color: '#00FFB2' },
  { x: 820, y: 140, label: 'OBSERVABILITY', sub: 'Prom · Grafana · ELK', color: '#FF6B1A' },
]

const EDGES = [
  [0, 1], [0, 2],
  [1, 3], [2, 4],
  [3, 5], [4, 5], [3, 6], [4, 6],
  [5, 7], [6, 7],
]

export default function Architecture() {
  return (
    <section className="relative py-32 px-6 md:px-16 lg:px-24 bg-ink">
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-amber" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
            ◆ Architecture I Design
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl text-cream max-w-4xl leading-tight">
          A typical system I'd <em className="text-amber">ship.</em>
        </h2>
      </div>

      <RadiusOnScroll startRadius={48} endRadius={20}>
        <div
          className="max-w-7xl mx-auto p-8 md:p-16 border border-cream/10"
          style={{
            background: 'radial-gradient(ellipse at center, #0a0f14 0%, #050709 100%)',
          }}
        >
          <svg viewBox="0 0 900 320" className="w-full">
            <defs>
              <filter id="glow-arch">
                <feGaussianBlur stdDeviation="3" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <marker id="arr-arch" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#FF6B1A" opacity="0.6" />
              </marker>
            </defs>

            {/* Edges */}
            {EDGES.map(([a, b], i) => {
              const A = NODES[a], B = NODES[b]
              return (
                <g key={i}>
                  <line
                    x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                    stroke="rgba(255,107,26,0.2)" strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                  {/* Animated packet */}
                  <circle r="3" fill="#FF6B1A" filter="url(#glow-arch)">
                    <animateMotion
                      path={`M ${A.x} ${A.y} L ${B.x} ${B.y}`}
                      dur={`${2 + (i % 3)}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.3}s`}
                    />
                  </circle>
                </g>
              )
            })}

            {/* Nodes */}
            {NODES.map((n, i) => (
              <g key={i}>
                <circle
                  cx={n.x} cy={n.y} r="32"
                  fill="rgba(10,10,10,0.8)"
                  stroke={n.color} strokeWidth="1.5"
                  filter="url(#glow-arch)"
                />
                <text
                  x={n.x} y={n.y - 4}
                  textAnchor="middle"
                  fill={n.color}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                  fontSize="8"
                >
                  {n.label}
                </text>
                <text
                  x={n.x} y={n.y + 8}
                  textAnchor="middle"
                  fill="rgba(245,241,234,0.4)"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="6"
                >
                  {n.sub}
                </text>
              </g>
            ))}
          </svg>

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-cream/10">
            {[
              { l: 'Ingress', c: '#F5F1EA', d: 'API gateway, OAuth2/JWT, rate-limiting' },
              { l: 'Compute', c: '#7C5CFC', d: 'Stateless Spring Boot microservices on EKS' },
              { l: 'AI / Data', c: '#00FFB2', d: 'RAG, LLMs, polyglot persistence' },
              { l: 'Observability', c: '#FF6B1A', d: 'Prometheus, Grafana, ELK, distributed tracing' },
            ].map((item) => (
              <div key={item.l} className="border-l-2 pl-3" style={{ borderColor: item.c }}>
                <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: item.c }}>
                  {item.l}
                </div>
                <div className="text-xs text-cream/50 mt-1">{item.d}</div>
              </div>
            ))}
          </div>
        </div>
      </RadiusOnScroll>
    </section>
  )
}
