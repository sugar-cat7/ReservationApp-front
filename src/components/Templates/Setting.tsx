import React, { useState } from 'react';
import { PencilAltIcon } from '@heroicons/react/solid';
import { CheckIcon } from '@heroicons/react/solid';
type Props = {
  user: { id: number; name: string; kana: string };
};

const Setting: React.FC<Props> = ({ user }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>('');

  return (
    <div className="bg-white text-center shadow-xl p-8 w-80 rounded">
      <div className="flex mt-4 justify-center">
        <p className="font-bold">Personal info </p>
        <PencilAltIcon className="h-6" onClick={() => setIsEdit(!isEdit)} />
      </div>
      <div className="flex justify-center mt-4">
        {/* <Image className="rounded-full" src="/avatar.jpg" width={60} height={60} alt="Avatar" /> */}
      </div>
      <div className="mt-4">
        <p className="font-bold">名前</p>
        {isEdit ? (
          <input className="mt-2 border border-black" value={userName} />
        ) : (
          <p className="mt-2 text-gray-600">{user.name}</p>
        )}
        <p className="font-bold mt-3">E-mail</p>
        {isEdit ? (
          <input className="mt-2 border border-black" value={email} />
        ) : (
          <p className="mt-2 text-gray-600">email</p>
        )}
      </div>

      <div className="mt-6 flex justify-around">
        {isEdit && <CheckIcon className="h-6 text-green-500" onClick={() => setIsEdit(!isEdit)} />}
      </div>
    </div>
  );
};

export default Setting;
