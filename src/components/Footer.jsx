import React from 'react'
import assets from '../assets/assets'

const Footer = ({theme}) => {
  return (
    <footer className="bg-slate-50 dark:bg-gray-900 pt-12 mt-20 sm:mt-40 px-4 sm:px-10 lg:px-24 xl:px-40">
      
      {/* Footer Top */}
      <div className="flex flex-col lg:flex-row justify-between gap-10">

        {/* Left Section */}
        <div className='space-y-5 text-sm text-sm text-gray-700 dark:text-gray-400'>
          <img
            src={theme === 'dark' ? assets.logo_dark: assets.logo}
            className="w-32 sm:w-44 mb-4"
            alt="Company Logo"
          />

          <p className="max-w-md text-gray-600 dark:text-gray-400 mb-6">
            From strategy to execution, we craft digital solutions that move your business forward.
          </p>

          <ul className="flex gap-8 text-gray-700 dark:text-gray-300">
            <li>
              <a className="hover:text-primary transition" href="#hero">Home</a>
            </li>
            <li>
              <a className="hover:text-primary transition" href="#services">Services</a>
            </li>
            <li>
              <a className="hover:text-primary transition" href="#our-work">Our Work</a>
            </li>
            <li>
              <a className="hover:text-primary transition" href="#contact-us">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Right Section (optional – future use) */}
        <div className="text-gray-600 dark:text-gray-400">
          <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">
            Let’s Work Together
          </h4>
          <p>Email: ayushacess2@gmail.com</p>
          <p>Phone: 033-956-8754</p>
          <div className='flex items-center justify-between '>
          <a href='https://www.facebook.com/profile.php?id=100065510616728'>
          <img src={assets.facebook_icon}></img>
          </a>
          <a href='https://x.com/062_ds41166'>
          <img src={assets.twitter_icon}></img>
          </a>
          <a href='https://www.instagram.com/san_dh_ya_212/'>
          <img src={assets.instagram_icon}></img>
          </a>
          <a href='https://www.linkedin.com/in/ayush-verma-37ab48336/'>
          <img src={assets.linkedin_icon}></img>
          </a>
          </div>
        </div>
        

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} VGI(IT_Services). All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
