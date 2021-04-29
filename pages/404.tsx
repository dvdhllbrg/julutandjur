import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404: kunde inte hitta sidan - Jul utan djur</title>
      </Head>
      <div>
        <p>Oj då! Den där sidan kunde inte hittas.</p>
        <p>
          Kanske var det
          {' '}
          <Link href="/mat/janssons"><a>Janssons frestelse</a></Link>
          {' '}
          du var sugen på?
        </p>
      </div>
    </>
  );
}
