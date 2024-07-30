import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/auth';
import { SessionProvider } from 'next-auth/react';

function MyApp({Component, pageProps}:AppProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  )
}

export default MyApp;