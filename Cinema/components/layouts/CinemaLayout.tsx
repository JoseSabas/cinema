import { FC } from 'react';
import Head from 'next/head';
import { Navbar, Footer } from '../ui';

interface Props {
  title: string;
  pageDescription: string;
}

export const CinemaLayout:FC<Props> = ({children, title, pageDescription}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
      </Head> 

      <Navbar />

      <main style={{marginTop:'3rem', marginBottom:'5rem', minHeight:'calc(100vh - 8rem)', display:'flex', justifyContent:'center', alignItems:'center'}}>
        {children}
      </main>

      <Footer />
    </>
  )
}