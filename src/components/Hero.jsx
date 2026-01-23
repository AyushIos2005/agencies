import React from 'react'
import assets from '../assets/assets'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center gap-12
                 px-4 sm:px-12 lg:px-24 xl:px-40
                 pt-32 pb-32
                 bg-slate-50 dark:bg-gray-900
                 text-gray-700 dark:text-white
                 transition-colors duration-300"
    >

      {/* Trust badge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration :0.9 ,delay: 0.2,ease:"easeOut" }}
        className="inline-flex items-center gap-2
                   border border-gray-300 dark:border-gray-600
                   p-1.5 pr-4 rounded-full"
      >
        <img className="w-16" src={assets.group_profile} alt="Users" />
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Trusted by 10k+ people
        </p>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-gray-900 dark:text-white
                   text-4xl sm:text-5xl md:text-6xl xl:text-[84px]
                   font-medium xl:leading-[95px]
                   max-w-5xl text-center mx-auto"
      >
        Turning imagination into{' '}
        <span className="bg-gradient-to-r from-primary to-blue-500
                         bg-clip-text text-transparent">
          digital
        </span>{' '}
        impact.
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl text-sm sm:text-base md:text-lg
                   text-gray-600 dark:text-gray-300
                   leading-relaxed text-center"
      >
        Creating meaningful connections and turning big ideas into interactive
        digital experiences.
      </motion.p>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="relative"
      >
        <img
          src={assets.hero_img}
          alt="Hero"
          className="w-full max-w-6xl relative z-10"
        />

        {/* Decorative background image (light only) */}
        <img
          src={assets.bgImage1}
          alt=""
          className="absolute top-[-160px] right-[-160px]
                     z-0 dark:hidden"
        />
      </motion.div>

    </section>
  )
}

export default Hero
