import { useField } from 'formik';
import React from 'react';
import { TiWarningOutline } from 'react-icons/ti';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  size: _,
  label,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <div>
      {label && <label htmlFor={field.name}>{label}</label>}
      <input
        id={field.name}
        className="mt-1 block w-full border-4"
        value={field.value}
        {...props}
        onChange={field.onChange}
        placeholder={props.placeholder ? props.placeholder : field.name}
      />
      {error ? (
        <span className="text-red-500 flex gap-2">
          <p className="mt-1 ml-1">
            <TiWarningOutline />
          </p>
          <p>{error}</p>
        </span>
      ) : null}
    </div>
  );
};
