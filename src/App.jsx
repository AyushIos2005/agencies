import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import Services from './components/Services'
import OurWork from './components/OurWork'
import Teams from './components/Teams'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { motion } from "framer-motion"

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <motion.div
      layout
      transition={{
        duration: 0.8,       // 👈 SLOW animation
        ease: "easeInOut"    // 👈 SMOOTH curve
      }}
      className="bg-slate-50 dark:bg-gray-900 min-h-screen"
    >
      <Navbar theme={theme} setTheme={setTheme} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
        <TrustedBy />
        <Services />
        <OurWork />
        <Teams />
        <ContactUs />
        <Footer theme={theme} />
      </motion.div>

      <Toaster theme={theme} />
    </motion.div>
  )
}

export default App
