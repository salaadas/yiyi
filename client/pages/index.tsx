import Head from 'next/head';
import { BottomBar } from '../components/BottomBar';
import { Message } from '../components/Message';
import { useMeQuery } from '../generated/graphql';

export default function Home() {
  const [{ data, fetching }] = useMeQuery();
  let username = null;

  if (fetching) {
    username = '...';
  } else if (!data?.me) {
    username = 'John Doe';
  } else {
    username = data.me.name;
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>YiYi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <div className="flex flex-col fixed top-0 left-0 h-screen w-20 m-0 border-8 border-r-0 border-custom-heading-primary-light bg-custom-bg-light text-custom-light shadow overflow-hidden">
          <i>chat</i> {/** for chat */}
          <i>files</i> {/** for files */}
          <i>links</i> {/** for links */}
        </div>

        <div className="w-52 h-screen m-0 ml-20 border-8 border-custom-heading-primary-light bg-gray-200 overflow-hidden">
          <div className="flex flex-col items-center justify-start p-1 m-0 overflow-hidden">
            <div>ONLINE:</div>
            <div>🔴 me: {username}</div>
          </div>
        </div>

        <div className="flex flex-col h-screen w-screen border-8 border-custom-heading-primary-light border-l-0 bg-custom-bg-light">
          <Message name={username} content="test" />
        </div>

        <BottomBar />
      </div>
    </div>
  );
}
