import React from 'react';

const Title = ({ title, desc }) => {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      
      {/* Heading */}
      <h2 className="text-3xl sm:text-5xl font-medium
                     text-gray-900 dark:text-white">
        {title}
      </h2>

      {/* Description */}
      {desc && (
        <p className="max-w-lg
                      text-gray-600 dark:text-gray-300">
          {desc}
        </p>
      )}
    </div>
  );
};

export default Title;
