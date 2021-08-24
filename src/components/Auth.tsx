import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const Auth: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [kana, setKana] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [_, setCookie] = useCookies(['access_token']);

  const login = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/api/login/`, {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        // mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.status === 400) {
            throw 'authentication failed';
          } else if (res.ok) {
            const token = res.headers.get('X-Authentication-Token');
            return token;
          }
        })
        .then((token) => {
          const options = { path: '/' };
          setCookie('access_token', token, options);
        });
      router.push('/select-group');
    } catch {
      (err: string) => {
        alert(err);
      };
    }
  };

  const authUser = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
      login();
    } else {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/api/user/`, {
          method: 'POST',
          body: JSON.stringify({ name: name, kana: kana, email: email, password: password }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (res.status === 400) {
            throw 'authentication failed';
          }
        });

        login();
      } catch {
        (err: string) => {
          alert(err);
        };
      }
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-20 w-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
          {isLogin ? 'Sign in' : 'Sign up'}
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={authUser}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            {!isLogin && (
              <>
                <div>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="名前"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    name="kana"
                    type="text"
                    autoComplete="kana"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="ふりがな"
                    value={kana}
                    onChange={(e) => {
                      setKana(e.target.value);
                    }}
                  />
                </div>
              </>
            )}
            <input
              name="email"
              type="text"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              autoComplete="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="text-sm">
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="cursor-pointer font-medium text-blue-400 hover:text-indigo-500"
            >
              {isLogin ? 'create account' : 'sign in'}
            </span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {isLogin ? 'Sign in' : 'Create new user'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
