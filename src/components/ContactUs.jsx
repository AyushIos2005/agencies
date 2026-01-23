import React, { useState } from 'react'
import Title from './Title'
import assets from '../assets/assets'

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (event) => {
  event.preventDefault()
  setResult('Sending...')
  setLoading(true)

  // Use FormData (Web3Forms requirement)
const data = new FormData()
data.append('access_key', '7335f368-a429-4949-83fc-10184bc3acd8')
data.append('name', formData.name)
data.append('email', formData.email)
data.append('message', formData.message)
data.append('replyto', formData.email)
data.append('subject', 'New Contact Form Message')
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data  // No Content-Type header - browser sets multipart/form-data automatically
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const json = await response.json()
    
    if (json.success) {
      setResult('Message sent successfully! 🎉')
      setFormData({ name: '', email: '', message: '' })
    } else {
      setResult(json.message || 'Submission failed. Please try again.')
    }
  } catch (error) {
    console.error('Submission error:', error)  // Debug log
    setResult(`Error: ${error.message}. Please check console.`)
  } finally {
    setLoading(false)
  }
}


  return (
    <div id='contact-us' className='flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-32 pb-32 text-gray-700 dark:text-white bg-white dark:bg-gray-900'>
      <Title 
        title='Reach out to us' 
        desc='From strategy to execution, we craft digital solutions that move your business forward.'
      />

      <form onSubmit={onSubmit} className='grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl w-full'>
        {/* Name Field */}
        <div>
          <p className='mb-3 text-sm font-medium'>Your name</p>
          <div className='flex items-center pl-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-colors'>
            <img src={assets.person_icon} alt="Name" className="w-5 h-5 mr-3 opacity-70" />
            <input 
              type="text" 
              name="name"
              placeholder='Enter your name..' 
              value={formData.name}
              onChange={handleChange}
              className='w-full p-4 text-sm outline-none bg-transparent placeholder-gray-500 dark:placeholder-gray-400' 
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <p className='mb-3 text-sm font-medium'>Email id</p>
          <div className='flex items-center pl-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-colors'>
            <img src={assets.email_icon} alt="Email" className="w-5 h-5 mr-3 opacity-70" />
            <input 
              type="email" 
              name="email"
              placeholder='E.g. hinakhan@gmail.com' 
              value={formData.email}
              onChange={handleChange}
              className='w-full p-4 text-sm outline-none bg-transparent placeholder-gray-500 dark:placeholder-gray-400' 
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Message Field */}
        <div className='sm:col-span-2'>
          <p className='mb-3 text-sm font-medium'>Message</p>
          <div className='rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-colors p-4'>
            <textarea 
              name="message"
              rows={6} 
              placeholder='Enter your message' 
              value={formData.message}
              onChange={handleChange}
              className='w-full text-sm outline-none bg-transparent resize-vertical placeholder-gray-500 dark:placeholder-gray-400 min-h-[120px]' 
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          disabled={loading}
          className={`sm:col-span-2 font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg w-full sm:w-auto ${
            loading 
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 hover:shadow-xl transform hover:-translate-y-0.5 text-white'
          }`}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>

        {/* Result Message */}
        {result && (
          <div className={`sm:col-span-2 p-4 rounded-xl text-center font-medium ${
            result.includes('success') 
              ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800' 
              : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
          }`}>
            {result}
          </div>
        )}
      </form>
    </div>
  )
}

export default ContactUs
