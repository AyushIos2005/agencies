import React from 'react';
import { company_logos } from '../assets/assets';

const TrustedBy = () => {
  return (
    <div className="py-10 bg-white dark:bg-gray-900 text-center">
      <h3 className="text-lg sm:text-xl font-semibold mb-6 text-white">
        Trusted by Leading Companies
      </h3>

      <div className="flex items-center justify-center flex-wrap gap-10">
        {company_logos.map((logo, index) => (
          <img
            key={index}
            src={logo} // Use the actual logo path
            alt={`Company Logo ${index + 1}`} // Better accessibility
            className="max-h-5 sm:max-h-6 dark:drop-shadow-xl hover:scale-105 transition-transform"
          />
        ))}
      </div>
    </div>
  );
};

export default TrustedBy;
