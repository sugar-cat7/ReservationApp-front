import '../../styles/globals.css';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { CookiesProvider } from 'react-cookie';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <AuthProvider>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </AuthProvider>
  );
};
export default MyApp;
