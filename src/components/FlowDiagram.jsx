import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/**
 * FlowDiagram — cinematic, data-driven architecture diagram.
 * Renders the case-study architectures (nodes + edges) as an animated SVG:
 *  - glass nodes with staggered 3D entrance and hover glow
 *  - curved edges with animated dash flow and particles travelling along paths
 *  - whole diagram tilts subtly in 3D following the mouse
 * Node types: 'agent' (solid glass) · 'store' (dashed) · 'gate' (double ring)
 * · 'io' (soft). Respects prefers-reduced-motion (particles + tilt disabled).
 */

const NODE_H = 84

function nodeCenter(n) {
  return { cx: n.x + n.w / 2, cy: n.y + NODE_H / 2 }
}

/** Compute a smooth path between two nodes based on their relative layout. */
function edgePath(a, b) {
  const A = nodeCenter(a)
  const B = nodeCenter(b)
  const dx = B.cx - A.cx
  const dy = B.cy - A.cy

  // Loop-back (target above source): arc around the outside.
  if (dy < -20) {
    const startX = A.cx + a.w / 2 - 10
    const startY = a.y + 10
    const endX = B.cx + b.w / 2 - 10
    const endY = b.y + NODE_H - 10
    const bow = Math.max(startX, endX) + 70
    return `M ${startX} ${startY} C ${bow} ${startY}, ${bow} ${endY}, ${endX + 12} ${endY}`
  }
  // Mostly-vertical flow: bottom center → top center.
  if (Math.abs(dy) > Math.abs(dx) * 0.6) {
    const sx = A.cx + (dx !== 0 ? Math.sign(dx) * Math.min(Math.abs(dx) * 0.2, 40) : 0)
    const sy = a.y + NODE_H
    const ex = B.cx
    const ey = b.y
    const midY = (sy + ey) / 2
    return `M ${sx} ${sy} C ${sx} ${midY}, ${ex} ${midY}, ${ex} ${ey}`
  }
  // Horizontal flow: right center → left center (or reverse).
  if (dx >= 0) {
    const sx = a.x + a.w
    const sy = A.cy
    const ex = b.x
    const ey = B.cy
    const midX = (sx + ex) / 2
    return `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}`
  }
  const sx = a.x
  const sy = A.cy
  const ex = b.x + b.w
  const ey = B.cy
  const midX = (sx + ex) / 2
  return `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}`
}

function Node({ n, accent, hovered, setHovered, index }) {
  const isHover = hovered === n.id
  const dim = hovered && !isHover
  const styles = {
    agent: { fill: 'rgba(245,241,234,0.05)', stroke: accent, dash: 'none', rx: 14 },
    store: { fill: 'rgba(245,241,234,0.02)', stroke: 'rgba(245,241,234,0.35)', dash: '5 4', rx: 8 },
    gate: { fill: `${accent}14`, stroke: accent, dash: 'none', rx: 42 },
    io: { fill: 'rgba(245,241,234,0.03)', stroke: 'rgba(245,241,234,0.25)', dash: 'none', rx: 14 },
  }
  const s = styles[n.type] || styles.agent

  return (
    <motion.g
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: 0.15 + index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(n.id)}
      onMouseLeave={() => setHovered(null)}
      style={{ cursor: 'default', opacity: dim ? 0.45 : 1, transition: 'opacity 0.25s' }}
    >
      {/* Glow behind on hover */}
      {isHover && (
        <rect x={n.x - 4} y={n.y - 4} width={n.w + 8} height={NODE_H + 8} rx={s.rx + 4}
          fill="none" stroke={accent} strokeWidth="1" opacity="0.35" />
      )}
      <rect x={n.x} y={n.y} width={n.w} height={NODE_H} rx={s.rx}
        fill={s.fill} stroke={isHover ? accent : s.stroke}
        strokeWidth={isHover ? 1.6 : 1} strokeDasharray={s.dash}
        style={{ filter: isHover ? `drop-shadow(0 0 14px ${accent}66)` : 'none', transition: 'all 0.25s' }} />
      {n.type === 'gate' && (
        <rect x={n.x + 5} y={n.y + 5} width={n.w - 10} height={NODE_H - 10} rx={s.rx - 5}
          fill="none" stroke={accent} strokeWidth="0.6" opacity="0.5" strokeDasharray="3 3" />
      )}
      <text x={n.x + n.w / 2} y={n.y + 34} textAnchor="middle" fill="#F5F1EA"
        style={{ fontFamily: "'Geist', system-ui", fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>
        {n.title}
      </text>
      <text x={n.x + n.w / 2} y={n.y + 56} textAnchor="middle"
        fill={n.type === 'gate' ? accent : 'rgba(245,241,234,0.5)'}
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '0.03em' }}>
        {n.sub}
      </text>
    </motion.g>
  )
}

export default function FlowDiagram({ diagram, accent = '#FF6B1A' }) {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState(null)
  const wrapRef = useRef(null)

  // Subtle 3D tilt following the mouse
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [3.5, -3.5]), { stiffness: 150, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-4.5, 4.5]), { stiffness: 150, damping: 20 })

  const onMove = (e) => {
    if (reduce) return
    const rect = wrapRef.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }
  const onLeave = () => { mx.set(0.5); my.set(0.5) }

  const nodesById = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]))
  const edges = diagram.edges.map((e, i) => ({
    ...e,
    id: `e${i}`,
    d: edgePath(nodesById[e.from], nodesById[e.to]),
  }))

  const edgeActive = (e) => hovered && (e.from === hovered || e.to === hovered)

  return (
    <div className="w-full overflow-x-auto no-scrollbar" style={{ perspective: 1400 }}>
      <motion.div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformStyle: 'preserve-3d', minWidth: 760 }}
        className="relative rounded-2xl glass border border-cream/10 p-4 md:p-8"
      >
        {/* Ambient backdrop */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${accent}0d, transparent 70%)` }} />

        <svg viewBox={`0 0 1000 ${diagram.height}`} className="w-full block" style={{ minHeight: 320 }}>
          <defs>
            <marker id={`arrow-${accent.replace('#', '')}`} viewBox="0 0 8 8" refX="7" refY="4"
              markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0.5 L 7.5 4 L 0 7.5 z" fill={accent} opacity="0.85" />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((e) => {
            const active = edgeActive(e)
            const faded = hovered && !active
            return (
              <g key={e.id} style={{ opacity: faded ? 0.2 : 1, transition: 'opacity 0.25s' }}>
                <path d={e.d} fill="none"
                  stroke={active ? accent : 'rgba(245,241,234,0.22)'}
                  strokeWidth={active ? 1.8 : 1.2}
                  strokeDasharray={e.dashed ? '6 5' : '3 6'}
                  markerEnd={`url(#arrow-${accent.replace('#', '')})`}
                  style={{ transition: 'stroke 0.25s' }}>
                  {!reduce && (
                    <animate attributeName="stroke-dashoffset" from="36" to="0"
                      dur={active ? '0.9s' : '1.8s'} repeatCount="indefinite" />
                  )}
                </path>
                {/* Flow particles */}
                {!reduce && [0, 1].map((k) => (
                  <circle key={k} r={active ? 3.2 : 2.4}
                    fill={active ? accent : `${accent}aa`}
                    style={{ filter: `drop-shadow(0 0 5px ${accent})` }}>
                    <animateMotion dur={`${2.4 + k * 0.3}s`} begin={`${k * 1.2}s`}
                      repeatCount="indefinite" path={e.d} />
                  </circle>
                ))}
                {/* Edge label */}
                {e.label && (() => {
                  const a = nodesById[e.from]; const b = nodesById[e.to]
                  const A = nodeCenter(a); const B = nodeCenter(b)
                  const lx = (A.cx + B.cx) / 2 + (e.dashed ? 46 : 0)
                  const ly = (A.cy + B.cy) / 2 - 6
                  return (
                    <g>
                      <rect x={lx - e.label.length * 3.6 - 6} y={ly - 10} width={e.label.length * 7.2 + 12} height={17}
                        rx="8" fill="#0A0A0A" stroke={`${accent}55`} strokeWidth="0.6" />
                      <text x={lx} y={ly + 2} textAnchor="middle" fill={accent}
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        {e.label}
                      </text>
                    </g>
                  )
                })()}
              </g>
            )
          })}

          {/* Nodes */}
          {diagram.nodes.map((n, i) => (
            <Node key={n.id} n={n} accent={accent} hovered={hovered} setHovered={setHovered} index={i} />
          ))}
        </svg>

        {/* Legend */}
        <div className="relative flex flex-wrap gap-x-6 gap-y-2 mt-4 px-2">
          {[
            { label: 'Agent / service', style: { border: `1px solid ${accent}` } },
            { label: 'Data / external', style: { border: '1px dashed rgba(245,241,234,0.4)' } },
            { label: 'Human gate', style: { border: `1px solid ${accent}`, borderRadius: 99, background: `${accent}14` } },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span className="inline-block w-4 h-2.5 rounded-sm" style={l.style} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-cream/40">{l.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
