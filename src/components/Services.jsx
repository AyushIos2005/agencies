import React, { useRef } from 'react'
import assets from '../assets/assets'
import { motion, useInView } from 'motion/react'

/* ── Shared enchanted section title ─────────────────────────── */
const EnchantedTitle = ({ title, desc }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(139,92,246,0.6)' }}>
      <span style={{ flex: 1, height: '1px', width: 40, background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.4))' }} />
      ✦ Our Craft ✦
      <span style={{ flex: 1, height: '1px', width: 40, background: 'linear-gradient(90deg,rgba(139,92,246,0.4),transparent)' }} />
    </div>
    <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 600, color: 'rgba(230,210,255,0.92)', letterSpacing: '-0.01em', margin: 0, textShadow: '0 0 40px rgba(139,92,246,0.25)' }}>
      {title}
    </h2>
    <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', fontWeight: 300, color: 'rgba(180,155,220,0.55)', maxWidth: 500, lineHeight: 1.8, margin: 0 }}>
      {desc}
    </p>
  </div>
)

/* ── Service card ────────────────────────────────────────────── */
const ServiceCard = ({ service, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative' }}
    >
      <style>{`
        .service-card-${index} {
          position: relative;
          padding: 2rem 1.75rem;
          background: rgba(10,6,22,0.7);
          border: 1px solid rgba(139,92,246,0.15);
          border-radius: 3px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s ease;
          height: 100%;
        }
        .service-card-${index}::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(139,92,246,0.07) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .service-card-${index}::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196,148,255,0.5), transparent);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .service-card-${index}:hover {
          border-color: rgba(139,92,246,0.4);
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(139,92,246,0.2), 0 0 0 1px rgba(196,148,255,0.1);
          background: rgba(15,8,30,0.85);
        }
        .service-card-${index}:hover::before { opacity: 1; }
        .service-card-${index}:hover::after { transform: scaleX(1); }
        .service-card-${index}:hover .svc-icon-wrap { border-color: rgba(196,148,255,0.5); box-shadow: 0 0 20px rgba(139,92,246,0.3); }
        .service-card-${index}:hover .svc-icon-wrap::after { opacity: 1; transform: scale(1.4); }
        .service-card-${index}:hover .svc-corner { opacity: 1; }
        .service-card-${index}:hover .svc-arrow { opacity: 1; transform: translateX(4px); }
      `}</style>

      <div className={`service-card-${index}`}>
        {/* Corner runes */}
        {['tl','tr','bl','br'].map(pos => (
          <span key={pos} className="svc-corner" style={{
            position: 'absolute', fontSize: 7, color: 'rgba(196,148,255,0.5)',
            opacity: 0, transition: 'opacity 0.3s ease',
            ...(pos==='tl'?{top:5,left:6}:pos==='tr'?{top:5,right:6}:pos==='bl'?{bottom:5,left:6}:{bottom:5,right:6})
          }}>✦</span>
        ))}

        {/* Icon */}
        <div className="svc-icon-wrap" style={{
          width: 52, height: 52, borderRadius: 3,
          border: '1px solid rgba(139,92,246,0.25)',
          background: 'rgba(139,92,246,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1.25rem', position: 'relative', overflow: 'hidden',
          transition: 'all 0.3s ease',
        }}>
          <span style={{
            position: 'absolute', inset: 0, borderRadius: 3,
            background: 'radial-gradient(circle, rgba(196,148,255,0.15) 0%, transparent 70%)',
            opacity: 0, transform: 'scale(0.8)',
            transition: 'all 0.4s ease',
          }} className="svc-icon-wrap::after" />
          <img src={service.icon} alt="" style={{ width: 26, filter: 'brightness(0) invert(1) sepia(1) hue-rotate(230deg) saturate(2) brightness(1.5)', position: 'relative', zIndex: 1 }} />
        </div>

        {/* Number tag */}
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: '0.55rem', letterSpacing: '0.2em',
          color: 'rgba(139,92,246,0.4)', marginBottom: '0.5rem',
          textTransform: 'uppercase',
        }}>
          {String(index + 1).padStart(2, '0')} ⟡
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Cinzel', serif", fontSize: '0.95rem', fontWeight: 600,
          letterSpacing: '0.06em', color: 'rgba(220,200,255,0.88)',
          marginBottom: '0.75rem', margin: '0 0 0.75rem',
        }}>
          {service.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: "'Raleway', sans-serif", fontSize: '0.82rem', fontWeight: 300,
          color: 'rgba(180,155,220,0.5)', lineHeight: 1.8, margin: '0 0 1.25rem',
        }}>
          {service.description}
        </p>

        {/* Arrow */}
        <div className="svc-arrow" style={{
          fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.12em',
          color: 'rgba(196,148,255,0.6)', opacity: 0, transition: 'all 0.3s ease',
          display: 'flex', alignItems: 'center', gap: '0.35rem',
        }}>
          <span>Learn more</span>
          <span>→</span>
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════ */
const Services = () => {
  const servicesData = [
    { title: 'Advertising', description: 'We turn bold ideas into powerful digital solutions that connect and engage.', icon: assets.ads_icon },
    { title: 'Content Marketing', description: 'We help you execute your plan and deliver measurable results.', icon: assets.marketing_icon },
    { title: 'Content Writing', description: 'We help you create a marketing strategy that drives results.', icon: assets.content_icon },
    { title: 'Social Media', description: 'We help you build a strong social media presence and engage your audience.', icon: assets.social_icon },
  ]

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500&display=swap');
        .services-section {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4rem;
          padding: 7rem 2.5rem;
          background: linear-gradient(180deg, #06041a 0%, #080520 50%, #060418 100%);
          overflow: hidden;
        }
        .services-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 20% 50%, rgba(88,28,220,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 80% 30%, rgba(120,40,200,0.07) 0%, transparent 55%);
          pointer-events: none;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          width: 100%;
          max-width: 1200px;
        }
        @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px)  { .services-grid { grid-template-columns: 1fr; } }

        .services-section .hex-bg {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.03;
        }
      `}</style>

      <section id="services" className="services-section">
        {/* hex grid */}
        <svg className="hex-bg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="svc-hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 56,16 56,36 30,50 4,36 4,16" fill="none" stroke="rgba(139,92,246,1)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#svc-hex)" />
        </svg>

        {/* Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <EnchantedTitle title="How can we help?" desc="Our services are designed to grow your brand and amplify your digital presence." />
        </motion.div>

        {/* Grid */}
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* bottom rune divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(139,92,246,0.3)', fontSize: 10, letterSpacing: '0.3em', width: '100%', maxWidth: 400 }}
        >
          <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.25))' }} />
          ✦ ⟡ ✦
          <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,rgba(139,92,246,0.25),transparent)' }} />
        </motion.div>
      </section>
    </>
  )
}

export default Services