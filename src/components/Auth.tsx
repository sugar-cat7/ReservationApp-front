import { useState } from 'react';
import { useRouter } from 'next/router';
// import { useCookies } from 'react-cookie';
import Input from '../utils/Input';
import Button from '../utils/Button';
import { useAuth } from '../context/AuthContext';

const Auth: React.FC = () => {
  const router = useRouter();
  const auth = useAuth();

  const [name, setName] = useState<string>('');
  const [kana, setKana] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  // const [cookie, setCookie, removeCookie] = useCookies(['access_token']);

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
          if (res.status === 401) {
            throw 'authentication failed';
          }
          if (res.status === 500) {
            throw 'Internal Error!';
          }
          if (res.ok) {
            const resJson = res.json();
            return resJson;
          }
        })
        .then((data) => {
          const user = data.user;
          const token = data.token;
          if (!token) {
            throw 'Fail! Fetch Access Token!';
          }
          // const options = { path: '/' };
          // setCookie('access_token', token, options);
          auth.signIn({
            id: user.id,
            name: user.name,
            access_token: token,
          });
        });
      router.push('/select-group');
    } catch (err) {
      if (sessionStorage.getItem('access_token')) {
        // removeCookie('access_token');
        sessionStorage.removeItem('access_token');
      }
      if (sessionStorage.getItem('id')) {
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('name');
      }
      alert(err);
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
          if (res.status === 500) {
            throw 'Internal Error!';
          }
        });

        login();
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 sm:w-screen">
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
                <Input
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="名前"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Input
                  name="kana"
                  type="text"
                  autoComplete="kana"
                  placeholder="ふりがな"
                  value={kana}
                  onChange={(e) => {
                    setKana(e.target.value);
                  }}
                />
              </>
            )}
            <Input
              name="email"
              type="text"
              autoComplete="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="relative">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                PassFlag
              />
            </div>
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
          <Button>
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
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
