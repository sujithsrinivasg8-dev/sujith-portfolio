import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [pct, setPct] = useState(0)
  const [phase, setPhase] = useState('INITIALIZING')

  const phases = [
    { at: 10, msg: 'INITIALIZING' },
    { at: 30, msg: 'LOADING ASSETS' },
    { at: 55, msg: 'SPAWNING MICROSERVICES' },
    { at: 80, msg: 'CONNECTING STREAMS' },
    { at: 100, msg: 'READY' },
  ]

  useEffect(() => {
    let p = 0
    const timer = setInterval(() => {
      p += Math.random() * 9 + 4
      if (p >= 100) {
        p = 100
        clearInterval(timer)
        setTimeout(() => setLoading(false), 500)
      }
      setPct(Math.floor(p))
      const ph = phases.find((ph) => p <= ph.at)
      if (ph) setPhase(ph.msg)
    }, 80)
    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[99999] bg-ink flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 noise-bg opacity-50" />
          <div className="relative text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 border border-amber rounded-full mx-auto mb-8 relative"
            >
              <div className="absolute inset-2 border border-electric/40 rounded-full" />
              <div className="absolute inset-4 border border-violet/30 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center font-display text-amber text-2xl">
                S
              </div>
            </motion.div>

            <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-amber mb-4">
              {phase}
            </div>

            <div className="w-72 h-px bg-cream/10 mx-auto mb-3 relative overflow-hidden">
              <motion.div
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-amber absolute left-0 top-0"
                style={{ boxShadow: '0 0 10px #FF6B1A' }}
              />
            </div>

            <div className="flex justify-between w-72 mx-auto font-mono text-[9px] text-cream/40">
              <span>SUJITH.SG / V1.0</span>
              <span className="text-amber tabular-nums">{String(pct).padStart(3, '0')}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
