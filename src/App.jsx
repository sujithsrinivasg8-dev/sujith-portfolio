import { useEffect, useState } from 'react'
import useSmoothScroll from './hooks/useSmoothScroll'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Journey from './components/Journey'
import Skills from './components/Skills'
import Architecture from './components/Architecture'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [mobile, setMobile] = useState(false)
  useSmoothScroll()

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <>
      <Preloader />
      {!mobile && <Cursor />}
      <div className="grain-overlay" />

      <Navigation />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Journey />
        <Skills />
        <Architecture />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
