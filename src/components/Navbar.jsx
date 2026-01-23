import React, { useState } from 'react'
import assets from '../assets/assets'
import { motion } from "motion/react"

const Navbar = ({ theme, setTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl
                       bg-white/70 dark:bg-gray-900/70">
      
      {/* Navbar Container */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex justify-between items-center
                   px-4 sm:px-12 lg:px-24 xl:px-40 py-4
                   font-medium"
      >

        {/* Logo */}
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={theme === 'dark' ? assets.logo_dark : assets.logo}
          className="w-32 sm:w-40 cursor-pointer"
          alt="Company Logo"
        />

        {/* Mobile Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 sm:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Nav Links */}
        <nav
          className={`
            flex gap-6 text-sm items-center
            text-gray-700 dark:text-gray-200

            max-sm:fixed max-sm:top-0 max-sm:right-0 max-sm:bottom-0
            max-sm:w-64 max-sm:flex-col
            max-sm:pt-24 max-sm:px-10
            max-sm:bg-white dark:max-sm:bg-gray-900
            max-sm:z-50 transition-transform duration-300

            ${menuOpen ? 'max-sm:translate-x-0' : 'max-sm:translate-x-full'}
          `}
        >

          {/* Close Button (Mobile) */}
          <img
            src={assets.close_icon}
            alt="Close"
            className="w-5 absolute right-4 top-4 sm:hidden cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />

          {['Home', 'Services', 'Our Work', 'Contact Us'].map((item, index) => (
            <a
              key={index}
              href={item === 'Home' ? '#hero' : `#${item.toLowerCase().replace(' ', '-')}`}
              onClick={() => setMenuOpen(false)}
              className="relative group cursor-pointer"
            >
              {item}
              <span
                className="absolute left-0 -bottom-1 w-0 h-[2px]
                           bg-primary transition-all duration-300
                           group-hover:w-full"
              />
            </a>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-4">

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-gray-200
                       dark:hover:bg-gray-700 transition"
          >
            <motion.img
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={theme === 'dark' ? assets.sun_icon : assets.moon_icon}
              alt="Theme Toggle"
              className="w-5"
            />
          </button>

          {/* Desktop CTA */}
          <a
            href="#contact-us"
            className="hidden sm:flex items-center gap-2
                       text-primary hover:opacity-80 transition cursor-pointer"
          >
            Connect
            <img src={assets.arrow_icon} alt="Arrow" />
          </a>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden cursor-pointer"
            onClick={() => setMenuOpen(true)}
          >
            <img src={assets.menu_icon} alt="Menu" className="w-6" />
          </button>
        </div>

      </motion.div>
    </header>
  )
}

export default Navbar
