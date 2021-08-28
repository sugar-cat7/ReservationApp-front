import Head from 'next/head';
// import { useAuth } from '../context/AuthContext';
// import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { Dropdown } from './Dropdown';
import { ChevronLeftIcon } from '@heroicons/react/solid';

type Props = {
  title: string;
};

const Layout: React.FC<Props> = ({ children, title = 'default title' }) => {
  // const { user } = useAuth();
  // const [cookies] = useCookies(['access_token']);

  const router = useRouter();
  const isReady = router.isReady;
  const OverallLayout = () => {
    return (
      <div className="flex justify-center items-center flex-col min-h-screen text-black font-mono bg-gray-200">
        <Head>
          <title>{title}</title>
        </Head>
        <header className="bg-white w-screen ">
          <nav className="bg-white w-screen ">
            {router.pathname === '/' && (
              <div className="flex items-center h-14 justify-center">{title}</div>
            )}
            {router.pathname !== '/' && (
              <div className="flex items-center h-14 justify-between">
                <ChevronLeftIcon
                  className="h-8 w-6 ml-3"
                  onClick={() => {
                    router.back();
                  }}
                />
                {title}
                <div className="flex space-x-4">
                  <Dropdown />
                </div>
              </div>
            )}
          </nav>
        </header>
        <main className="flex flex-1 justify-center items-center w-80 flex-col">{children}</main>
        <footer className="w-full h-6 flex justify-center items-center text-gray-500 text-sm">
          @forest
        </footer>
      </div>
    );
  };

  //後で変えると思う
  if (!isReady) {
    return OverallLayout();
  }
  if (
    router.pathname !== '/' &&
    (sessionStorage.getItem('user_id') === ('0' || undefined) ||
      !sessionStorage.getItem('access_token'))
  ) {
    router.push('/');
  }

  return OverallLayout();
};

export default Layout;
