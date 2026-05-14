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
import { motion, useScroll, useSpring } from 'motion/react'

/* ── Smooth Scroll Progress ───────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background:
          'linear-gradient(90deg, #7c3aed, #c084fc, #e9d5ff)',
        transformOrigin: '0%',
        zIndex: 9999,
      }}
    />
  )
}

/* ── Optimized Reveal Section ─────────────────────────── */
function RevealSection({ children, id }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.15,
      }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.45,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.section>
  )
}

/* ── Lightweight Ambient Orb ─────────────────────────── */
function AmbientOrb({
  top,
  left,
  right,
  color,
  size = 220,
  duration = 8,
}) {
  return (
    <motion.div
      style={{
        position: 'fixed',
        top,
        left,
        right,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        filter: 'blur(45px)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      animate={{
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

/* ════════════════════════════════════════════════════════
   APP
════════════════════════════════════════════════════════ */
function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    )
  }, [theme])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#030110',
        overflowX: 'hidden',
      }}
    >
      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Ambient Effects */}
      <AmbientOrb
        top="-80px"
        left="-80px"
        color="rgba(88,28,220,0.10)"
        size={250}
        duration={10}
      />

      <AmbientOrb
        top="45vh"
        right="-80px"
        color="rgba(120,40,200,0.07)"
        size={220}
        duration={12}
      />

      <AmbientOrb
        top="85vh"
        left="20%"
        color="rgba(60,20,140,0.05)"
        size={200}
        duration={14}
      />

      {/* Main App */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Navbar */}
        <Navbar theme={theme} setTheme={setTheme} />

        {/* Main Content */}
        <main>
          <RevealSection id="hero">
            <Hero />
          </RevealSection>

          <RevealSection>
            <TrustedBy />
          </RevealSection>

          <RevealSection id="services">
            <Services />
          </RevealSection>

          <RevealSection id="our-work">
            <OurWork />
          </RevealSection>

          <RevealSection id="teams">
            <Teams />
          </RevealSection>

          <RevealSection id="contact-us">
            <ContactUs />
          </RevealSection>
        </main>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Footer theme={theme} />
        </motion.div>
      </div>

      {/* Toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.82rem',
            background: 'rgba(15,8,30,0.92)',
            color: 'rgba(220,200,255,0.9)',
            border: '1px solid rgba(139,92,246,0.25)',
            borderRadius: '6px',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
    </div>
  )
}

export default App