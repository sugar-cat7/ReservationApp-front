import Head from 'next/head';
import { useAuth } from '../context/AuthContext';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
type Props = {
  title: string;
};

const Layout: React.FC<Props> = ({ children, title = 'default title' }) => {
  const { user } = useAuth();
  const [cookies] = useCookies(['access_token']);

  const router = useRouter();
  const isReady = router.isReady;

  const OverallLayout = () => {
    return (
      <div className="flex justify-center items-center flex-col min-h-screen text-black font-mono bg-gray-200">
        <Head>
          <title>{title}</title>
        </Head>
        <header className="bg-gray-800 w-screen">
          <nav className="bg-gray-800 w-screen">
            <div className="h-14"></div>
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
  if (router.pathname !== '/' && (user?.id === ('0' || undefined) || !cookies.access_token)) {
    if (!isReady) {
      return OverallLayout();
    }
    router.push('/');
  }

  return OverallLayout();
};

export default Layout;
