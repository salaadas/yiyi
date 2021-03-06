import Head from 'next/head';
import { BottomBar } from '../components/BottomBar';
import { ChatLog } from '../components/ChatLog';
import { useMeQuery } from '../generated/graphql';
import { TiAttachmentOutline, TiImage, TiWorld } from 'react-icons/ti';
import { IconWrapper } from '../components/IconWrapper';

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
        <div className="flex flex-col fixed top-0 left-0 h-screen w-20 m-0 border-8 border-r-0 box-border border-custom-heading-primary-light bg-custom-bg-light text-custom-light shadow overflow-scroll">
          <IconWrapper>
            <TiWorld size={28} /> {/** for chat */}
          </IconWrapper>
          <IconWrapper>
            <TiImage size={24} /> {/** for files */}
          </IconWrapper>
          <IconWrapper>
            <TiAttachmentOutline size={24} /> {/** for links */}
          </IconWrapper>
        </div>

        <div className="w-52 h-screen m-0 ml-20 border-8 box-border border-custom-heading-primary-light bg-gray-200 overflow-scroll">
          <div className="flex flex-col items-center justify-start p-1 m-0 overflow-hidden select-none">
            <div>ONLINE:</div>
            <div>🔴 {username}</div>
          </div>
        </div>

        <ChatLog />

        <BottomBar />
      </div>
    </div>
  );
}
