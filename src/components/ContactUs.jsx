import React, { useState, useRef } from 'react'
import assets from '../assets/assets'
import { motion, useInView, AnimatePresence } from 'motion/react'

/* ══════════════════════════════════════════════════════════════ */
const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState('')

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setResult('sending')
    setLoading(true)

    const data = new FormData()
    data.append('access_key', import.meta.env.VITE_ACCESS_KEY)
    data.append('name', formData.name)
    data.append('email', formData.email)
    data.append('message', formData.message)
    data.append('replyto', formData.email)
    data.append('subject', 'New Contact Form Message')

    try {
      const response = await fetch(import.meta.env.VITE_API_WEB, {
        method: 'POST',
        body: data,
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      const json = await response.json()
      if (json.success) {
        setResult('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setResult('error')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setResult('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500;600&display=swap');

        .contact-section {
          font-family: 'Raleway', sans-serif;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4rem;
          padding: 7rem 2.5rem;
          background: linear-gradient(180deg, #0a0720 0%, #06051a 50%, #080620 100%);
          overflow: hidden;
        }

        .contact-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 55% 45% at 20% 60%, rgba(88,28,220,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 45% 40% at 80% 30%, rgba(120,40,200,0.07) 0%, transparent 55%);
          pointer-events: none;
        }

        /* ── Title ── */
        .contact-title-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(139,92,246,0.6);
        }
        .contact-title-line {
          height: 1px; width: 40px;
        }
        .contact-title-line-l { background: linear-gradient(90deg,transparent,rgba(139,92,246,0.4)); }
        .contact-title-line-r { background: linear-gradient(90deg,rgba(139,92,246,0.4),transparent); }

        .contact-title-h2 {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.8rem,4vw,3rem);
          font-weight: 600;
          color: rgba(230,210,255,0.92);
          letter-spacing: -0.01em;
          margin: 0;
          text-shadow: 0 0 40px rgba(139,92,246,0.25);
          text-align: center;
        }

        .contact-title-desc {
          font-size: 1rem;
          font-weight: 300;
          color: rgba(180,155,220,0.55);
          max-width: 500px;
          line-height: 1.8;
          margin: 0;
          text-align: center;
        }

        /* ── Form card ── */
        .contact-card {
          position: relative;
          width: 100%;
          max-width: 680px;
          background: rgba(10,6,22,0.75);
          border: 1px solid rgba(139,92,246,0.18);
          border-radius: 3px;
          padding: 3rem 2.5rem;
          overflow: hidden;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196,148,255,0.5), transparent);
        }

        /* scan shimmer */
        .contact-card::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.04), transparent);
          animation: contactShimmer 7s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes contactShimmer {
          0% { left: -60%; }
          100% { left: 160%; }
        }

        /* corner decorations */
        .card-corner {
          position: absolute;
          width: 20px; height: 20px;
          pointer-events: none;
        }
        .card-corner::before, .card-corner::after {
          content: ''; position: absolute;
          background: rgba(196,148,255,0.5);
        }
        .card-corner-tl { top: -1px; left: -1px; }
        .card-corner-tl::before { top:0;left:0;width:16px;height:1px; }
        .card-corner-tl::after  { top:0;left:0;width:1px;height:16px; }
        .card-corner-tr { top: -1px; right: -1px; }
        .card-corner-tr::before { top:0;right:0;width:16px;height:1px; }
        .card-corner-tr::after  { top:0;right:0;width:1px;height:16px; }
        .card-corner-bl { bottom: -1px; left: -1px; }
        .card-corner-bl::before { bottom:0;left:0;width:16px;height:1px; }
        .card-corner-bl::after  { bottom:0;left:0;width:1px;height:16px; }
        .card-corner-br { bottom: -1px; right: -1px; }
        .card-corner-br::before { bottom:0;right:0;width:16px;height:1px; }
        .card-corner-br::after  { bottom:0;right:0;width:1px;height:16px; }

        /* ── Form grid ── */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 560px) {
          .form-grid { grid-template-columns: 1fr; }
          .contact-card { padding: 2rem 1.5rem; }
        }

        .form-full { grid-column: 1 / -1; }

        /* ── Field ── */
        .field-label {
          font-family: 'Cinzel', serif;
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(139,92,246,0.55);
          margin-bottom: 0.55rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .field-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0 0.9rem;
          background: rgba(139,92,246,0.04);
          border: 1px solid rgba(139,92,246,0.18);
          border-radius: 2px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .field-wrap.focused {
          border-color: rgba(196,148,255,0.55);
          background: rgba(139,92,246,0.08);
          box-shadow: 0 0 0 3px rgba(139,92,246,0.07), 0 0 20px rgba(139,92,246,0.12);
        }
        .field-wrap:hover:not(.focused) {
          border-color: rgba(139,92,246,0.35);
        }

        /* bottom glow line on focus */
        .field-wrap::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196,148,255,0.7), transparent);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .field-wrap.focused::after { transform: scaleX(1); }

        .field-icon {
          width: 16px; height: 16px;
          filter: brightness(0) invert(0.5) sepia(1) hue-rotate(230deg) saturate(3) brightness(1.2);
          opacity: 0.5;
          flex-shrink: 0;
          transition: opacity 0.3s ease;
        }
        .field-wrap.focused .field-icon { opacity: 0.9; }

        .field-input {
          width: 100%;
          padding: 0.85rem 0;
          font-family: 'Raleway', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: rgba(220,200,255,0.85);
          background: transparent;
          border: none;
          outline: none;
        }
        .field-input::placeholder {
          color: rgba(139,92,246,0.3);
          font-weight: 300;
        }

        .field-textarea {
          width: 100%;
          padding: 0.85rem 0;
          font-family: 'Raleway', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: rgba(220,200,255,0.85);
          background: transparent;
          border: none;
          outline: none;
          resize: vertical;
          min-height: 130px;
        }
        .field-textarea::placeholder {
          color: rgba(139,92,246,0.3);
          font-weight: 300;
        }

        .textarea-wrap {
          align-items: flex-start;
          padding-top: 0.85rem;
          padding-bottom: 0.85rem;
        }
        .textarea-wrap .field-icon { margin-top: 2px; }

        /* ── Submit button ── */
        .submit-btn {
          font-family: 'Cinzel', serif;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0a0420;
          padding: 0.85rem 2.5rem;
          background: linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #9333ea 100%);
          border: none;
          border-radius: 2px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.35s ease;
          box-shadow: 0 4px 24px rgba(139,92,246,0.4), 0 0 0 1px rgba(196,148,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          width: 100%;
        }
        .submit-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 36px rgba(139,92,246,0.55), 0 0 0 1px rgba(196,148,255,0.5);
        }
        .submit-btn:hover:not(:disabled)::before { opacity: 1; }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: linear-gradient(135deg, #7c5cbf 0%, #6b46c1 100%);
        }

        /* ── Result toast ── */
        .result-box {
          border-radius: 2px;
          padding: 0.9rem 1.25rem;
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .result-success {
          background: rgba(88,200,120,0.08);
          border: 1px solid rgba(88,200,120,0.3);
          color: rgba(140,240,160,0.85);
        }
        .result-error {
          background: rgba(220,60,60,0.08);
          border: 1px solid rgba(220,60,60,0.25);
          color: rgba(255,140,140,0.85);
        }
        .result-sending {
          background: rgba(139,92,246,0.08);
          border: 1px solid rgba(139,92,246,0.25);
          color: rgba(196,148,255,0.85);
        }

        /* loading spinner */
        .rune-spinner {
          display: inline-block;
          animation: spinRune 1.2s linear infinite;
        }
        @keyframes spinRune {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      <section id="contact-us" className="contact-section">
        {/* hex bg */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ct-hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 56,16 56,36 30,50 4,36 4,16" fill="none" stroke="rgba(139,92,246,1)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ct-hex)" />
        </svg>

        {/* Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
        >
          <div className="contact-title-eyebrow">
            <span className="contact-title-line contact-title-line-l" />
            ✦ Summon Us ✦
            <span className="contact-title-line contact-title-line-r" />
          </div>
          <h2 className="contact-title-h2">Reach out to us</h2>
          <p className="contact-title-desc">
            From strategy to execution, we craft digital solutions that move your business forward.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="contact-card"
        >
          {/* Corner decorations */}
          <div className="card-corner card-corner-tl" />
          <div className="card-corner card-corner-tr" />
          <div className="card-corner card-corner-bl" />
          <div className="card-corner card-corner-br" />

          <form onSubmit={onSubmit} style={{ position: 'relative', zIndex: 1 }}>
            <div className="form-grid">

              {/* Name */}
              <div>
                <div className="field-label">⟡ Your name</div>
                <div className={`field-wrap ${focused === 'name' ? 'focused' : ''}`}>
                  <img src={assets.person_icon} alt="" className="field-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name..."
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    className="field-input"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="field-label">⟡ Email address</div>
                <div className={`field-wrap ${focused === 'email' ? 'focused' : ''}`}>
                  <img src={assets.email_icon} alt="" className="field-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. wizard@realm.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    className="field-input"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="form-full">
                <div className="field-label">⟡ Your message</div>
                <div className={`field-wrap textarea-wrap ${focused === 'message' ? 'focused' : ''}`}>
                  <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <textarea
                    name="message"
                    placeholder="Describe your vision, project, or quest..."
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    className="field-textarea"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="form-full">
                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? (
                    <>
                      <span className="rune-spinner">⟡</span>
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>✦ Send message</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                      >→</motion.span>
                    </>
                  )}
                </button>
              </div>

              {/* Result */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    className="form-full"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={`result-box ${
                      result === 'success' ? 'result-success'
                      : result === 'sending' ? 'result-sending'
                      : 'result-error'
                    }`}>
                      <span>
                        {result === 'success' ? '✦' : result === 'sending' ? '⟡' : '◈'}
                      </span>
                      <span>
                        {result === 'success'
                          ? 'Your message has been sent — we will be in touch shortly.'
                          : result === 'sending'
                          ? 'Transmitting your message through the aether...'
                          : 'The transmission failed. Please try again.'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </form>
        </motion.div>
      </section>
    </>
  )
}

export default ContactUs