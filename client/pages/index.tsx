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
    <div className="min-h-screen">
      <Head>
        <title>YiYi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <div className="flex flex-col fixed top-0 left-0 h-screen w-20 m-0 border-8 border-r-0 border-custom-heading-primary-light bg-custom-bg-light text-custom-light shadow">
          <i>chat</i> {/** for chat */}
          <i>files</i> {/** for files */}
          <i>links</i> {/** for links */}
        </div>

        <div className="w-52 h-screen m-0 ml-20 border-8 border-custom-heading-primary-light bg-gray-200">
          <div className="flex flex-col items-center justify-start p-1 m-0">
            <div>ONLINE:</div>
            <div>neru</div>
            <div>salaadas</div>
            <div>bob</div>
            <div>tom</div>
          </div>
        </div>

        <div className="flex flex-col h-screen w-screen border-8 border-custom-heading-primary-light border-l-0 bg-custom-bg-light">
          <div className="flex flex-row items-center justify-between fixed left-80 right-20 bottom-3 border-4 border-custom-heading-primary-light shadow-lg bg-gray-200 px-2 h-12">
            <input
              type="text"
              placeholder="Message #🌍all"
              className="font-semibold w-full bg-transparent outline-none focus:ring-0 ml-0 mr-auto border-0 cursor-text"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
