import { Form, Formik } from 'formik';
import React from 'react';
import { useCreateMessageMutation } from '../generated/graphql';
import { InputField } from './InputField';

interface BottomBarProps {}

export const BottomBar: React.FC<BottomBarProps> = ({}) => {
  const [, createMessage] = useCreateMessageMutation();

  return (
    <div className="flex flex-row items-center justify-between fixed left-80 right-20 bottom-3 border-4 border-custom-heading-primary-light shadow-lg bg-gray-200 px-2 h-12">
      <Formik
        initialValues={{ content: '', important: false }}
        onSubmit={(values, { resetForm }) => {
          if (!values.content) {
            return;
          }
          values.content = values.content.trim();
          console.log(values);
          createMessage({ input: { ...values } });
          resetForm();
        }}
      >
        {() => (
          <Form className="w-full">
            <InputField
              className="font-semibold w-full bg-transparent outline-none focus:ring-0 ml-0 mr-auto border-0 cursor-text"
              autoComplete="off"
              autoCorrect="off"
              name="content"
              type="text"
              placeholder="Message #🌍all"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
