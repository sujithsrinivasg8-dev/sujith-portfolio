import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * FraudStream — a simulated live feed of transactions being scored.
 * Demonstrates the fraud-detection system "in motion" (no real backend;
 * deterministic-ish randomness so it always looks plausible).
 */

const MERCHANTS = ['AMZN MKTP', 'STARBUCKS', 'UNKNOWN_LLC', 'UBER TRIP', 'WIRE-XFER', 'APPLE.COM', 'CASINO-XYZ', 'WALMART', 'CRYPTO-EX', 'NETFLIX']
const GEOS = ['US', 'US', 'US', 'US', 'NG', 'RU', 'US', 'CN', 'US', 'BR']

let idCounter = 1000

function makeTxn() {
  const i = Math.floor(Math.random() * MERCHANTS.length)
  const merchant = MERCHANTS[i]
  const geo = GEOS[i]
  const amount = +(Math.random() * 5000 + 5).toFixed(2)
  // risk heuristic for the simulation
  let risk = Math.random() * 0.4
  if (['UNKNOWN_LLC', 'WIRE-XFER', 'CASINO-XYZ', 'CRYPTO-EX'].includes(merchant)) risk += 0.4
  if (['NG', 'RU', 'CN'].includes(geo)) risk += 0.3
  if (amount > 3000) risk += 0.15
  risk = Math.min(0.99, risk)
  const latency = Math.floor(Math.random() * 80 + 90)
  return {
    id: idCounter++,
    merchant,
    geo,
    amount,
    risk: +risk.toFixed(2),
    latency,
    action: risk > 0.7 ? 'BLOCK' : risk > 0.45 ? 'REVIEW' : 'APPROVE',
  }
}

const actionColor = { APPROVE: '#00FFB2', REVIEW: '#FF6B1A', BLOCK: '#ff4444' }

export default function FraudStream() {
  const [rows, setRows] = useState(() => Array.from({ length: 5 }, makeTxn))
  const [stats, setStats] = useState({ total: 0, blocked: 0, reviewed: 0, avgLatency: 0 })
  const [running, setRunning] = useState(true)
  const statsRef = useRef({ total: 5, blocked: 0, reviewed: 0, latencySum: 0 })

  useEffect(() => {
    if (!running) return
    const t = setInterval(() => {
      const txn = makeTxn()
      setRows((prev) => [txn, ...prev].slice(0, 7))
      const s = statsRef.current
      s.total += 1
      if (txn.action === 'BLOCK') s.blocked += 1
      if (txn.action === 'REVIEW') s.reviewed += 1
      s.latencySum += txn.latency
      setStats({
        total: s.total,
        blocked: s.blocked,
        reviewed: s.reviewed,
        avgLatency: Math.round(s.latencySum / s.total),
      })
    }, 1400)
    return () => clearInterval(t)
  }, [running])

  return (
    <div className="rounded-2xl glass border border-cream/10 overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-cream/10 bg-cream/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-electric" style={{ animation: 'pulse 1.5s infinite' }} />
          <span className="font-mono text-[10px] uppercase tracking-widest text-cream/60">
            fraud-engine · live inference
          </span>
        </div>
        <button onClick={() => setRunning((r) => !r)} className="font-mono text-[10px] uppercase tracking-widest text-amber hover:text-cream transition">
          {running ? '⏸ pause' : '▶ resume'}
        </button>
      </div>

      {/* stat strip */}
      <div className="grid grid-cols-4 gap-px bg-cream/10">
        {[
          { l: 'Scored', v: stats.total, c: '#F5F1EA' },
          { l: 'Approved', v: stats.total - stats.blocked - stats.reviewed, c: '#00FFB2' },
          { l: 'Blocked', v: stats.blocked, c: '#ff4444' },
          { l: 'Avg ms', v: stats.avgLatency || '—', c: '#FF6B1A' },
        ].map((s) => (
          <div key={s.l} className="bg-ink px-4 py-3">
            <div className="font-display text-2xl" style={{ color: s.c }}>{s.v}</div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-cream/40">{s.l}</div>
          </div>
        ))}
      </div>

      {/* stream */}
      <div className="p-3 space-y-1.5" style={{ minHeight: 340 }}>
        <AnimatePresence initial={false}>
          {rows.map((r) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-ink/40 border border-cream/5 font-mono text-xs"
            >
              <span className="text-cream/30 tabular-nums">#{r.id}</span>
              <span className="text-cream/80 flex-1 truncate">{r.merchant}</span>
              <span className="text-cream/40 hidden sm:inline">{r.geo}</span>
              <span className="text-cream/70 tabular-nums w-20 text-right">${r.amount.toLocaleString()}</span>
              {/* risk bar */}
              <div className="hidden md:flex items-center gap-1.5 w-24">
                <div className="flex-1 h-1 bg-cream/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${r.risk * 100}%`, background: actionColor[r.action] }} />
                </div>
                <span className="text-cream/40 tabular-nums text-[10px]">{r.risk}</span>
              </div>
              <span
                className="px-2 py-0.5 rounded text-[10px] font-bold tabular-nums w-16 text-center"
                style={{ color: actionColor[r.action], background: `${actionColor[r.action]}1a` }}
              >
                {r.action}
              </span>
              <span className="text-cream/30 tabular-nums w-12 text-right text-[10px]">{r.latency}ms</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="px-5 py-2 border-t border-cream/10 font-mono text-[9px] text-cream/30 uppercase tracking-widest text-center">
        Simulated visualization · models analyze millions of real transactions/day in production
      </div>
    </div>
  )
}
