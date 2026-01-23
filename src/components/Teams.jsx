import React from 'react'
import Title from './Title'
import {teamData} from '../assets/assets'

const Teams = () => {
  return (
    <section
      id="team"
      className="relative flex flex-col items-center gap-12
                 px-4 sm:px-12 lg:px-24 xl:px-40
                 pt-32 pb-32
                 bg-white dark:bg-gray-900
                 text-gray-800 dark:text-white"
    >
      <Title
        title="Meet the team"
        desc="A passionate team of digital experts dedicated to your brand’s success."
      />

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
            {teamData.map((team, index) => (
            <div key={index} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg ring-4 ring-white/50 dark:ring-gray-800/50 hover:shadow-xl transition-all">
                <img 
                    src={team.image} 
                    alt={team.name}
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="text-center">
                <h3 className="font-semibold text-lg">{team.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{team.role}</p>
                </div>
            </div>
                ))}


      </div>
    </section>
  )
}

export default Teams
