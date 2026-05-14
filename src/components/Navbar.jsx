import React, { useState, useEffect, useRef } from 'react'
import assets from '../assets/assets'
import { motion, AnimatePresence } from "motion/react"

/* ── Floating rune particle ─────────────────────────────────── */
const runes = ['✦', '⟡', '◈', '⬡', '✧', '⋆', '⟢', '◇']

function RuneParticle({ x, delay }) {
  return (
    <motion.span
      className="rune-particle"
      style={{ left: `${x}%` }}
      initial={{ y: 0, opacity: 0, scale: 0.5 }}
      animate={{ y: -60, opacity: [0, 0.7, 0], scale: [0.5, 1, 0.3] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: Math.random() * 4 + 2 }}
    >
      {runes[Math.floor(Math.random() * runes.length)]}
    </motion.span>
  )
}

/* ── Enchanted Navbar ────────────────────────────────────────── */
const Navbar = ({ theme, setTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')
  const particleData = useRef(
    Array.from({ length: 8 }, (_, i) => ({ x: 10 + i * 11, delay: i * 0.4 }))
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = ['Home', 'Services', 'Our Work', 'Contact Us']

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500&display=swap');

        .enchanted-header {
          font-family: 'Raleway', sans-serif;
          position: sticky;
          top: 0;
          z-index: 30;
          transition: all 0.4s ease;
        }

        .enchanted-header.scrolled::before {
          opacity: 1;
        }

        .enchanted-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(10, 8, 20, 0.92) 0%,
            rgba(18, 10, 35, 0.95) 50%,
            rgba(8, 15, 25, 0.92) 100%
          );
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(120, 80, 220, 0.2);
          opacity: 0.85;
          transition: opacity 0.4s ease;
          z-index: -1;
        }

        .enchanted-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(139, 92, 246, 0.6) 30%,
            rgba(196, 148, 255, 0.9) 50%,
            rgba(139, 92, 246, 0.6) 70%,
            transparent 100%
          );
        }

        .nav-container {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2.5rem;
          overflow: hidden;
        }

        .rune-particle {
          position: absolute;
          bottom: 0;
          font-size: 10px;
          color: rgba(196, 148, 255, 0.6);
          pointer-events: none;
          user-select: none;
        }

        .logo-wrap {
          position: relative;
          cursor: pointer;
          filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.5));
          transition: filter 0.3s ease;
        }
        .logo-wrap{
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 4px 0;
        }
        .logo-wrap:hover {
          filter: drop-shadow(0 0 16px rgba(196, 148, 255, 0.8));
        }

        .logo-glow-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(139, 92, 246, 0.4);
          animation: pulseRing 3s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        /* Nav links */
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          list-style: none;
          margin: 0; padding: 0;
        }

        .nav-link {
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(210, 190, 240, 0.8);
          text-decoration: none;
          position: relative;
          padding: 0.25rem 0;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c084fc, transparent);
          transition: width 0.4s ease;
        }

        .nav-link::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          color: #e9d5ff;
          filter: blur(6px);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .nav-link:hover {
          color: #e9d5ff;
        }
        .nav-link:hover::before { width: 100%; }
        .nav-link:hover::after { opacity: 1; }

        .nav-link.active {
          color: #c084fc;
        }
        .nav-link.active::before { width: 80%; }

        /* Rune dot on active */
        .nav-link.active .rune-dot {
          opacity: 1;
          transform: translateY(-4px) scale(1);
        }

        .rune-dot {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%) translateY(0) scale(0.5);
          font-size: 8px;
          color: #c084fc;
          opacity: 0;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        /* CTA Button */
        .cta-btn {
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #c084fc;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 2px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          background: rgba(139, 92, 246, 0.05);
        }

        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(196, 148, 255, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .cta-btn:hover {
          border-color: rgba(196, 148, 255, 0.7);
          color: #e9d5ff;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.05);
        }
        .cta-btn:hover::before { opacity: 1; }

        /* Corner runes on button */
        .cta-btn .corner-rune {
          position: absolute;
          font-size: 8px;
          color: rgba(196, 148, 255, 0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .cta-btn:hover .corner-rune { opacity: 1; }
        .cta-btn .corner-rune:nth-child(1) { top: 2px; left: 4px; }
        .cta-btn .corner-rune:nth-child(2) { bottom: 2px; right: 4px; }

        /* Theme toggle */
        .theme-btn {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 4px;
          background: rgba(139, 92, 246, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: rgba(196, 148, 255, 0.7);
          font-size: 16px;
        }
        .theme-btn:hover {
          border-color: rgba(196, 148, 255, 0.6);
          background: rgba(139, 92, 246, 0.15);
          box-shadow: 0 0 12px rgba(139, 92, 246, 0.25);
          color: #e9d5ff;
        }

        /* Mobile menu button */
        .mobile-menu-btn {
          background: none;
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 4px;
          padding: 6px;
          cursor: pointer;
          display: none;
          color: rgba(196, 148, 255, 0.7);
          transition: all 0.3s ease;
        }
        .mobile-menu-btn:hover {
          border-color: rgba(196, 148, 255, 0.6);
          background: rgba(139, 92, 246, 0.1);
        }

        @media (max-width: 640px) {
          .mobile-menu-btn { display: flex; align-items: center; justify-content: center; }
          .desktop-nav { display: none; }
          .desktop-cta { display: none !important; }
          .nav-container { padding: 0.875rem 1.25rem; }
        }

        /* Mobile drawer */
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 280px;
          z-index: 50;
          background: linear-gradient(160deg, rgba(10, 6, 22, 0.98), rgba(18, 8, 35, 0.98));
          border-left: 1px solid rgba(139, 92, 246, 0.2);
          padding: 5rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          backdrop-filter: blur(30px);
        }

        .mobile-nav-link {
          font-family: 'Cinzel', serif;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(210, 190, 240, 0.7);
          text-decoration: none;
          padding: 1rem 0.75rem;
          border-bottom: 1px solid rgba(139, 92, 246, 0.1);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .mobile-nav-link::before {
          content: '⟡';
          font-size: 10px;
          color: rgba(139, 92, 246, 0.5);
          transition: color 0.3s ease;
        }
        .mobile-nav-link:hover {
          color: #e9d5ff;
          padding-left: 1.25rem;
        }
        .mobile-nav-link:hover::before { color: #c084fc; }

        .mobile-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: none;
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 4px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: rgba(196, 148, 255, 0.7);
          font-size: 18px;
          transition: all 0.3s ease;
        }
        .mobile-close-btn:hover {
          background: rgba(139, 92, 246, 0.15);
          color: #e9d5ff;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 40;
          backdrop-filter: blur(2px);
        }

        /* Shimmer sweep on hover of entire nav */
        .shimmer-line {
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(139, 92, 246, 0.06),
            transparent
          );
          pointer-events: none;
          animation: shimmerSweep 6s ease-in-out infinite;
        }

        @keyframes shimmerSweep {
          0% { left: -60%; }
          100% { left: 160%; }
        }
      `}</style>

      <header className={`enchanted-header ${scrolled ? 'scrolled' : ''}`}>
        <motion.div
          className="nav-container"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Shimmer sweep */}
          <div className="shimmer-line" />

          {/* Floating rune particles */}
          {particleData.current.map((p, i) => (
            <RuneParticle key={i} x={p.x} delay={p.delay} />
          ))}

          {/* ── Logo ── */}
          {/* ── Logo ── */}
<motion.div
  className="logo-wrap flex items-center"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
>
  {/* Glow Effect */}
  <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full"></div>

  {/* Logo */}
  <img
    src={assets.codehub4}
    alt="CODEHUB Logo"
    className="
      relative z-10
      h-12 sm:h-14 lg:h-16
      w-auto
      object-contain
      drop-shadow-[0_0_18px_rgba(59,130,246,0.55)]
      transition-all duration-300
    "
  />
</motion.div>

          {/* ── Desktop Nav ── */}
          <nav className="desktop-nav nav-links" aria-label="Main navigation">
            {navLinks.map((item, i) => (
              <motion.a
                key={item}
                href={item === 'Home' ? '#hero' : `#${item.toLowerCase().replace(' ', '-')}`}
                className={`nav-link ${activeLink === item ? 'active' : ''}`}
                data-text={item}
                onClick={() => { setActiveLink(item); setMenuOpen(false) }}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
              >
                <span className="rune-dot">✦</span>
                {item}
              </motion.a>
            ))}
          </nav>

          {/* ── Right Controls ── */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Theme toggle */}
            <button
              className="theme-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                {theme === 'dark' ? '☀' : '◑'}
              </motion.span>
            </button>

            {/* Desktop CTA */}
            <a href="#contact-us" className="cta-btn desktop-cta">
              <span className="corner-rune">✦</span>
              <span className="corner-rune">✦</span>
              <span>Invoke</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </a>

            {/* Mobile hamburger */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="0" y1="1" x2="18" y2="1"/>
                <line x1="4" y1="7" x2="18" y2="7"/>
                <line x1="8" y1="13" x2="18" y2="13"/>
              </svg>
            </button>
          </motion.div>
        </motion.div>

        {/* ── Mobile overlay + drawer ── */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                className="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
              />
              <motion.div
                className="mobile-drawer"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              >
                <button className="mobile-close-btn" onClick={() => setMenuOpen(false)}>×</button>

                {/* Decorative rune header */}
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(139,92,246,0.5)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                  ✦ Navigation ✦
                </div>

                {navLinks.map((item, i) => (
                  <motion.a
                    key={item}
                    href={item === 'Home' ? '#hero' : `#${item.toLowerCase().replace(' ', '-')}`}
                    className="mobile-nav-link"
                    onClick={() => { setActiveLink(item); setMenuOpen(false) }}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                  >
                    {item}
                  </motion.a>
                ))}

                {/* Mobile CTA */}
                <motion.a
                  href="#contact-us"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#c084fc',
                    textDecoration: 'none',
                    marginTop: 'auto',
                    padding: '0.875rem 1rem',
                    border: '1px solid rgba(139,92,246,0.4)',
                    borderRadius: '2px',
                    textAlign: 'center',
                    display: 'block',
                    background: 'rgba(139,92,246,0.08)',
                  }}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  ✦ Invoke ✦
                </motion.a>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

export default Navbar