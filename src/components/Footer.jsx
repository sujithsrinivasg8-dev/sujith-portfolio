export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-cream/10 px-6 md:px-16 lg:px-24 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-cream/30">
          <span>© {year} Sujith Srinivas G</span>
          <span>·</span>
          <span>Built with React + Framer Motion</span>
        </div>
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest text-cream/30">
          <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="hover:text-amber transition">GitHub</a>
          <a href="https://linkedin.com/in/your-handle" target="_blank" rel="noopener noreferrer" className="hover:text-amber transition">LinkedIn</a>
          <a href="/Sujith_Srinivas_G.pdf" className="hover:text-amber transition">Résumé</a>
          <a href="mailto:sujithsrinivasg8@gmail.com" className="hover:text-amber transition">Email</a>
        </div>
      </div>
    </footer>
  )
}
