import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Github, ArrowRight } from 'lucide-react'
import GlassyButton from './GlassyButton'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = encodeURIComponent(
      `From: ${form.name} <${form.email}>\n\n${form.message}`
    )
    const subject = encodeURIComponent(form.subject || 'Portfolio inquiry')
    window.location.href = `mailto:sujithsrinivasg8@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="relative py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Background flourish */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(255,107,26,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-amber" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
              07 — Let's Build
            </span>
          </div>
          <h2 className="font-display text-6xl md:text-9xl text-cream leading-none">
            Let's <em className="text-amber">talk.</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Terminal contact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl glass border border-cream/10 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 bg-cream/5 border-b border-cream/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-[10px] text-cream/40">sujith@portfolio:~ $</span>
              </div>

              <div className="p-6 md:p-8 font-mono text-sm space-y-3">
                <div className="text-cream/40">$ whoami</div>
                <div className="text-electric mb-4">Sujith Srinivas G — Software Engineer</div>

                <div className="text-cream/40">$ cat status.json</div>
                <div className="pl-2 text-cream/80 mb-4">
                  <div><span className="text-amber">"available"</span>: <span className="text-electric">true</span>,</div>
                  <div><span className="text-amber">"location"</span>: <span className="text-cream">"Cincinnati, OH, USA"</span>,</div>
                  <div><span className="text-amber">"open_to"</span>: [<span className="text-cream">"remote"</span>, <span className="text-cream">"hybrid"</span>, <span className="text-cream">"relocate"</span>],</div>
                  <div><span className="text-amber">"timezone"</span>: <span className="text-cream">"EST (UTC-5)"</span>,</div>
                  <div><span className="text-amber">"response_time"</span>: <span className="text-cream">"&lt; 24 hours"</span></div>
                </div>

                <div className="text-cream/40">$ contact --channels</div>
                <div className="space-y-2 pl-2">
                  <a href="mailto:sujithsrinivasg8@gmail.com" className="flex items-center gap-3 text-cream/80 hover:text-amber transition group">
                    <Mail size={14} className="text-amber" />
                    <span className="group-hover:underline">sujithsrinivasg8@gmail.com</span>
                  </a>
                  <a href="tel:3175230756" className="flex items-center gap-3 text-cream/80 hover:text-amber transition group">
                    <Phone size={14} className="text-amber" />
                    <span className="group-hover:underline">(317) 523-0756</span>
                  </a>
                  <div className="flex items-center gap-3 text-cream/80">
                    <MapPin size={14} className="text-amber" />
                    <span>Cincinnati, OH · United States</span>
                  </div>
                  <a href="https://github.com/sujithsrinivasg8-dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cream/80 hover:text-amber transition group">
                    <Github size={14} className="text-amber" />
                    <span className="group-hover:underline">github.com/sujithsrinivasg8-dev</span>
                  </a>
                </div>

                <div className="text-cream/40 mt-4">$ <span className="animate-pulse">▌</span></div>
              </div>
            </div>

            {/* Social row */}
            <div className="mt-8 flex flex-wrap gap-3">
              <GlassyButton href="mailto:sujithsrinivasg8@gmail.com" variant="amber" size="sm">
                Email Me
              </GlassyButton>
              <GlassyButton href="/Sujith_Srinivas_G.pdf" variant="electric" size="sm" icon={false}>
                ↓ Download Résumé
              </GlassyButton>
              <GlassyButton href="https://github.com/sujithsrinivasg8-dev" variant="default" size="sm">
                GitHub
              </GlassyButton>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl border border-cream/10 p-8 md:p-10"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber mb-6">
              ◆ Send a Message
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-cream/40 block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-cream/20 focus:border-amber outline-none py-2 text-cream font-display text-lg transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-cream/40 block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b border-cream/20 focus:border-amber outline-none py-2 text-cream font-display text-lg transition"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-cream/40 block mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-transparent border-b border-cream/20 focus:border-amber outline-none py-2 text-cream font-display text-lg transition"
                  placeholder="Engineering role inquiry"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-cream/40 block mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border-b border-cream/20 focus:border-amber outline-none py-2 text-cream text-sm transition resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-xs text-electric"
                  >
                    ✓ MAIL CLIENT OPENED · TRANSMITTING...
                  </motion.div>
                ) : (
                  <span className="font-mono text-[10px] text-cream/40">
                    Avg reply: &lt; 24 hours
                  </span>
                )}
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-amber text-ink font-mono text-xs uppercase tracking-widest hover:bg-cream transition"
                >
                  Send Message
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Big footer outro */}
        <div className="border-t border-cream/10 pt-16">
          <h3 className="font-display text-5xl md:text-8xl text-cream/40 leading-none">
            Built systems for
          </h3>
          <h3 className="font-display text-5xl md:text-8xl text-cream leading-none">
            <em className="text-amber">banks. retail. e-comm.</em>
          </h3>
          <h3 className="font-display text-5xl md:text-8xl text-cream/40 leading-none">
            Yours could be next.
          </h3>
        </div>
      </div>
    </section>
  )
}
