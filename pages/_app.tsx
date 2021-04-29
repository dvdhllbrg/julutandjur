/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import '../styles/globals.css';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <meta name="description" content="Veganska recept på julmat, för att julen är bäst utan djur!" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className="subwrapper">
        <div className="menu row">
          <h1 className="logo"><Link href="/"><a>Jul utan djur</a></Link></h1>
          <Link href="/">
            <a className={`menuitem${pathname === '/' ? ' active' : ''}`}>
              Hem
            </a>
          </Link>
          <Link href="/mat">
            <a className={`menuitem${pathname.includes('/mat') ? ' active' : ''}`}>
              Mat
            </a>
          </Link>
          <Link href="/om">
            <a className={`menuitem${pathname === '/om' ? ' active' : ''}`}>
              Om
            </a>
          </Link>
        </div>
        <div className="container">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
