import React, { useRef, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { motion, useScroll, useTransform } from 'motion/react'

/* ── Floating rune particle (reused pattern from Navbar) ────── */
const runes = ['✦', '⟡', '◈', '⬡', '✧', '⋆', '⟢', '◇', '⌬', '⎊']

function RuneParticle({ x, y, delay, size = 10 }) {
  return (
    <motion.span
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        fontSize: size,
        color: 'rgba(196, 148, 255, 0.45)',
        pointerEvents: 'none',
        userSelect: 'none',
        fontFamily: 'sans-serif',
      }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{
        y: [-8, 8, -8],
        opacity: [0, 0.6, 0.6, 0],
        scale: [0.4, 1, 0.8, 0.3],
        rotate: [0, 15, -10, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 5 + 3,
        ease: 'easeInOut',
      }}
    >
      {runes[Math.floor(Math.random() * runes.length)]}
    </motion.span>
  )
}

/* ── Orbiting glyph ring ────────────────────────────────────── */
function GlyphRing({ radius = 120, count = 8, duration = 18, reverse = false }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: radius * 2,
        height: radius * 2,
        left: '50%',
        top: '50%',
        marginLeft: -radius,
        marginTop: -radius,
        borderRadius: '50%',
        border: '1px solid rgba(139, 92, 246, 0.12)',
      }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360
        const rad = (angle * Math.PI) / 180
        return (
          <motion.span
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              marginLeft: -5,
              marginTop: -5,
              transform: `translate(${Math.cos(rad) * radius}px, ${Math.sin(rad) * radius}px)`,
              fontSize: 8 + (i % 3) * 2,
              color: i % 3 === 0 ? 'rgba(196,148,255,0.5)' : 'rgba(139,92,246,0.3)',
              fontFamily: 'sans-serif',
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
          >
            {runes[i % runes.length]}
          </motion.span>
        )
      })}
    </motion.div>
  )
}

/* ── Animated hex grid background ──────────────────────────── */
function HexGrid() {
  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.04,
        pointerEvents: 'none',
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hex-pattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
          <polygon
            points="30,2 56,16 56,36 30,50 4,36 4,16"
            fill="none"
            stroke="rgba(139,92,246,1)"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-pattern)" />
    </svg>
  )
}

/* ── Scan line effect ───────────────────────────────────────── */
function ScanLine() {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: '1px',
        background:
          'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.4) 20%, rgba(196,148,255,0.7) 50%, rgba(139,92,246,0.4) 80%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }}
      initial={{ top: '-2%', opacity: 0 }}
      animate={{ top: ['0%', '100%'], opacity: [0, 0.8, 0.8, 0] }}
      transition={{ duration: 5, repeat: Infinity, repeatDelay: 8, ease: 'linear' }}
    />
  )
}

/* ── Stat badge ─────────────────────────────────────────────── */
function StatBadge({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.15rem',
        padding: '0.75rem 1.5rem',
        background: 'rgba(139, 92, 246, 0.06)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        borderRadius: '2px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* corner accents */}
      {['tl', 'tr', 'bl', 'br'].map((pos) => (
        <span
          key={pos}
          style={{
            position: 'absolute',
            fontSize: 7,
            color: 'rgba(196,148,255,0.5)',
            ...(pos === 'tl' ? { top: 3, left: 4 } : {}),
            ...(pos === 'tr' ? { top: 3, right: 4 } : {}),
            ...(pos === 'bl' ? { bottom: 3, left: 4 } : {}),
            ...(pos === 'br' ? { bottom: 3, right: 4 } : {}),
          }}
        >
          ✦
        </span>
      ))}
      <span
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '1.4rem',
          fontWeight: 600,
          color: '#c084fc',
          lineHeight: 1,
          textShadow: '0 0 20px rgba(192,132,252,0.5)',
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(196, 148, 255, 0.6)',
        }}
      >
        {label}
      </span>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   HERO COMPONENT
══════════════════════════════════════════════════════════════ */
const Hero = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  /* stable particle data */
  const particles = useRef(
    Array.from({ length: 22 }, (_, i) => ({
      x: Math.random() * 95,
      y: Math.random() * 85,
      delay: i * 0.3,
      size: 8 + Math.floor(Math.random() * 6),
    }))
  )

  /* typed text effect */
  const taglines = ['digital alchemists.', 'code artisans.', 'dream builders.']
  const [tagIdx, setTagIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const target = taglines[tagIdx]
    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 65)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === target.length) {
      const t = setTimeout(() => setDeleting(true), 2200)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setTagIdx((i) => (i + 1) % taglines.length)
    }
  }, [displayed, deleting, tagIdx])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500;600&display=swap');

        .hero-section {
          font-family: 'Raleway', sans-serif;
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(
            160deg,
            #04020f 0%,
            #080616 25%,
            #0a0720 50%,
            #060514 75%,
            #030210 100%
          );
          padding: 7rem 2rem 5rem;
        }

        /* deep nebula layer */
        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 15% 40%, rgba(88, 28, 220, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 85% 30%, rgba(120, 40, 200, 0.08) 0%, transparent 55%),
            radial-gradient(ellipse 40% 35% at 50% 80%, rgba(60, 20, 140, 0.1) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        /* vignette */
        .hero-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(2, 1, 10, 0.5) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .hero-inner {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }

        /* ── Trust pill ── */
        .trust-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.4rem 1.2rem 0.4rem 0.5rem;
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.25);
          border-radius: 999px;
          position: relative;
          overflow: hidden;
        }

        .trust-pill::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(196,148,255,0.12), transparent);
          animation: trustShimmer 3s ease-in-out infinite;
        }

        @keyframes trustShimmer {
          0% { left: -60%; }
          100% { left: 160%; }
        }

        .trust-pill-text {
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(196, 148, 255, 0.8);
        }

        .trust-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #a855f7;
          box-shadow: 0 0 8px rgba(168, 85, 247, 0.8);
          animation: pulseDot 2s ease-in-out infinite;
        }

        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }

        /* ── Heading ── */
        .hero-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.4rem, 6vw, 5.5rem);
          font-weight: 600;
          line-height: 1.12;
          text-align: center;
          color: rgba(230, 210, 255, 0.92);
          letter-spacing: -0.01em;
          max-width: 900px;
          text-shadow: 0 0 60px rgba(139, 92, 246, 0.2);
        }

        .hero-title .word-dim { color: rgba(170, 140, 210, 0.55); }

        .hero-title .word-glow {
          background: linear-gradient(135deg, #c084fc 0%, #a855f7 40%, #e9d5ff 70%, #c084fc 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s linear infinite;
          filter: drop-shadow(0 0 12px rgba(192,132,252,0.4));
        }

        @keyframes gradientShift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* ── Typewriter ── */
        .typewriter-wrap {
          font-family: 'Cinzel', serif;
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          color: rgba(196, 148, 255, 0.7);
          letter-spacing: 0.06em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-height: 2.2rem;
        }

        .typewriter-prefix {
          color: rgba(139, 92, 246, 0.5);
          font-size: 0.8em;
        }

        .typewriter-text {
          color: #c084fc;
          text-shadow: 0 0 16px rgba(192,132,252,0.5);
        }

        .cursor-blink {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: #c084fc;
          margin-left: 2px;
          vertical-align: middle;
          box-shadow: 0 0 8px rgba(192,132,252,0.8);
          animation: cursorBlink 0.9s step-end infinite;
        }

        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* ── Subtext ── */
        .hero-sub {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(0.9rem, 1.8vw, 1.1rem);
          font-weight: 300;
          color: rgba(180, 155, 220, 0.55);
          text-align: center;
          max-width: 560px;
          line-height: 1.85;
          letter-spacing: 0.02em;
        }

        /* ── Divider rune ── */
        .rune-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(139, 92, 246, 0.35);
          font-size: 10px;
          letter-spacing: 0.3em;
          width: 100%;
          max-width: 480px;
        }
        .rune-divider::before, .rune-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent);
        }

        /* ── CTA Row ── */
        .cta-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-primary {
          font-family: 'Cinzel', serif;
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0a0420;
          text-decoration: none;
          padding: 0.75rem 2rem;
          background: linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #9333ea 100%);
          border: none;
          border-radius: 2px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(196,148,255,0.3);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.6), 0 0 0 1px rgba(196,148,255,0.5);
        }
        .btn-primary:hover::before { opacity: 1; }

        .btn-outline {
          font-family: 'Cinzel', serif;
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(196, 148, 255, 0.8);
          text-decoration: none;
          padding: 0.75rem 2rem;
          background: transparent;
          border: 1px solid rgba(139, 92, 246, 0.35);
          border-radius: 2px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-outline:hover {
          border-color: rgba(196, 148, 255, 0.6);
          color: #e9d5ff;
          background: rgba(139, 92, 246, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.2);
        }

        /* ── Stats row ── */
        .stats-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* ── Hero image frame ── */
        .hero-image-frame {
          position: relative;
          width: 100%;
          max-width: 960px;
          margin-top: 1rem;
        }

        .hero-image-frame::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.5) 0%,
            rgba(196, 148, 255, 0.1) 30%,
            transparent 50%,
            rgba(88, 28, 220, 0.1) 70%,
            rgba(139, 92, 246, 0.4) 100%
          );
          border-radius: 4px;
          pointer-events: none;
          z-index: 1;
        }

        /* corner rune decorations on image */
        .image-corner {
          position: absolute;
          width: 24px;
          height: 24px;
          z-index: 3;
          pointer-events: none;
        }
        .image-corner::before, .image-corner::after {
          content: '';
          position: absolute;
          background: rgba(196, 148, 255, 0.7);
        }
        .image-corner-tl { top: -1px; left: -1px; }
        .image-corner-tl::before { top: 0; left: 0; width: 18px; height: 1px; }
        .image-corner-tl::after  { top: 0; left: 0; width: 1px; height: 18px; }

        .image-corner-tr { top: -1px; right: -1px; }
        .image-corner-tr::before { top: 0; right: 0; width: 18px; height: 1px; }
        .image-corner-tr::after  { top: 0; right: 0; width: 1px; height: 18px; }

        .image-corner-bl { bottom: -1px; left: -1px; }
        .image-corner-bl::before { bottom: 0; left: 0; width: 18px; height: 1px; }
        .image-corner-bl::after  { bottom: 0; left: 0; width: 1px; height: 18px; }

        .image-corner-br { bottom: -1px; right: -1px; }
        .image-corner-br::before { bottom: 0; right: 0; width: 18px; height: 1px; }
        .image-corner-br::after  { bottom: 0; right: 0; width: 1px; height: 18px; }

        .hero-image-inner {
          width: 100%;
          display: block;
          border-radius: 3px;
          position: relative;
          z-index: 2;
          filter: brightness(0.9) saturate(0.9);
          transition: filter 0.4s ease;
        }

        .hero-image-inner:hover {
          filter: brightness(1) saturate(1);
        }

        /* image glow overlay */
        .hero-image-glow {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 70%;
          height: 60px;
          background: radial-gradient(ellipse, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
          filter: blur(20px);
          pointer-events: none;
          z-index: 0;
        }

        /* scroll hint */
        .scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          z-index: 10;
        }
        .scroll-hint-text {
          font-family: 'Cinzel', serif;
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(139, 92, 246, 0.45);
        }
        .scroll-hint-line {
          width: 1px;
          height: 32px;
          background: linear-gradient(180deg, rgba(139,92,246,0.5), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.5; }
          50% { transform: scaleY(0.6); opacity: 1; }
        }

        /* profile images row */
        .profile-row {
          display: flex;
        }
        .profile-img {
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 50%;
          border: 2px solid rgba(139, 92, 246, 0.5);
          margin-left: -0.6rem;
          filter: brightness(0.85) saturate(0.7);
          object-fit: cover;
        }
        .profile-img:first-child { margin-left: 0; }

        /* orbital container for image section */
        .orbital-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 960px;
        }

        @media (max-width: 640px) {
          .stats-row { gap: 0.6rem; }
          .cta-row { flex-direction: column; width: 100%; }
          .btn-primary, .btn-outline { width: 100%; justify-content: center; text-align: center; }
          .hero-image-frame { margin-top: 0.5rem; }
        }
      `}</style>

      <section id="hero" className="hero-section" ref={sectionRef}>
        {/* ── Background layers ── */}
        <HexGrid />
        <ScanLine />

        {/* ── Ambient rune particles ── */}
        {particles.current.map((p, i) => (
          <RuneParticle key={i} x={p.x} y={p.y} delay={p.delay} size={p.size} />
        ))}

        {/* ── Main content ── */}
        <motion.div className="hero-inner" style={{ opacity: fadeOut }}>

          {/* Trust pill */}
          <motion.div
            className="trust-pill"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {assets.group_profile && (
              <div className="profile-row">
                <img className="profile-img" src={assets.group_profile} alt="Trusted users" />
              </div>
            )}
            <div className="trust-dot" />
            <span className="trust-pill-text">Trusted by 10k+ spellbound clients</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Turning <span className="word-dim">imagination</span> into{' '}
            <span className="word-glow">digital</span>{' '}
            <span className="word-dim">impact.</span>
          </motion.h1>

          {/* Typewriter line */}
          <motion.div
            className="typewriter-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <span className="typewriter-prefix">⟡</span>
            <span>We are&nbsp;</span>
            <span className="typewriter-text">{displayed}</span>
            <span className="cursor-blink" />
          </motion.div>

          {/* Description */}
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease: 'easeOut' }}
          >
            Creating meaningful connections and turning big ideas into interactive
            digital experiences — forged at the intersection of craft and code.
          </motion.p>

          {/* Rune divider */}
          <motion.div
            className="rune-divider"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            ✦ ⟡ ✦
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="cta-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="#contact-us" className="btn-primary">
              ✦ Begin your quest
            </a>
            <a href="#our-work" className="btn-outline">
              <span>View our grimoire</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="stats-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
          >
            <StatBadge value="10k+" label="Clients served" delay={1.0} />
            <StatBadge value="300+" label="Spells cast" delay={1.1} />
            <StatBadge value="1.5yr"  label="In the craft"  delay={1.2} />
            <StatBadge value="99%"  label="Enchantment rate" delay={1.3} />
          </motion.div>

          {/* Hero image */}
          <motion.div
            className="orbital-container"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Orbital glyph rings behind image */}
            <GlyphRing radius={520} count={10} duration={40} reverse={false} />
            <GlyphRing radius={560} count={6}  duration={60} reverse={true}  />

            <motion.div
              className="hero-image-frame"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
              style={{ y: parallaxY }}
            >
              {/* Corner decorations */}
              <div className="image-corner image-corner-tl" />
              <div className="image-corner image-corner-tr" />
              <div className="image-corner image-corner-bl" />
              <div className="image-corner image-corner-br" />

              <img
                src={assets.hero_img}
                alt="Hero showcase"
                className="hero-image-inner"
              />

              {/* Glow bloom under image */}
              <div className="hero-image-glow" />
            </motion.div>
          </motion.div>

        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <span className="scroll-hint-text">Descend</span>
          <div className="scroll-hint-line" />
        </motion.div>
      </section>
    </>
  )
}

export default Hero