import Head from 'next/head';
import { useMeQuery } from '../generated/graphql';

export default function Home() {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {
    body = 'Hello world';
  } else if (!data?.me) {
    body = 'Hello John Doe';
  } else {
    body = `Hello ${data.me.name}`;
  }

  return (
    <div>
      <Head>
        <title>YiYi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{body}</div>
    </div>
  );
}
