import Link from 'next/link';
import Layout from '~/components/Layout';

export default () => (
  <Layout>
    <h1>Hello gist 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);
