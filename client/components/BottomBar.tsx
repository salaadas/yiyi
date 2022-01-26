import React from 'react';

interface BottomBarProps {}

export const BottomBar: React.FC<BottomBarProps> = ({}) => {
  return (
    <div className="flex flex-row items-center justify-between fixed left-80 right-20 bottom-3 border-4 border-custom-heading-primary-light shadow-lg bg-gray-200 px-2 h-12">
      <input
        type="text"
        placeholder="Message #🌍all"
        className="font-semibold w-full bg-transparent outline-none focus:ring-0 ml-0 mr-auto border-0 cursor-text"
      />
    </div>
  );
};
