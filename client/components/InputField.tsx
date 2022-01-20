import { useField } from 'formik';
import React from 'react';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  size: _,
  label,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input
        id={field.name}
        className="mt-1 block w-full border-4"
        value={field.value}
        {...props}
        onChange={field.onChange}
        placeholder={field.name}
      />
      {error ? <span className="text-custom-accent">{error}</span> : null}
    </div>
  );
};
