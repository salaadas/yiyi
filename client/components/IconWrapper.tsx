import React from 'react';

interface IconWrapperProps {}

export const IconWrapper: React.FC<IconWrapperProps> = ({ children }) => {
  return (
    <div
      className="relative flex items-center justify-center 
              h-12 w-12 mt-2 mb-2 mx-auto  
              bg-custom-heading-primary-light hover:bg-custom-accent dark:bg-custom-heading-primary-light
              text-custom-accent hover:text-custom-light
              hover:rounded-xl rounded-3xl
              transition-all duration-300 ease-linear
              cursor-pointer shadow-lg"
    >
      {children}
    </div>
  );
};
