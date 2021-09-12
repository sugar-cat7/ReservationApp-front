import '../../styles/globals.css';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
// import { CookiesProvider } from 'react-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    if (
      router.pathname !== '/' &&
      router.pathname !== '/login' &&
      !router.pathname.includes('/info') &&
      (sessionStorage.getItem('user_id') === ('0' || undefined) ||
        !sessionStorage.getItem('access_token') ||
        !sessionStorage.getItem('user_id') ||
        !sessionStorage.getItem('name'))
    ) {
      router.push('/login');
    }
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};
export default MyApp;
