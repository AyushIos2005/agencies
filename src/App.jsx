import { useEffect, useState, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import Services from './components/Services'
import OurWork from './components/OurWork'
import Teams from './components/Teams'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react'

/* ── Scroll progress bar ──────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #7c3aed, #c084fc, #e9d5ff, #c084fc)',
        transformOrigin: '0%',
        zIndex: 9999,
        boxShadow: '0 0 10px rgba(192,132,252,0.7)',
      }}
    />
  )
}

/* ── Section reveal wrapper ───────────────────────────────────── */
function RevealSection({ children, id, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05, rootMargin: '-40px 0px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}

/* ── Ambient orb ──────────────────────────────────────────────── */
function AmbientOrb({ top, left, right, color, size = 400, duration = 8 }) {
  return (
    <motion.div
      style={{
        position: 'fixed',
        top, left, right,
        width: size, height: size,
        borderRadius: '50%',
        background: color,
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/* ══════════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════════ */
function App() {
  const [theme, setTheme] = useState('dark')
  const [pageReady, setPageReady] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  /* smooth CSS scroll */
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    // slight delay so fonts/layout are ready before animating in
    const t = setTimeout(() => setPageReady(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      background: '#030110',
      overflowX: 'hidden',
    }}>

      {/* ── Scroll progress bar ── */}
      <ScrollProgress />

      {/* ── Fixed ambient orbs ── */}
      <AmbientOrb top="-120px"   left="-80px"  color="rgba(88,28,220,0.12)"  size={500} duration={9}  />
      <AmbientOrb top="40vh"     right="-100px" color="rgba(120,40,200,0.08)" size={420} duration={11} />
      <AmbientOrb top="80vh"     left="20%"    color="rgba(60,20,140,0.07)"  size={380} duration={13} />

      {/* ── Page fade-in ── */}
      <AnimatePresence>
        {pageReady && (
          <motion.div
            key="page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            {/* ── Navbar (sticky, always visible) ── */}
            <Navbar theme={theme} setTheme={setTheme} />

            {/* ── Main content ── */}
            <main>

              {/* Hero — no reveal delay, it's the first thing seen */}
              <RevealSection id="hero">
                <Hero />
              </RevealSection>

              {/* TrustedBy */}
              <RevealSection>
                <TrustedBy />
              </RevealSection>

              {/* Services */}
              <RevealSection id="services">
                <Services />
              </RevealSection>

              {/* Our Work */}
              <RevealSection id="our-work">
                <OurWork />
              </RevealSection>

              {/* Teams */}
              <RevealSection id="teams">
                <Teams />
              </RevealSection>

              {/* Contact */}
              <RevealSection id="contact-us">
                <ContactUs />
              </RevealSection>

            </main>

            {/* ── Footer ── */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <Footer theme={theme} />
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toast notifications ── */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.82rem',
            background: 'rgba(15,8,30,0.95)',
            color: 'rgba(220,200,255,0.9)',
            border: '1px solid rgba(139,92,246,0.3)',
            borderRadius: '3px',
            boxShadow: '0 8px 32px rgba(139,92,246,0.25)',
            backdropFilter: 'blur(20px)',
          },
          success: {
            iconTheme: { primary: '#a855f7', secondary: '#030110' },
          },
        }}
      />
    </div>
  )
}

export default App