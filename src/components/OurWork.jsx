import React from 'react'
import Title from './Title'
import assets from '../assets/assets'

const OurWork = () => {

  const workData = [
    {
      title: 'Mobile app marketing',
      description: 'We turn bold ideas into powerful digital solutions that connect and engage.',
      image: assets.work_mobile_app
    },
    {
      title: 'Dashboard management',
      description: 'We help you execute your plan and deliver measurable results.',
      image: assets.work_dashboard_management
    },
    {
      title: 'Fitness app promotion',
      description: 'We create marketing strategies that drive growth and retention.',
      image: assets.work_fitness_app
    }
  ]

  return (
    <section
      id="our-work"
      className="relative flex flex-col items-center gap-12
                 px-4 sm:px-12 lg:px-24 xl:px-40
                 pt-32 pb-32
                 bg-blue-50 dark:bg-gray-900
                 text-gray-700 dark:text-white"
    >
      <Title
        title="Our latest work"
        desc="From strategy to execution, we craft digital solutions that move your business forward."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {workData.map((item, index) => (
          <div
            key={index}
            className="group rounded-2xl bg-white dark:bg-gray-800
                       shadow-md hover:shadow-xl
                       transition-all duration-500
                       hover:-translate-y-2 cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover rounded-t-2xl"
            />

            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurWork
