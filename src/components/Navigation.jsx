import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#/', label: 'Home', no: '01' },
  { href: '#/#about', label: 'About', no: '02' },
  { href: '#/#journey', label: 'Journey', no: '03' },
  { href: '#/#skills', label: 'Capabilities', no: '04' },
  { href: '#/#projects', label: 'Projects', no: '05' },
  { href: '#/ai', label: 'AI / ML', no: '06', highlight: true },
  { href: '#/#experience', label: 'Experience', no: '07' },
  { href: '#/#contact', label: 'Contact', no: '08' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const d = new Date()
      const utc = d.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: false })
      setTime(utc + ' EST')
    }
    updateTime()
    const t = setInterval(updateTime, 60000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.7)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(245,241,234,0.08)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          {/* Logo */}
          <a href="#/" className="group">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 border border-amber rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-1.5 border border-electric/50 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center font-display text-cream text-sm">
                  S
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
                  SUJITH SRINIVAS G
                </div>
                <div className="font-mono text-[9px] text-amber tracking-wider">
                  Software Engineer
                </div>
              </div>
            </div>
          </a>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`group relative font-mono text-[11px] uppercase tracking-[0.15em] transition ${l.highlight ? 'text-amber hover:text-cream' : 'text-cream/60 hover:text-cream'}`}
              >
                <span className={l.highlight ? 'text-amber mr-1' : 'text-amber/50 mr-1'}>{l.no}</span>
                {l.label}
                {l.highlight && <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-amber align-middle" style={{ animation: 'pulse 2s infinite' }} />}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right">
              <div className="font-mono text-[9px] uppercase tracking-widest text-cream/40">
                Local Time
              </div>
              <div className="font-mono text-xs text-electric tabular-nums">{time}</div>
            </div>
            <a
              href="#/#contact"
              className="hidden md:flex chip chip-amber"
            >
              <span className="w-1.5 h-1.5 bg-amber rounded-full animate-pulse" />
              AVAILABLE
            </a>
            <button
              className="lg:hidden text-cream"
              onClick={() => setMobile(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[2000] bg-ink"
          >
            <div className="h-full flex flex-col">
              <div className="flex justify-between p-6">
                <div className="font-display text-2xl">Menu</div>
                <button onClick={() => setMobile(false)} className="text-cream">
                  <X size={28} />
                </button>
              </div>
              <nav className="flex-1 flex flex-col justify-center px-8 gap-3">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobile(false)}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-baseline gap-4 py-3 border-b border-cream/10"
                  >
                    <span className="font-mono text-xs text-amber">{l.no}</span>
                    <span className="font-display text-4xl">{l.label}</span>
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
