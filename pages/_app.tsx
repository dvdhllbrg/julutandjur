/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Veganska recept på julmat, för att julen är bäst utan djur!"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Script
        strategy="lazyOnload"
        data-website-id="0bdb76c8-c180-4488-9187-13c199d35a4c"
        data-do-not-track="true"
        data-domains="julutandjur.se"
        src="https://umami.davidhallberg.dev/script.js"
      />
      <div className="subwrapper">
        <div className="menu row">
          <h1 className="logo">
            <Link href="/">Jul utan djur</Link>
          </h1>
          <Link
            href="/"
            className={`menuitem${pathname === "/" ? " active" : ""}`}
          >
            Hem
          </Link>
          <Link
            href="/mat"
            className={`menuitem${pathname.includes("/mat") ? " active" : ""}`}
          >
            Mat
          </Link>
          <Link
            href="/om"
            className={`menuitem${pathname === "/om" ? " active" : ""}`}
          >
            Om
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
