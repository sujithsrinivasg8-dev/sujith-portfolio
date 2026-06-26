import { useEffect, useRef, useState } from 'react'

/**
 * HeroGame — "Packet Catch": a tiny, on-brand arcade game for the hero.
 * Move the paddle (mouse / touch / arrow keys) to catch falling data
 * packets. Score = transactions caught ("TPS"). Miss 3 and the stream
 * drops. Pure canvas + rAF, no dependencies. Best score persists locally.
 */
const COLORS = ['#FF6B1A', '#00FFB2', '#7C5CFC']
const HEIGHT = 380
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

export default function HeroGame() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const runningRef = useRef(false)
  const stateRef = useRef(null)

  const [status, setStatus] = useState('idle') // 'idle' | 'playing' | 'over'
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)

  useEffect(() => {
    setBest(Number(localStorage.getItem('heroGameBest') || 0))
  }, [])

  const fitCanvas = () => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return null
    const dpr = window.devicePixelRatio || 1
    const w = Math.max(240, wrap.clientWidth)
    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(HEIGHT * dpr)
    canvas.style.height = HEIGHT + 'px'
    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    return { ctx, w, h: HEIGHT }
  }

  useEffect(() => {
    fitCanvas()
    const onResize = () => {
      const f = fitCanvas()
      const s = stateRef.current
      if (f && s) {
        s.w = f.w
        s.paddleX = clamp(s.paddleX, 0, f.w - s.paddleW)
      }
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafRef.current)
      runningRef.current = false
    }
  }, [])

  const draw = (ctx, s) => {
    const { w, h } = s
    ctx.clearRect(0, 0, w, h)

    s.packets.forEach((p) => {
      ctx.save()
      ctx.shadowColor = p.color
      ctx.shadowBlur = 14
      ctx.fillStyle = p.color
      roundRect(ctx, p.x, p.y, p.size, p.size, 5)
      ctx.fill()
      ctx.restore()
    })

    const py = h - 26
    ctx.save()
    ctx.shadowColor = '#FF6B1A'
    ctx.shadowBlur = 18
    const grad = ctx.createLinearGradient(s.paddleX, 0, s.paddleX + s.paddleW, 0)
    grad.addColorStop(0, '#FF6B1A')
    grad.addColorStop(1, '#FFB169')
    ctx.fillStyle = grad
    roundRect(ctx, s.paddleX, py, s.paddleW, s.paddleH, 6)
    ctx.fill()
    ctx.restore()

    // HUD
    ctx.fillStyle = 'rgba(245,241,234,0.55)'
    ctx.font = '12px "JetBrains Mono", monospace'
    ctx.textBaseline = 'top'
    ctx.fillText('TPS ' + s.caught, 12, 12)
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.fillStyle = i < s.lives ? '#00FFB2' : 'rgba(245,241,234,0.15)'
      ctx.arc(w - 16 - i * 16, 18, 4, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const endGame = () => {
    runningRef.current = false
    setStatus('over')
    const s = stateRef.current
    const final = s ? s.caught : 0
    setBest((prev) => {
      const nb = Math.max(prev, final)
      try { localStorage.setItem('heroGameBest', String(nb)) } catch (e) { /* ignore */ }
      return nb
    })
  }

  const loop = () => {
    if (!runningRef.current) return
    const s = stateRef.current
    const canvas = canvasRef.current
    if (!s || !canvas) return
    const ctx = canvas.getContext('2d')

    if (!document.hidden) {
      s.paddleX += (s.targetX - s.paddleX) * 0.35
      s.paddleX = clamp(s.paddleX, 0, s.w - s.paddleW)

      s.spawnTimer++
      const every = Math.max(32, 72 - s.caught * 1.2)
      if (s.spawnTimer >= every) {
        s.spawnTimer = 0
        const size = 14 + Math.random() * 8
        s.packets.push({
          x: Math.random() * (s.w - size),
          y: -size,
          size,
          vy: s.speed + Math.random() * 1.2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
      s.speed = Math.min(6, 2.2 + s.caught * 0.05)

      const py = s.h - 26
      for (let i = s.packets.length - 1; i >= 0; i--) {
        const p = s.packets[i]
        p.y += p.vy
        const cx = p.x + p.size / 2
        const reachedPaddle = p.y + p.size >= py && p.y + p.size <= py + s.paddleH + p.vy + 2
        if (reachedPaddle && cx >= s.paddleX && cx <= s.paddleX + s.paddleW) {
          s.packets.splice(i, 1)
          s.caught++
          setScore(s.caught)
        } else if (p.y > s.h) {
          s.packets.splice(i, 1)
          s.lives--
          if (s.lives <= 0) {
            draw(ctx, s)
            endGame()
            return
          }
        }
      }
      draw(ctx, s)
    }
    rafRef.current = requestAnimationFrame(loop)
  }

  const startGame = () => {
    const f = fitCanvas()
    if (!f) return
    stateRef.current = {
      w: f.w,
      h: f.h,
      paddleW: 90,
      paddleH: 12,
      paddleX: f.w / 2 - 45,
      targetX: f.w / 2 - 45,
      packets: [],
      spawnTimer: 0,
      speed: 2.2,
      caught: 0,
      lives: 3,
    }
    setScore(0)
    setStatus('playing')
    runningRef.current = true
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(loop)
  }

  const onMove = (clientX) => {
    const s = stateRef.current
    const canvas = canvasRef.current
    if (!s || !canvas) return
    const rect = canvas.getBoundingClientRect()
    s.targetX = clamp(clientX - rect.left - s.paddleW / 2, 0, s.w - s.paddleW)
  }

  const onKey = (e) => {
    const s = stateRef.current
    if (!s || status !== 'playing') return
    if (e.key === 'ArrowLeft') {
      s.targetX = clamp(s.targetX - 32, 0, s.w - s.paddleW)
      e.preventDefault()
    } else if (e.key === 'ArrowRight') {
      s.targetX = clamp(s.targetX + 32, 0, s.w - s.paddleW)
      e.preventDefault()
    }
  }

  return (
    <div
      ref={wrapRef}
      tabIndex={0}
      onKeyDown={onKey}
      aria-label="Mini game: catch the falling data packets with the paddle. Use the mouse or arrow keys."
      className="w-full max-w-md rounded-2xl glass border border-cream/10 overflow-hidden shadow-2xl select-none"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-cream/5 border-b border-cream/10">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="font-mono text-[10px] text-cream/40">
          packet-catch.exe — TPS {score} · best {best}
        </span>
      </div>

      {/* Playfield */}
      <div className="relative" style={{ height: HEIGHT }}>
        <canvas
          ref={canvasRef}
          onMouseMove={(e) => onMove(e.clientX)}
          onTouchMove={(e) => {
            if (e.touches[0]) onMove(e.touches[0].clientX)
            e.preventDefault()
          }}
          className="block w-full"
          style={{ touchAction: 'none' }}
        />

        {status !== 'playing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-ink/55 backdrop-blur-sm">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber mb-3">
              {status === 'over' ? '◆ Stream dropped' : '◆ Mini game'}
            </div>
            <h3 className="font-display text-3xl text-cream mb-2">
              {status === 'over' ? 'Game over' : 'Catch the packets'}
            </h3>
            <p className="text-sm text-cream/60 max-w-[16rem] leading-relaxed mb-6">
              {status === 'over' ? (
                <>You processed <span className="text-electric">{score}</span> transactions{score >= best && score > 0 ? ' — new best!' : '.'}</>
              ) : (
                <>Move with your <span className="text-cream">cursor</span> or <span className="text-cream">← →</span> keys. Don&apos;t drop the stream.</>
              )}
            </p>
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber text-ink font-mono text-xs uppercase tracking-widest hover:bg-cream transition"
            >
              {status === 'over' ? '↻ Play again' : '▶ Play'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
