import { useState, useEffect } from 'react'

/**
 * Minimal hash-based router. No dependencies.
 * Routes:
 *   #/               → home
 *   #/#about         → home, then scroll to #about
 *   #/ai             → AI/ML page
 *   #/case/<slug>    → case-study page (agentic-soc, ai-job-pipeline, cassetteiq)
 * Hash routing works on GitHub Pages / any static host without config.
 */
export default function useHashRoute() {
  const parse = () => {
    const raw = window.location.hash.replace(/^#/, '') // e.g. "/ai" or "/#about" or "/"
    const caseMatch = raw.match(/^\/case\/([\w-]+)/)
    if (caseMatch) return { route: 'case', slug: caseMatch[1], section: null }
    if (raw.startsWith('/ai')) return { route: 'ai', slug: null, section: null }
    // home route, optional "#section" after the "/"
    const sectionMatch = raw.match(/^\/#(.+)$/)
    return { route: 'home', slug: null, section: sectionMatch ? sectionMatch[1] : null }
  }

  const [state, setState] = useState(parse())

  useEffect(() => {
    const onChange = () => {
      const next = parse()
      setState(next)
      // After route resolves, scroll appropriately.
      requestAnimationFrame(() => {
        if (next.section) {
          const el = document.getElementById(next.section)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
            return
          }
        }
        window.scrollTo({ top: 0, behavior: 'instant' })
      })
    }
    window.addEventListener('hashchange', onChange)
    // run once on mount in case we land on a deep link
    onChange()
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const navigate = (to) => { window.location.hash = to }

  return { route: state.route, slug: state.slug, section: state.section, navigate }
}
