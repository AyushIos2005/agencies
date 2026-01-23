import React from 'react'
import assets from '../assets/assets'
import Title from './Title'

const Services = () => {

  const servicesData = [
    {
      title: 'Advertising',
      description: 'We turn bold ideas into powerful digital solutions that connect and engage.',
      icon: assets.ads_icon
    },
    {
      title: 'Content Marketing',
      description: 'We help you execute your plan and deliver measurable results.',
      icon: assets.marketing_icon
    },
    {
      title: 'Content Writing',
      description: 'We help you create a marketing strategy that drives results.',
      icon: assets.content_icon
    },
    {
      title: 'Social Media',
      description: 'We help you build a strong social media presence and engage your audience.',
      icon: assets.social_icon
    }
  ]

  return (
   <section
            id="services"
            className="relative flex flex-col items-center gap-12
             px-4 sm:px-12 lg:px-24 xl:px-40
             pt-32 pb-32
             bg-blue-50 text-gray-700 dark:bg-gray-900 dark:text-white"
>

      {/* Background Image */}
      <img
        src={assets.bgImage2}
        alt=""
        className="absolute -top-110 -left-70 -z-10 dark:hidden"
      />

      {/* Section Title */}
      <Title title="How can we help?" desc="Our services are designed to grow your brand" />

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="group p-6 rounded-2xl bg-white dark:bg-gray-800
                  transition transform hover:-translate-y-2
                  hover:shadow-2xl"
          >
            <img src={service.icon} alt="" className="w-10 mb-2" />
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
