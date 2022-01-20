import Head from 'next/head';
import React from 'react';
import { Formik, Form } from 'formik';
import { InputField } from './InputField';

interface promptProps {
  fn: Function;
}

export const Prompt: React.FC<promptProps> = ({ fn }) => {
  return (
    <>
      <div className="land h-full">
        <div className="mx-auto py-12 divide-y md:max-w-lg">
          <Head>
            <title>1969</title>
          </Head>

          <div className="text-2xl">
            <p className="italic font-bold">"Có lời mẹ hát</p>
            <p className="italic font-bold ml-[20%]">Ngọt bùi đắng cay..."</p>
            <p className="text-right text-base">-Trần Đăng Khoa</p>
          </div>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => fn({ input: values })}
          >
            {({}) => (
              <Form className="grid grid-cols-1 gap-4 mt-1">
                <InputField name="email" label="e:" type="text" />
                <InputField name="password" label="p:" type="password" />
                <div>
                  <button
                    className="rounded p-2 bg-custom-accent text-custom-heading-primary-light"
                    type="submit"
                  >
                    Hạt gạo làng ta
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
