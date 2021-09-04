import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const DropdownProps = [
  {
    id: 1,
    name: 'グループ登録',
    url: 'select-group',
  },
  {
    id: 2,
    name: '自分の予定を確認',
    url: 'my-reservation',
  },
  {
    id: 3,
    name: '団体管理画面',
    url: '#',
  },
  {
    id: 4,
    name: '設定',
    url: '#',
  },
  {
    id: 5,
    name: 'ヘルプ',
    url: '#',
  },
  {
    id: 6,
    name: 'ログアウト',
    url: '/',
  },
];

export const Dropdown: React.FC = () => {
  const auth = useAuth();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="inline-flex align-middle mr-3">
        <Menu.Button>
          <DotsVerticalIcon className="h-8 w-6" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
          <div className="py-1">
            {DropdownProps.map((item) => (
              <Menu.Item key={item.id}>
                {({ active }) => (
                  <Link href={item.url}>
                    {item.url === '/' ? (
                      <a
                        onClick={auth.signOut}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        )}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <a
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
