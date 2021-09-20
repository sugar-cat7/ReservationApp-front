import React from 'react';
import { useState } from 'react';
import { EyeIcon } from '@heroicons/react/solid';
import { EyeOffIcon } from '@heroicons/react/solid';

type InputProps = JSX.IntrinsicElements['input'] & { PassFlag?: boolean };

const Input: React.FC<InputProps> = (props) => {
  const [isRevealPassword, setIsRevealPassword] = useState<boolean>(false);
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };
  const { PassFlag, type, ...inputProps } = props;
  return (
    <>
      <div className="relative">
        <input
          {...inputProps}
          type={!PassFlag ? type : isRevealPassword ? 'text' : 'password'}
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
        {PassFlag && (
          <span onClick={togglePassword}>
            {isRevealPassword ? (
              <EyeIcon className="h-4 w-4 absolute top-3 right-3" />
            ) : (
              <EyeOffIcon className="h-4 w-4 absolute top-3 right-3" />
            )}
          </span>
        )}
      </div>
    </>
  );
};

export default Input;
