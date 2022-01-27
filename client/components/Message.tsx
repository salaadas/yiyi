import React from 'react';

interface MessageProps {
  name: string;
  content: string;
}

export const Message: React.FC<MessageProps> = ({ name, content }) => {
  return (
    <div className="w-full flex flex-row items-center justify-between py-2 px-16 m-0 hover:bg-custom-accent transition-all duration-200 ease-linear">
      <div className="flex flex-col items-center w-12 m-0 ml-2 mb-auto">
        <img
          src={`https://avatars.dicebear.com/api/open-peeps/seed.svg`}
          alt=""
          className="bg-gray-200 flex-none w-12 h-full rounded-full shadow-md object-cover mb-auto mt-0 mx-0 cursor-pointer"
        />
      </div>

      <div className="w-11/12 flex flex-col justify-start">
        <p className="text-left font-semibold text-custom-light mr-1 cursor-pointer">
          {name}
        </p>
        <p className="text-left text-custom-light mr-1 whitespace-normal">
          {content}
        </p>
      </div>
    </div>
  );
};
