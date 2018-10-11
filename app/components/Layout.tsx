import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface Props {
  title?: string;
}

const Layout: React.SFC<Props> = ({
  children,
  title = 'This is the default title',
}) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
    </header>
    {children}
    <footer>I'm here to stay</footer>
  </div>
);

export default Layout;
