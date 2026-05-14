import React, { useRef } from 'react'
import assets from '../assets/assets'
import { motion, useInView } from 'motion/react'

/* ══════════════════════════════════════════════════════════════ */
const Footer = ({ theme }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#our-work' },
    { label: 'Contact Us', href: '#contact-us' },
  ]

  const socialLinks = [
    { icon: assets.facebook_icon, href: 'https://www.facebook.com/profile.php?id=100065510616728', label: 'Facebook' },
    { icon: assets.twitter_icon,  href: 'https://x.com/062_ds41166',                                label: 'Twitter'  },
    { icon: assets.instagram_icon,href: 'https://www.instagram.com/san_dh_ya_212/',                 label: 'Instagram'},
    { icon: assets.linkedin_icon, href: 'https://www.linkedin.com/in/ayush-verma-37ab48336/',       label: 'LinkedIn' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500&display=swap');

        .enchanted-footer {
          font-family: 'Raleway', sans-serif;
          position: relative;
          background: linear-gradient(180deg, #06041a 0%, #040211 60%, #020109 100%);
          overflow: hidden;
          padding: 0;
        }

        /* top glow border */
        .enchanted-footer::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.4) 25%, rgba(196,148,255,0.7) 50%, rgba(139,92,246,0.4) 75%, transparent 100%);
        }

        /* ambient nebula */
        .enchanted-footer::after {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 10% 100%, rgba(88,28,220,0.1) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 90% 20%, rgba(120,40,200,0.06) 0%, transparent 50%);
          pointer-events: none;
        }

        .footer-inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 2.5rem 0;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 3rem;
          padding-bottom: 3rem;
        }

        @media (max-width: 900px) { .footer-top { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .footer-top { grid-template-columns: 1fr; gap: 2rem; } }

        /* Logo column */
        .footer-logo-wrap {
          filter: drop-shadow(0 0 10px rgba(139,92,246,0.4));
          transition: filter 0.3s ease;
          display: inline-block;
          margin-bottom: 1.25rem;
        }
        .footer-logo-wrap:hover {
          filter: drop-shadow(0 0 18px rgba(196,148,255,0.6));
        }

        .footer-desc {
          font-size: 0.82rem;
          font-weight: 300;
          color: rgba(180,155,220,0.45);
          line-height: 1.9;
          max-width: 320px;
          margin-bottom: 1.5rem;
        }

        /* Nav links column */
        .footer-col-title {
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(196,148,255,0.6);
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .footer-col-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(139,92,246,0.25), transparent);
        }

        .footer-nav-link {
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(180,150,220,0.55);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 0;
          border-bottom: 1px solid rgba(139,92,246,0.07);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .footer-nav-link::before {
          content: '⟡';
          font-size: 8px;
          color: rgba(139,92,246,0.3);
          transition: color 0.3s ease;
        }
        .footer-nav-link:hover {
          color: rgba(220,190,255,0.85);
          padding-left: 0.35rem;
        }
        .footer-nav-link:hover::before { color: #c084fc; }

        /* Contact column */
        .contact-line {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.8rem;
          font-weight: 300;
          color: rgba(180,155,220,0.5);
          line-height: 1.7;
          margin-bottom: 0.6rem;
        }
        .contact-line-label {
          font-family: 'Cinzel', serif;
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(139,92,246,0.5);
          min-width: 48px;
          padding-top: 2px;
        }

        /* Social icons */
        .social-row {
          display: flex;
          gap: 0.6rem;
          margin-top: 1.25rem;
        }

        .social-btn {
          width: 34px; height: 34px;
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 2px;
          background: rgba(139,92,246,0.05);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .social-btn:hover {
          border-color: rgba(196,148,255,0.5);
          background: rgba(139,92,246,0.15);
          box-shadow: 0 0 14px rgba(139,92,246,0.25);
          transform: translateY(-2px);
        }
        .social-btn img {
          width: 15px;
          filter: brightness(0) invert(1) opacity(0.5);
          transition: filter 0.3s ease;
        }
        .social-btn:hover img {
          filter: brightness(0) invert(0.7) sepia(1) hue-rotate(230deg) saturate(3) brightness(1.3) opacity(0.9);
        }

        /* Divider */
        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.2) 30%, rgba(139,92,246,0.2) 70%, transparent);
          margin: 0 2.5rem;
          position: relative;
          z-index: 2;
        }

        /* Bottom bar */
        .footer-bottom {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem 2.5rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .footer-copy {
          font-family: 'Raleway', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          color: rgba(139,92,246,0.35);
          letter-spacing: 0.05em;
        }

        .footer-bottom-runes {
          font-size: 9px;
          color: rgba(139,92,246,0.3);
          letter-spacing: 0.25em;
          font-family: sans-serif;
        }
      `}</style>

      <footer className="enchanted-footer" ref={ref}>
        {/* hex grid */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.025, pointerEvents: 'none', zIndex: 0 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ft-hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 56,16 56,36 30,50 4,36 4,16" fill="none" stroke="rgba(139,92,246,1)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ft-hex)" />
        </svg>

        <div className="footer-inner">
          <div className="footer-top">

            {/* ── Column 1: Brand ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#hero" className="footer-logo-wrap">
                <img
                  src={assets.codehub4}
                  alt="Company Logo"
                  style={{ height: '3rem', width: 'auto' }}
                />
              </a>
              <p className="footer-desc">
                From strategy to execution, we craft digital solutions that move your business forward — forged with code and conjured with care.
              </p>

              {/* Social */}
              <div>
                <div className="footer-col-title">✦ Follow the signal</div>
                <div className="social-row">
                  {socialLinks.map((s, i) => (
                    <motion.a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="social-btn"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                      whileHover={{ scale: 1.08 }}
                    >
                      <img src={s.icon} alt={s.label} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Column 2: Nav ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="footer-col-title">✦ Navigate</div>
              <nav style={{ display: 'flex', flexDirection: 'column' }}>
                {navLinks.map((link, i) => (
                  <a key={i} href={link.href} className="footer-nav-link">
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* ── Column 3: Contact ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="footer-col-title">✦ Summon us</div>

              <div className="contact-line">
                <span className="contact-line-label">Email</span>
                <a href="mailto:ayushacess2@gmail.com" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color = 'rgba(196,148,255,0.8)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(180,155,220,0.5)'}>
                  ayushacess2@gmail.com
                </a>
              </div>

              <div className="contact-line">
                <span className="contact-line-label">Phone</span>
                <span>033-956-8754</span>
              </div>

              {/* CTA */}
              <motion.a
                href="#contact-us"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  marginTop: '1.5rem',
                  fontFamily: "'Cinzel', serif", fontSize: '0.65rem',
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: '#c084fc', textDecoration: 'none',
                  padding: '0.6rem 1.25rem',
                  border: '1px solid rgba(139,92,246,0.35)',
                  borderRadius: 2,
                  background: 'rgba(139,92,246,0.06)',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{
                  borderColor: 'rgba(196,148,255,0.6)',
                  color: '#e9d5ff',
                  boxShadow: '0 0 20px rgba(139,92,246,0.25)',
                  y: -2,
                }}
              >
                <span>✦ Begin your quest</span>
                <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </motion.a>
            </motion.div>

          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span className="footer-copy">
            © {new Date().getFullYear()} VGI (IT_Services). All rights reserved.
          </span>
          <span className="footer-bottom-runes">✦ ⟡ ◈ ⟡ ✦</span>
        </div>
      </footer>
    </>
  )
}

export default Footer