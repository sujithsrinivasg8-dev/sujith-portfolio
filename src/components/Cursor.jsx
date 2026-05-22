import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })

    const handleEnter = (e) => {
      setHovering(true)
      const t = e.target.getAttribute('data-cursor')
      if (t) setText(t)
    }
    const handleLeave = () => {
      setHovering(false)
      setText('')
    }

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <>
      <motion.div
        animate={{ x: pos.x - 4, y: pos.y - 4 }}
        transition={{ type: 'tween', duration: 0 }}
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999 }}
      >
        <div
          style={{
            width: hovering ? 14 : 8,
            height: hovering ? 14 : 8,
            background: hovering ? '#FF6B1A' : '#F5F1EA',
            borderRadius: '50%',
            transition: 'all .2s',
            boxShadow: hovering ? '0 0 20px rgba(255,107,26,0.6)' : 'none',
          }}
        />
      </motion.div>
      <motion.div
        animate={{ x: pos.x - 20, y: pos.y - 20 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99998 }}
      >
        <div
          style={{
            width: hovering ? 60 : 40,
            height: hovering ? 60 : 40,
            border: `1.5px solid ${hovering ? '#FF6B1A' : 'rgba(245,241,234,0.4)'}`,
            borderRadius: '50%',
            transition: 'all .25s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'JetBrains Mono', fontSize: '9px',
            color: '#FF6B1A', letterSpacing: '0.1em',
          }}
        >
          {text && hovering && text}
        </div>
      </motion.div>
    </>
  )
}
