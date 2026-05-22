import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * FFMap3D — recreation of the Framer marketplace "FF-Map" component
 * A stylized 3D-feel globe/world map showing key locations with
 * animated pins, connection arcs, and rotating perspective.
 */

const LOCATIONS = [
  { id: 'cin', name: 'Cincinnati, OH', sub: 'Currently · USA', lat: 39.1, lng: -84.5, x: 26, y: 38, current: true },
  { id: 'pgh', name: 'Pittsburgh, PA', sub: 'PNC Bank HQ', lat: 40.4, lng: -79.9, x: 28, y: 36 },
  { id: 'blr', name: 'Bangalore, India', sub: 'Flipkart · 2019–21', lat: 12.97, lng: 77.59, x: 70, y: 56 },
  { id: 'hyd', name: 'Hyderabad, India', sub: 'Insight Global · 2021–24', lat: 17.4, lng: 78.5, x: 72, y: 52 },
  { id: 'bpt', name: 'Bapatla, India', sub: 'Engineering College', lat: 15.9, lng: 80.5, x: 73, y: 54 },
]

const CONNECTIONS = [
  ['bpt', 'blr'],
  ['blr', 'hyd'],
  ['hyd', 'cin'],
  ['cin', 'pgh'],
]

export default function FFMap3D() {
  const [activeId, setActiveId] = useState('cin')
  const [hoverId, setHoverId] = useState(null)
  const mapRef = useRef(null)

  const getLoc = (id) => LOCATIONS.find((l) => l.id === id)

  return (
    <div className="relative w-full">
      {/* Map container with 3D perspective */}
      <div
        ref={mapRef}
        className="relative w-full rounded-2xl overflow-hidden glass"
        style={{
          aspectRatio: '16/9',
          background: 'linear-gradient(180deg, #0F1419 0%, #050709 100%)',
          perspective: '1500px',
        }}
      >
        {/* 3D rotated map */}
        <motion.div
          animate={{ rotateX: [12, 16, 12], rotateZ: [-2, 2, -2] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Lat/lng grid */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            {/* Longitude lines */}
            {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" stroke="rgba(0,255,178,0.06)" strokeWidth="0.1" />
            ))}
            {/* Latitude lines (curved-ish) */}
            {[15, 30, 45, 60, 75].map((y) => (
              <path
                key={`h${y}`}
                d={`M 0 ${y} Q 50 ${y - 2} 100 ${y}`}
                stroke="rgba(0,255,178,0.06)"
                strokeWidth="0.1"
                fill="none"
              />
            ))}

            {/* Stylized continent shapes - simple blobs */}
            <g fill="rgba(245,241,234,0.05)" stroke="rgba(245,241,234,0.15)" strokeWidth="0.15">
              {/* North America */}
              <path d="M 12 22 Q 18 18 28 22 Q 35 28 32 38 Q 30 45 24 42 Q 18 40 14 38 Q 10 30 12 22 Z" />
              {/* South America */}
              <path d="M 26 50 Q 32 52 31 62 Q 28 72 24 70 Q 22 60 26 50 Z" />
              {/* Europe */}
              <path d="M 48 22 Q 55 20 58 28 Q 56 32 52 34 Q 48 32 48 22 Z" />
              {/* Africa */}
              <path d="M 50 36 Q 58 38 60 48 Q 58 60 52 62 Q 46 55 48 42 Q 48 38 50 36 Z" />
              {/* Asia */}
              <path d="M 60 22 Q 78 18 86 28 Q 88 38 82 44 Q 75 48 68 44 Q 60 38 60 22 Z" />
              {/* India */}
              <path d="M 70 44 Q 74 48 73 56 Q 70 58 68 54 Q 68 48 70 44 Z" />
              {/* Australia */}
              <path d="M 82 62 Q 92 64 92 70 Q 88 74 82 72 Q 80 66 82 62 Z" />
            </g>

            {/* Connection arcs */}
            {CONNECTIONS.map(([a, b], i) => {
              const la = getLoc(a), lb = getLoc(b)
              if (!la || !lb) return null
              const mx = (la.x + lb.x) / 2
              const my = Math.min(la.y, lb.y) - 12
              return (
                <g key={i}>
                  <path
                    d={`M ${la.x} ${la.y} Q ${mx} ${my} ${lb.x} ${lb.y}`}
                    stroke="rgba(255,107,26,0.4)"
                    strokeWidth="0.2"
                    fill="none"
                    strokeDasharray="0.6 0.6"
                  />
                  {/* Animated packet on arc */}
                  <circle r="0.5" fill="#FF6B1A">
                    <animateMotion
                      path={`M ${la.x} ${la.y} Q ${mx} ${my} ${lb.x} ${lb.y}`}
                      dur={`${4 + i}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.8}s`}
                    />
                  </circle>
                </g>
              )
            })}
          </svg>

          {/* Pins overlay - HTML so they don't transform with rotation oddly */}
          <div style={{ position: 'absolute', inset: 0, transform: 'translateZ(40px)' }}>
            {LOCATIONS.map((loc) => {
              const isActive = loc.id === activeId
              const isHover = loc.id === hoverId
              return (
                <motion.button
                  key={loc.id}
                  onClick={() => setActiveId(loc.id)}
                  onMouseEnter={() => setHoverId(loc.id)}
                  onMouseLeave={() => setHoverId(null)}
                  style={{
                    position: 'absolute',
                    left: `${loc.x}%`,
                    top: `${loc.y}%`,
                    transform: 'translate(-50%, -50%)',
                    background: 'transparent',
                    border: 'none',
                    padding: 8,
                  }}
                >
                  {/* Pulsing ring */}
                  <motion.div
                    animate={{
                      scale: isActive || isHover ? [1, 2, 1] : [1, 1.5, 1],
                      opacity: isActive || isHover ? [0.6, 0, 0.6] : [0.3, 0, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: 16,
                      height: 16,
                      background: loc.current ? '#FF6B1A' : '#00FFB2',
                      borderRadius: '50%',
                    }}
                  />
                  {/* Solid dot */}
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      background: loc.current ? '#FF6B1A' : '#00FFB2',
                      borderRadius: '50%',
                      boxShadow: `0 0 12px ${loc.current ? '#FF6B1A' : '#00FFB2'}`,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                  {/* Label */}
                  {(isActive || isHover) && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        position: 'absolute',
                        bottom: '180%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                        padding: '6px 12px',
                        background: 'rgba(10,10,10,0.95)',
                        border: `1px solid ${loc.current ? '#FF6B1A' : '#00FFB2'}`,
                        borderRadius: 6,
                        fontFamily: 'JetBrains Mono',
                        fontSize: 10,
                        color: '#F5F1EA',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>{loc.name}</div>
                      <div style={{ color: 'rgba(245,241,234,0.5)', fontSize: 9, marginTop: 2 }}>
                        {loc.sub}
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Atmospheric glow on edges */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Top-left HUD */}
        <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-cream/40 z-10">
          <div className="flex gap-2 items-center mb-1">
            <div className="w-1.5 h-1.5 bg-electric rounded-full animate-pulse" />
            JOURNEY · 6 YEARS
          </div>
          <div>USA ◀ INDIA</div>
        </div>

        {/* Bottom-right active location */}
        <div className="absolute bottom-4 right-4 z-10 text-right">
          {(() => {
            const loc = getLoc(activeId)
            if (!loc) return null
            return (
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-cream/40">
                  Currently Viewing
                </div>
                <div className="font-display text-2xl text-cream mt-1">
                  {loc.name}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-amber mt-1">
                  {loc.sub}
                </div>
                <div className="font-mono text-[9px] text-cream/40 mt-2">
                  {loc.lat.toFixed(2)}°N, {Math.abs(loc.lng).toFixed(2)}°{loc.lng < 0 ? 'W' : 'E'}
                </div>
              </div>
            )
          })()}
        </div>
      </div>

      {/* Location list */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
        {LOCATIONS.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setActiveId(loc.id)}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeId === loc.id
                ? 'border-amber/50 bg-amber/5'
                : 'border-cream/10 hover:border-cream/30'
            }`}
          >
            <div className="font-mono text-[10px] uppercase tracking-wider text-cream/40">
              {loc.current ? 'PRESENT' : 'PAST'}
            </div>
            <div className="text-sm text-cream mt-1 font-medium">{loc.name.split(',')[0]}</div>
            <div className="text-[10px] text-cream/50 font-mono mt-0.5">{loc.sub}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
