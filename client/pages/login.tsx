import React from 'react';
import Head from 'next/head';

interface loginProps {}

export const Login: React.FC<loginProps> = ({}) => {
  return (
    <div className="land h-full">
      <Head>
        <title>1969</title>
      </Head>
      <div className="mx-auto py-12 divide-y md:max-w-lg bg-custom-background">
        <div className="text-2xl">
          <p className="italic font-bold">"Có lời mẹ hát</p>
          <p className="italic font-bold ml-[20%]">Ngọt bùi đắng cay..."</p>
          <p className="text-right text-base">-Trần Đăng Khoa</p>
        </div>

        <form className="grid grid-cols-1 gap-4 mt-1">
          <div>
            <span>e:</span>
            <input
              className="mt-1 block w-full border-4"
              type="text"
              placeholder="email"
            />
          </div>
          <div>
            <span>p:</span>
            <input
              className="mt-1 block w-full border-4"
              type="password"
              placeholder="password"
            />
          </div>
          <div>
            <button
              className="rounded p-2 bg-custom-accent text-custom-heading-primary-light"
              type="submit"
            >
              Hạt gạo làng ta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
