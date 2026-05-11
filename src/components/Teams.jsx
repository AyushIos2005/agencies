import React, { useRef } from 'react'
import { teamData } from '../assets/assets'
import { motion, useInView } from 'motion/react'

const EnchantedTitle = ({ title, desc }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(139,92,246,0.6)' }}>
      <span style={{ height: '1px', width: 40, background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.4))' }} />
      ✦ The Coven ✦
      <span style={{ height: '1px', width: 40, background: 'linear-gradient(90deg,rgba(139,92,246,0.4),transparent)' }} />
    </div>
    <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 600, color: 'rgba(230,210,255,0.92)', letterSpacing: '-0.01em', margin: 0, textShadow: '0 0 40px rgba(139,92,246,0.25)' }}>
      {title}
    </h2>
    <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', fontWeight: 300, color: 'rgba(180,155,220,0.55)', maxWidth: 500, lineHeight: 1.8, margin: 0 }}>
      {desc}
    </p>
  </div>
)

const TeamCard = ({ member, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <style>{`
        .team-card-${index} {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.1rem;
          padding: 2rem 1.25rem 1.75rem;
          background: rgba(10,6,22,0.7);
          border: 1px solid rgba(139,92,246,0.14);
          border-radius: 3px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s ease;
          text-align: center;
        }
        .team-card-${index}::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196,148,255,0.4), transparent);
          transform: scaleX(0);
          transition: transform 0.5s ease;
        }
        .team-card-${index}:hover {
          border-color: rgba(139,92,246,0.4);
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(139,92,246,0.2), 0 0 0 1px rgba(196,148,255,0.08);
          background: rgba(14,8,28,0.85);
        }
        .team-card-${index}:hover::before { transform: scaleX(1); }
        .team-card-${index}:hover .team-avatar-ring-${index} {
          border-color: rgba(196,148,255,0.6);
          box-shadow: 0 0 24px rgba(139,92,246,0.4), 0 0 0 4px rgba(139,92,246,0.08);
        }
        .team-card-${index}:hover .team-glow-${index} { opacity: 1; }
        .team-card-${index}:hover .team-corner { opacity: 1; }
        .team-card-${index}:hover .team-rune-${index} { opacity: 0.5; }
        .team-card-${index}:hover .team-name-${index} { color: #c084fc; }

        .team-avatar-ring-${index} {
          width: 96px; height: 96px;
          border-radius: 50%;
          border: 1px solid rgba(139,92,246,0.3);
          padding: 3px;
          position: relative;
          transition: all 0.4s ease;
          background: rgba(139,92,246,0.05);
        }
        .team-avatar-ring-${index} img {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          filter: brightness(0.85) saturate(0.7);
          transition: filter 0.4s ease;
          display: block;
        }
        .team-card-${index}:hover .team-avatar-ring-${index} img {
          filter: brightness(0.95) saturate(0.85);
        }
        .team-glow-${index} {
          position: absolute;
          bottom: -8px; left: 50%;
          transform: translateX(-50%);
          width: 60px; height: 16px;
          background: radial-gradient(ellipse, rgba(139,92,246,0.5) 0%, transparent 70%);
          filter: blur(6px);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .team-rune-${index} {
          position: absolute; top: 8px;
          font-size: 7px; letter-spacing: 0.2em;
          color: rgba(139,92,246,0.35);
          opacity: 0; transition: opacity 0.3s ease;
          font-family: sans-serif;
        }
        .team-name-${index} {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem; font-weight: 600;
          letter-spacing: 0.06em;
          color: rgba(220,200,255,0.88);
          margin: 0; transition: color 0.3s ease;
        }
        .team-corner {
          position: absolute; font-size: 7px;
          color: rgba(196,148,255,0.45);
          opacity: 0; transition: opacity 0.3s ease;
        }
      `}</style>

      <div className={`team-card-${index}`}>
        {/* Corner runes */}
        {['tl','tr','bl','br'].map(pos => (
          <span key={pos} className="team-corner" style={{
            ...(pos==='tl'?{top:5,left:6}:pos==='tr'?{top:5,right:6}:pos==='bl'?{bottom:5,left:6}:{bottom:5,right:6})
          }}>✦</span>
        ))}

        {/* Avatar */}
        <div style={{ position: 'relative' }}>
          <div className={`team-avatar-ring-${index}`}>
            <img src={member.image} alt={member.name} />
          </div>
          <span className={`team-rune-${index}`} style={{ left: '50%', transform: 'translateX(-50%)' }}>⟡ ✦ ⟡</span>
          <div className={`team-glow-${index}`} />
        </div>

        {/* Name */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
          <h3 className={`team-name-${index}`}>{member.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: 16, height: '1px', background: 'rgba(139,92,246,0.4)' }} />
            <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139,92,246,0.55)', margin: 0 }}>
              {member.role}
            </p>
            <span style={{ width: 16, height: '1px', background: 'rgba(139,92,246,0.4)' }} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════ */
const Teams = () => {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500&display=swap');
        .teams-section {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4rem;
          padding: 7rem 2.5rem;
          background: linear-gradient(180deg, #06041a 0%, #080620 50%, #060418 100%);
          overflow: hidden;
        }
        .teams-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 50% 40% at 50% 80%, rgba(88,28,220,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 20% 20%, rgba(120,40,200,0.06) 0%, transparent 55%);
          pointer-events: none;
        }
        .teams-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          width: 100%;
          max-width: 1100px;
        }
        @media (max-width: 900px) { .teams-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 500px) { .teams-grid { grid-template-columns: repeat(2,1fr); gap: 0.85rem; } }
      `}</style>

      <section id="team" className="teams-section">
        {/* hex grid */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tm-hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 56,16 56,36 30,50 4,36 4,16" fill="none" stroke="rgba(139,92,246,1)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tm-hex)" />
        </svg>

        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <EnchantedTitle
            title="Meet the team"
            desc="A passionate coven of digital experts dedicated to your brand's ascension."
          />
        </motion.div>

        <div className="teams-grid">
          {teamData.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Teams