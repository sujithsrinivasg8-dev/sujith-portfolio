import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LOCATIONS = [
  { id: 'cin', name: 'Cincinnati, OH', sub: 'Currently · USA', lat: 39.1, lng: -84.5, x: 22, y: 37, current: true },
  { id: 'pgh', name: 'Pittsburgh, PA', sub: 'PNC Bank HQ', lat: 40.4, lng: -79.9, x: 24.5, y: 35, current: false },
  { id: 'blr', name: 'Bangalore, India', sub: 'Flipkart · 2019–21', lat: 12.97, lng: 77.59, x: 68, y: 56, current: false },
  { id: 'hyd', name: 'Hyderabad, India', sub: 'Insight Global · 2021–24', lat: 17.4, lng: 78.5, x: 69.5, y: 52, current: false },
  { id: 'bpt', name: 'Bapatla, India', sub: 'Engineering College', lat: 15.9, lng: 80.5, x: 70.5, y: 54, current: false },
  ]

const CONNECTIONS = [
    ['bpt', 'blr'],
    ['blr', 'hyd'],
    ['hyd', 'cin'],
    ['cin', 'pgh'],
  ]

const CONTINENTS = {
    northAmerica: 'M 8 18 L 10 16 L 14 15 L 18 14 L 22 15 L 26 14 L 30 16 L 32 19 L 33 22 L 34 26 L 33 30 L 31 34 L 29 38 L 27 41 L 25 43 L 23 44 L 21 43 L 19 41 L 18 38 L 16 36 L 14 35 L 12 33 L 10 30 L 9 26 L 8 22 Z',
    southAmerica: 'M 23 46 L 26 45 L 30 47 L 32 50 L 32 54 L 31 58 L 29 63 L 27 67 L 25 70 L 23 69 L 21 65 L 20 61 L 21 56 L 22 51 Z',
    europe: 'M 46 16 L 49 14 L 52 14 L 55 15 L 57 17 L 58 20 L 57 23 L 55 25 L 52 26 L 49 25 L 47 23 L 46 20 Z',
    africa: 'M 47 28 L 51 26 L 55 27 L 58 30 L 60 35 L 60 40 L 59 45 L 57 50 L 55 55 L 53 58 L 50 59 L 48 57 L 46 53 L 45 47 L 45 41 L 46 35 Z',
    asia: 'M 57 14 L 62 12 L 68 11 L 74 12 L 80 13 L 85 15 L 88 19 L 88 24 L 86 28 L 82 31 L 78 33 L 74 34 L 70 33 L 66 31 L 62 29 L 59 26 L 57 22 Z',
    india: 'M 67 33 L 70 34 L 72 37 L 73 41 L 72 45 L 70 49 L 68 51 L 66 49 L 65 44 L 65 39 L 66 35 Z',
    australia: 'M 78 60 L 83 58 L 88 59 L 91 62 L 91 67 L 88 70 L 84 71 L 80 70 L 77 67 L 77 62 Z',
    greenland: 'M 28 8 L 33 7 L 37 9 L 38 13 L 36 16 L 32 17 L 29 15 L 28 11 Z',
}

function RadarRing({ cx, cy, delay, duration }) {
    return (
          <motion.circle
                  cx={cx} cy={cy} r={0}
                  fill="none" stroke="#FF6B1A" strokeWidth="0.3"
                  initial={{ r: 0, opacity: 0.8 }}
                  animate={{ r: 6, opacity: 0 }}
                  transition={{ duration: duration || 2.5, delay: delay || 0, repeat: Infinity, ease: 'easeOut' }}
                />
        )
}

function RadarSweep({ cx, cy, angle }) {
    const RAD = Math.PI / 180
    const sweepArc = 30 * RAD
    const r = 12
    const a1 = angle * RAD
    const a2 = a1 - sweepArc
    const x1 = cx + r * Math.cos(a1)
    const y1 = cy + r * Math.sin(a1)
    const x2 = cx + r * Math.cos(a2)
    const y2 = cy + r * Math.sin(a2)
    const lx = cx + r * Math.cos(a1)
    const ly = cy + r * Math.sin(a1)
    return (
          <g>
                <path
                          d={'M ' + cx + ' ' + cy + ' L ' + x1 + ' ' + y1 + ' A ' + r + ' ' + r + ' 0 0 0 ' + x2 + ' ' + y2 + ' Z'}
                          fill="rgba(0,255,178,0.18)"
                        />
                <line x1={cx} y1={cy} x2={lx} y2={ly} stroke="rgba(0,255,178,0.7)" strokeWidth="0.3" />
          </g>g>
        )
}

function useAnimFrame(callback) {
    const reqRef = useRef()
        const prevRef = useRef()
            useEffect(() => {
                  const loop = (time) => {
                          if (prevRef.current !== undefined) callback(time - prevRef.current, time)
                                  prevRef.current = time
                                          reqRef.current = requestAnimationFrame(loop)
                  }
                        reqRef.current = requestAnimationFrame(loop)
                              return () => cancelAnimationFrame(reqRef.current)
            }, [callback])
}

function getPointOnBezier(ax, ay, cx, cy, bx, by, t) {
    return {
          x: (1-t)*(1-t)*ax + 2*(1-t)*t*cx + t*t*bx,
          y: (1-t)*(1-t)*ay + 2*(1-t)*t*cy + t*t*by,
    }
}

export default function FFMap3D() {
    const [activeId, setActiveId] = useState('cin')
        const [hoverId, setHoverId] = useState(null)
            const [radarAngle, setRadarAngle] = useState(0)
                const [scanY, setScanY] = useState(0)
                    const [packets, setPackets] = useState([])
                        const packetIdRef = useRef(0)
                          
                            useAnimFrame(useCallback((delta) => {
                                  setRadarAngle(prev => (prev + delta * 0.04) % 360)
                                        setScanY(prev => (prev + delta * 0.008) % 100)
                            }, []))
                              
                                useEffect(() => {
                                      const interval = setInterval(() => {
                                              const conn = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)]
                                                      const id = packetIdRef.current++
                                                              setPackets(prev => [...prev, { id, from: conn[0], to: conn[1], startTime: Date.now() }])
                                                                      setTimeout(() => setPackets(prev => prev.filter(p => p.id !== id)), 3000)
                                      }, 900)
                                            return () => clearInterval(interval)
                                }, [])
                                  
                                    const getLoc = (id) => LOCATIONS.find(l => l.id === id)
                                        const activeLoc = getLoc(activeId)
                                            const hoverLoc = hoverId ? getLoc(hoverId) : null
                                                const displayLoc = hoverLoc || activeLoc
                                                  
                                                    const getArcPath = (a, b) => {
                                                          const la = getLoc(a), lb = getLoc(b)
                                                                if (!la || !lb) return ''
                                                                      const mx = (la.x + lb.x) / 2
                                                                            const my = Math.min(la.y, lb.y) - 14
                                                                                  return 'M ' + la.x + ' ' + la.y + ' Q ' + mx + ' ' + my + ' ' + lb.x + ' ' + lb.y
                                                    }
                                                      
                                                        const getArcMid = (a, b) => {
                                                              const la = getLoc(a), lb = getLoc(b)
                                                                    if (!la || !lb) return { mx: 0, my: 0, la, lb }
                                                                          const mx = (la.x + lb.x) / 2
                                                                                const my = Math.min(la.y, lb.y) - 14
                                                                                      return { mx, my, la, lb }
                                                        }
                                                          
                                                            return (
                                                                  <div className="relative w-full select-none">
                                                                      <div
                                                                                className="relative w-full rounded-2xl overflow-hidden"
                                                                                style={{
                                                                                            aspectRatio: '16/9',
                                                                                            background: 'linear-gradient(180deg, #050d14 0%, #020508 100%)',
                                                                                            boxShadow: '0 0 60px rgba(0,255,178,0.08), inset 0 0 80px rgba(0,0,0,0.6)',
                                                                                            border: '1px solid rgba(0,255,178,0.12)',
                                                                                }}
                                                                              >
                                                                        {/* Scanlines */}
                                                                              <div style={{
                                                                                          position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
                                                                                          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)',
                                                                              }} />
                                                                      
                                                                        {/* HUD corners */}
                                                                        {['tl','tr','bl','br'].map((pos) => (
                                                                                          <div key={pos} style={{
                                                                                                        position: 'absolute', width: 18, height: 18, zIndex: 20,
                                                                                                        top: pos.startsWith('t') ? 8 : undefined,
                                                                                                        bottom: pos.startsWith('b') ? 8 : undefined,
                                                                                                        left: pos.endsWith('l') ? 8 : undefined,
                                                                                                        right: pos.endsWith('r') ? 8 : undefined,
                                                                                                        borderTop: pos.startsWith('t') ? '1px solid rgba(0,255,178,0.4)' : undefined,
                                                                                                        borderBottom: pos.startsWith('b') ? '1px solid rgba(0,255,178,0.4)' : undefined,
                                                                                                        borderLeft: pos.endsWith('l') ? '1px solid rgba(0,255,178,0.4)' : undefined,
                                                                                                        borderRight: pos.endsWith('r') ? '1px solid rgba(0,255,178,0.4)' : undefined,
                                                                                            }} />
                                                                                        ))}
                                                                      
                                                                        {/* Status bar */}
                                                                              <div style={{ position: 'absolute', top: 12, left: 16, zIndex: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                                                                                        <motion.div
                                                                                                      animate={{ opacity: [1, 0.3, 1] }}
                                                                                                      transition={{ duration: 1.2, repeat: Infinity }}
                                                                                                      style={{ width: 6, height: 6, borderRadius: '50%', background: '#00FFB2' }}
                                                                                                    />
                                                                                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'rgba(0,255,178,0.7)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                                                                                                    JOURNEY · 6 YEARS
                                                                                        </span>span>
                                                                              </div>div>
                                                                              <div style={{ position: 'absolute', top: 12, right: 16, zIndex: 20 }}>
                                                                                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'rgba(0,255,178,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                                                                                                    USA ◄ INDIA
                                                                                        </span>span>
                                                                              </div>div>
                                                                      
                                                                        {/* Horizontal scan line */}
                                                                              <div style={{
                                                                                          position: 'absolute', left: 0, right: 0, height: 1, zIndex: 8, pointerEvents: 'none',
                                                                                          top: scanY + '%',
                                                                                          background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,178,0.12) 30%, rgba(0,255,178,0.25) 50%, rgba(0,255,178,0.12) 70%, transparent 100%)',
                                                                              }} />
                                                                      
                                                                        {/* SVG Map */}
                                                                              <svg
                                                                                          viewBox="0 0 100 80"
                                                                                          preserveAspectRatio="xMidYMid meet"
                                                                                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 5 }}
                                                                                        >
                                                                                        <defs>
                                                                                                    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
                                                                                                                  <stop offset="0%" stopColor="rgba(0,255,178,0.04)" />
                                                                                                                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                                                                                                      </radialGradient>radialGradient>
                                                                                                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                                                                                                  <feGaussianBlur stdDeviation="0.6" result="blur" />
                                                                                                                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>feMerge>
                                                                                                      </filter>filter>
                                                                                                    <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
                                                                                                                  <feGaussianBlur stdDeviation="1.2" result="blur" />
                                                                                                                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>feMerge>
                                                                                                      </filter>filter>
                                                                                                    <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                                                                                                                  <stop offset="0%" stopColor="rgba(0,255,178,0.12)" />
                                                                                                                  <stop offset="100%" stopColor="rgba(0,255,178,0)" />
                                                                                                      </radialGradient>radialGradient>
                                                                                        </defs>defs>
                                                                              
                                                                                        <rect x="0" y="0" width="100" height="80" fill="url(#bgGlow)" />
                                                                              
                                                                                {/* Grid */}
                                                                                {[10,20,30,40,50,60,70,80,90].map(x => (
                                                                                                      <line key={'v'+x} x1={x} y1="0" x2={x} y2="80" stroke="rgba(0,255,178,0.05)" strokeWidth="0.15" />
                                                                                                    ))}
                                                                                {[10,20,30,40,50,60,70].map(y => (
                                                                                                      <line key={'h'+y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(0,255,178,0.05)" strokeWidth="0.15" />
                                                                                                    ))}
                                                                                        <line x1="50" y1="0" x2="50" y2="80" stroke="rgba(0,255,178,0.09)" strokeWidth="0.2" />
                                                                                        <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(0,255,178,0.09)" strokeWidth="0.2" />
                                                                              
                                                                                {/* Continents */}
                                                                                        <g fill="rgba(245,241,234,0.06)" stroke="rgba(0,255,178,0.2)" strokeWidth="0.25" filter="url(#glow)">
                                                                                          {Object.values(CONTINENTS).map((d, i) => <path key={i} d={d} />)}
                                                                                        </g>g>
                                                                              
                                                                                {/* Radar around active location */}
                                                                                {activeLoc && (
                                                                                                      <g>
                                                                                                                    <circle cx={activeLoc.x} cy={activeLoc.y} r="12" fill="url(#radarGrad)" />
                                                                                                        {[4, 8, 12].map(r => (
                                                                                                                        <circle key={r} cx={activeLoc.x} cy={activeLoc.y} r={r} fill="none" stroke="rgba(0,255,178,0.1)" strokeWidth="0.15" />
                                                                                                                      ))}
                                                                                                                    <RadarSweep cx={activeLoc.x} cy={activeLoc.y} angle={radarAngle} />
                                                                                                                    <RadarRing cx={activeLoc.x} cy={activeLoc.y} delay={0} duration={2.5} />
                                                                                                                    <RadarRing cx={activeLoc.x} cy={activeLoc.y} delay={0.8} duration={2.5} />
                                                                                                                    <RadarRing cx={activeLoc.x} cy={activeLoc.y} delay={1.6} duration={2.5} />
                                                                                                        </g>g>
                                                                                        )}
                                                                              
                                                                                {/* Connection arcs */}
                                                                                {CONNECTIONS.map(([a, b], i) => {
                                                                                                      const arcPath = getArcPath(a, b)
                                                                                                                    if (!arcPath) return null
                                                                                                                                  const isActive = a === activeId || b === activeId || a === hoverId || b === hoverId
                                                                                                                                                return (
                                                                                                                                                                <g key={i}>
                                                                                                                                                                                <path d={arcPath} stroke={isActive ? 'rgba(255,107,26,0.35)' : 'rgba(255,107,26,0.1)'} strokeWidth={isActive ? '0.6' : '0.3'} fill="none" filter="url(#glow)" />
                                                                                                                                                                                <path d={arcPath} stroke={isActive ? 'rgba(255,107,26,0.9)' : 'rgba(255,107,26,0.3)'} strokeWidth="0.2" fill="none" strokeDasharray="0.8 0.8" />
                                                                                                                                                                  </g>g>
                                                                                                                                                              )
                                                                                          })}
                                                                              
                                                                                {/* Animated packets */}
                                                                                {packets.map(packet => {
                                                                                                      const { la, lb, mx, my } = getArcMid(packet.from, packet.to)
                                                                                                                    if (!la || !lb) return null
                                                                                                                                  const t = Math.min((Date.now() - packet.startTime) / 2500, 1)
                                                                                                                                                if (t >= 1) return null
                                                                                                                                                              const pt = getPointOnBezier(la.x, la.y, mx, my, lb.x, lb.y, t)
                                                                                                                                                                            return (
                                                                                                                                                                                            <g key={packet.id} filter="url(#strongGlow)">
                                                                                                                                                                                                            <circle cx={pt.x} cy={pt.y} r="0.8" fill="#FF6B1A" opacity={1 - t * 0.3} />
                                                                                                                                                                                                            <circle cx={pt.x} cy={pt.y} r="0.35" fill="#FFF" opacity={0.9} />
                                                                                                                                                                                                          </g>g>
                                                                                                                                                                                          )
                                                                                          })}
                                                                              
                                                                                {/* Location pins */}
                                                                                {LOCATIONS.map(loc => {
                                                                                                      const isActive = loc.id === activeId
                                                                                                                    const isHover = loc.id === hoverId
                                                                                                                                  const pinColor = loc.current ? '#FF6B1A' : '#00FFB2'
                                                                                                                                                return (
                                                                                                                                                                <g
                                                                                                                                                                                  key={loc.id}
                                                                                                                                                                                  style={{ cursor: 'pointer' }}
                                                                                                                                                                                  onMouseEnter={() => setHoverId(loc.id)}
                                                                                                                                                                                  onMouseLeave={() => setHoverId(null)}
                                                                                                                                                                                  onClick={() => setActiveId(loc.id)}
                                                                                                                                                                                  transform={'translate(' + loc.x + ',' + loc.y + ')'}
                                                                                                                                                                                >
                                                                                                                                                                                <circle r={isActive ? 3.5 : 2.2} fill={loc.current ? 'rgba(255,107,26,0.12)' : 'rgba(0,255,178,0.08)'} filter="url(#glow)" />
                                                                                                                                                                                <circle r={isActive ? 2.1 : 1.5} fill="none" stroke={pinColor} strokeWidth="0.25" opacity={isActive || isHover ? 1 : 0.55} />
                                                                                                                                                                                <circle r={isActive ? 1.0 : 0.65} fill={pinColor} filter={isActive ? 'url(#strongGlow)' : 'url(#glow)'} />
                                                                                                                                                                                <circle r={isActive ? 0.45 : 0.28} fill="#FFFFFF" opacity={0.95} />
                                                                                                                                                                  {(isActive || isHover) && (
                                                                                                                                                                                                    <g>
                                                                                                                                                                                                                        <rect x="2.8" y="-4.2" width={loc.name.length * 1.28} height="3.8" rx="0.4" fill="rgba(5,13,20,0.88)" stroke="rgba(0,255,178,0.4)" strokeWidth="0.15" />
                                                                                                                                                                                                                        <text x="3.4" y="-1.8" fontSize="1.55" fill="#F5F1EA" fontFamily="JetBrains Mono, monospace" fontWeight="bold">{loc.name}</text>text>
                                                                                                                                                                                                                        <text x="3.4" y="-0.4" fontSize="1.1" fill="rgba(0,255,178,0.75)" fontFamily="JetBrains Mono, monospace">{loc.sub}</text>text>
                                                                                                                                                                                                                      </g>g>
                                                                                                                                                                                )}
                                                                                                                                                                  </g>g>
                                                                                                                                                              )
                                                                                })}
                                                                              </svg>svg>
                                                                      
                                                                        {/* Info panel */}
                                                                              <AnimatePresence mode="wait">
                                                                                        <motion.div
                                                                                                      key={displayLoc ? displayLoc.id : 'none'}
                                                                                                      initial={{ opacity: 0, x: 16 }}
                                                                                                      animate={{ opacity: 1, x: 0 }}
                                                                                                      exit={{ opacity: 0, x: 16 }}
                                                                                                      transition={{ duration: 0.22 }}
                                                                                                      style={{
                                                                                                                      position: 'absolute', bottom: 16, right: 16, zIndex: 20,
                                                                                                                      background: 'rgba(5,13,20,0.88)',
                                                                                                                      border: '1px solid rgba(0,255,178,0.2)',
                                                                                                                      borderRadius: 8, padding: '10px 14px',
                                                                                                                      backdropFilter: 'blur(8px)',
                                                                                                        }}
                                                                                                    >
                                                                                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'rgba(0,255,178,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 3 }}>
                                                                                                                  CURRENTLY VIEWING
                                                                                                      </div>div>
                                                                                                    <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 18, color: '#F5F1EA', lineHeight: 1.2 }}>
                                                                                                      {displayLoc ? displayLoc.name : ''}
                                                                                                      </div>div>
                                                                                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#FF6B1A', marginTop: 2, letterSpacing: '0.1em' }}>
                                                                                                      {displayLoc ? displayLoc.sub : ''}
                                                                                                      </div>div>
                                                                                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: 'rgba(245,241,234,0.3)', marginTop: 4 }}>
                                                                                                      {displayLoc ? (displayLoc.lat + 'N, ' + Math.abs(displayLoc.lng) + (displayLoc.lng < 0 ? 'W' : 'E')) : ''}
                                                                                                      </div>div>
                                                                                        </motion.div>motion.div>
                                                                              </AnimatePresence>AnimatePresence>
                                                                      
                                                                        {/* Live signal */}
                                                                              <div style={{ position: 'absolute', bottom: 16, left: 16, zIndex: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                                        <motion.div
                                                                                                      animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                                                                                                      transition={{ duration: 1.5, repeat: Infinity }}
                                                                                                      style={{ width: 5, height: 5, borderRadius: '50%', background: '#00FFB2' }}
                                                                                                    />
                                                                                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: 'rgba(0,255,178,0.5)', letterSpacing: '0.2em' }}>
                                                                                                    LIVE SIGNAL
                                                                                        </span>span>
                                                                              </div>div>
                                                                      </div>div>
                                                                  
                                                                    {/* Location pills */}
                                                                        <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                                                          {LOCATIONS.map((loc, i) => (
                                                                              <motion.button
                                                                                            key={loc.id}
                                                                                            initial={{ opacity: 0, y: 10 }}
                                                                                            animate={{ opacity: 1, y: 0 }}
                                                                                            transition={{ delay: i * 0.08 }}
                                                                                            onClick={() => setActiveId(loc.id)}
                                                                                            style={{
                                                                                                            padding: '6px 14px', borderRadius: 6,
                                                                                                            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                                                                                                            letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
                                                                                                            transition: 'all 0.2s ease',
                                                                                                            border: '1px solid ' + (activeId === loc.id ? (loc.current ? '#FF6B1A' : '#00FFB2') : 'rgba(245,241,234,0.08)'),
                                                                                                            background: activeId === loc.id ? (loc.current ? 'rgba(255,107,26,0.15)' : 'rgba(0,255,178,0.12)') : 'rgba(245,241,234,0.03)',
                                                                                                            color: activeId === loc.id ? (loc.current ? '#FF6B1A' : '#00FFB2') : 'rgba(245,241,234,0.45)',
                                                                                              }}
                                                                                          >
                                                                                          <span style={{ marginRight: 5, fontSize: 9, opacity: 0.6 }}>{loc.current ? 'PRESENT' : 'PAST'}</span>span>
                                                                                {loc.name.split(',')[0]}
                                                                              </motion.button>motion.button>
                                                                            ))}
                                                                        </div>div>
                                                                  </div>div>
                                                                )
                                                              }</g>
