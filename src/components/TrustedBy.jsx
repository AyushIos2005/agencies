import React, { useRef } from 'react'
import { company_logos } from '../assets/assets'
import { motion, useInView } from 'motion/react'

/* ══════════════════════════════════════════════════════════════ */
const TrustedBy = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500&display=swap');

        .trusted-section {
          position: relative;
          padding: 4rem 2.5rem;
          background: linear-gradient(180deg, #0a0720 0%, #08051e 100%);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
        }

        /* top & bottom separator lines */
        .trusted-section::before,
        .trusted-section::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.25) 30%, rgba(196,148,255,0.5) 50%, rgba(139,92,246,0.25) 70%, transparent 100%);
        }
        .trusted-section::before { top: 0; }
        .trusted-section::after  { bottom: 0; }

        .trusted-label {
          font-family: 'Cinzel', serif;
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(139,92,246,0.5);
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .trusted-label::before,
        .trusted-label::after {
          content: '';
          height: 1px;
          width: 32px;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.4));
        }
        .trusted-label::after {
          background: linear-gradient(90deg, rgba(139,92,246,0.4), transparent);
        }

        /* marquee track */
        .marquee-outer {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%);
        }

        .marquee-track {
          display: flex;
          gap: 3.5rem;
          width: max-content;
          animation: marqueeScroll 22s linear infinite;
        }

        .marquee-track:hover { animation-play-state: paused; }

        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.6rem 1.2rem;
          border: 1px solid rgba(139,92,246,0.1);
          border-radius: 2px;
          background: rgba(139,92,246,0.04);
          transition: all 0.35s ease;
          cursor: default;
          flex-shrink: 0;
        }

        .logo-item:hover {
          border-color: rgba(139,92,246,0.35);
          background: rgba(139,92,246,0.1);
          box-shadow: 0 0 16px rgba(139,92,246,0.15);
        }

        .logo-item img {
          max-height: 22px;
          max-width: 100px;
          filter: brightness(0) invert(1) opacity(0.35);
          transition: filter 0.35s ease, transform 0.3s ease;
          object-fit: contain;
          display: block;
        }

        .logo-item:hover img {
          filter: brightness(0) invert(0.7) sepia(1) hue-rotate(230deg) saturate(3) brightness(1.3) opacity(0.85);
          transform: scale(1.05);
        }
      `}</style>

      <div className="trusted-section" ref={ref}>
        {/* Label */}
        <motion.div
          className="trusted-label"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          ✦ Trusted by leading companies ✦
        </motion.div>

        {/* Marquee */}
        <motion.div
          className="marquee-outer"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          <div className="marquee-track">
            {/* duplicate for seamless loop */}
            {[...company_logos, ...company_logos].map((logo, index) => (
              <div key={index} className="logo-item">
                <img src={logo} alt={`Partner ${(index % company_logos.length) + 1}`} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default TrustedBy