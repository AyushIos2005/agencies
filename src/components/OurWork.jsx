import React, { useRef } from 'react'
import assets from '../assets/assets'
import { motion, useInView } from 'motion/react'

const EnchantedTitle = ({ title, desc }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(139,92,246,0.6)' }}>
      <span style={{ height: '1px', width: 40, background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.4))' }} />
      ✦ Portfolio ✦
      <span style={{ height: '1px', width: 40, background: 'linear-gradient(90deg,rgba(139,92,246,0.4),transparent)' }} />
    </div>
    <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 600, color: 'rgba(230,210,255,0.92)', letterSpacing: '-0.01em', margin: 0, textShadow: '0 0 40px rgba(139,92,246,0.25)' }}>
      {title}
    </h2>
    <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', fontWeight: 300, color: 'rgba(180,155,220,0.55)', maxWidth: 560, lineHeight: 1.8, margin: 0 }}>
      {desc}
    </p>
  </div>
)

const WorkCard = ({ item, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <style>{`
        .work-card-${index} {
          position: relative;
          background: rgba(10,6,22,0.75);
          border: 1px solid rgba(139,92,246,0.15);
          border-radius: 3px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.45s ease;
          display: flex;
          flex-direction: column;
        }
        .work-card-${index}:hover {
          border-color: rgba(139,92,246,0.45);
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(139,92,246,0.25), 0 0 0 1px rgba(196,148,255,0.1);
        }
        .work-card-${index}:hover .work-img-${index} {
          transform: scale(1.06);
          filter: brightness(0.75) saturate(0.7);
        }
        .work-card-${index}:hover .work-overlay-${index} {
          opacity: 1;
        }
        .work-card-${index}:hover .work-title-${index} {
          color: #c084fc;
        }
        .work-card-${index}:hover .work-corner { opacity: 1; }
        .work-card-${index}:hover .work-view-btn { opacity: 1; transform: translateY(0); }

        .work-img-wrap-${index} {
          overflow: hidden;
          height: 220px;
          position: relative;
        }
        .work-img-${index} {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease, filter 0.5s ease;
          filter: brightness(0.8) saturate(0.65);
        }
        .work-overlay-${index} {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(88,28,220,0.35) 0%, rgba(139,92,246,0.15) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex; align-items: center; justify-content: center;
        }
        .work-view-btn {
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #e9d5ff;
          padding: 0.5rem 1.25rem;
          border: 1px solid rgba(196,148,255,0.5);
          border-radius: 2px;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          opacity: 0;
          transform: translateY(8px);
          transition: all 0.35s ease;
        }
        .work-body-${index} {
          padding: 1.5rem;
          position: relative;
          flex: 1;
        }
        .work-body-${index}::before {
          content: '';
          position: absolute;
          top: 0; left: 1.5rem; right: 1.5rem;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent);
        }
        .work-title-${index} {
          font-family: 'Cinzel', serif;
          font-size: 0.9rem; font-weight: 600;
          letter-spacing: 0.05em;
          color: rgba(220,200,255,0.88);
          margin: 0 0 0.6rem;
          transition: color 0.3s ease;
        }
        .work-corner {
          position: absolute; font-size: 7px;
          color: rgba(196,148,255,0.5);
          opacity: 0; transition: opacity 0.3s ease;
        }
      `}</style>

      <div className={`work-card-${index}`}>
        {/* Corner runes */}
        {['tl','tr','bl','br'].map(pos => (
          <span key={pos} className="work-corner" style={{
            ...(pos==='tl'?{top:5,left:6}:pos==='tr'?{top:5,right:6}:pos==='bl'?{bottom:5,left:6}:{bottom:5,right:6})
          }}>✦</span>
        ))}

        {/* Image */}
        <div className={`work-img-wrap-${index}`}>
          <img src={item.image} alt={item.title} className={`work-img-${index}`} />
          <div className={`work-overlay-${index}`}>
            <button className="work-view-btn">✦ View project</button>
          </div>
        </div>

        {/* Body */}
        <div className={`work-body-${index}`}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.52rem', letterSpacing: '0.22em', color: 'rgba(139,92,246,0.45)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            {String(index + 1).padStart(2, '0')} ⟡ Project
          </div>
          <h3 className={`work-title-${index}`}>{item.title}</h3>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.8rem', fontWeight: 300, color: 'rgba(180,155,220,0.5)', lineHeight: 1.8, margin: 0 }}>
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════ */
const OurWork = () => {
  const workData = [
    { title: 'Mobile app marketing', description: 'We turn bold ideas into powerful digital solutions that connect and engage.', image: assets.work_mobile_app },
    { title: 'Dashboard management', description: 'We help you execute your plan and deliver measurable results.', image: assets.work_dashboard_management },
    { title: 'Fitness app promotion', description: 'We create marketing strategies that drive growth and retention.', image: assets.work_fitness_app },
  ]

  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500&display=swap');
        .ourwork-section {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4rem;
          padding: 7rem 2.5rem;
          background: linear-gradient(180deg, #080520 0%, #0a0720 50%, #06051a 100%);
          overflow: hidden;
        }
        .ourwork-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 55% 40% at 80% 60%, rgba(88,28,220,0.09) 0%, transparent 60%),
            radial-gradient(ellipse 45% 35% at 15% 40%, rgba(120,40,200,0.06) 0%, transparent 55%);
          pointer-events: none;
        }
        .work-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          width: 100%;
          max-width: 1200px;
        }
        @media (max-width: 900px) { .work-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .work-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section id="our-work" className="ourwork-section">
        {/* Hex grid bg */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wk-hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 56,16 56,36 30,50 4,36 4,16" fill="none" stroke="rgba(139,92,246,1)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wk-hex)" />
        </svg>

        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <EnchantedTitle
            title="Our latest work"
            desc="From strategy to execution, we craft digital solutions that move your business forward."
          />
        </motion.div>

        <div className="work-grid">
          {workData.map((item, index) => (
            <WorkCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#contact-us"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontFamily: "'Cinzel', serif", fontSize: '0.68rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(196,148,255,0.7)',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.65rem 1.75rem',
            border: '1px solid rgba(139,92,246,0.3)', borderRadius: 2,
            background: 'rgba(139,92,246,0.05)',
            transition: 'all 0.3s ease',
          }}
          whileHover={{ borderColor: 'rgba(196,148,255,0.6)', color: '#e9d5ff', y: -2 }}
        >
          <span>View full grimoire</span>
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
        </motion.a>
      </section>
    </>
  )
}

export default OurWork