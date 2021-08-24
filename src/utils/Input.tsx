import React from 'react';

type InputProps = {
  name: string;
  type: string;
  autoComplete?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input: React.FC<InputProps> = ({
  name,
  type,
  autoComplete,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
