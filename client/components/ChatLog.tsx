import React, { useEffect, useRef, useState } from 'react';
import {
  useMessageSentSubscription,
  useMessagesQuery,
} from '../generated/graphql';
import { Message } from './Message';

interface ChatLogProps {}

// export const ChatLog: React.FC<ChatLogProps> = ({}) => {
//   const [{ data }] = useMessagesQuery();
//   const [{ data: newMessages }] = useMessageSentSubscription();

//   const chatContainer = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const scroll =
//       chatContainer.current!.scrollHeight - chatContainer.current!.clientHeight;

//     chatContainer.current?.scrollTo(0, scroll);

//     console.log(data);
//     console.log('NEW MESSAGE:', newMessages);
//   }, [data]);

//   return (
//     <div
//       ref={chatContainer}
//       className="flex flex-col h-screen w-screen border-8 border-custom-heading-primary-light pb-14 border-l-0 bg-custom-bg-light overflow-scroll"
//     >
//       {data?.messages.map((msg) => (
//         <Message
//           name={msg.userId.toString()}
//           key={msg.id}
//           content={msg.content}
//         />
//       ))}
//     </div>
//   );
// };

export const ChatLog: React.FC<ChatLogProps> = ({}) => {
  const handleMessage = (messages: any[] = [], response: any) => {
    const result = [...messages, response.messageSent];
    return result;
  };

  const [oldMsgFetched, setOldMsgFetched] = useState(false);
  const [{ data: oldMessages }] = useMessagesQuery({ pause: oldMsgFetched });
  const [{ data: newMessages }] = useMessageSentSubscription({}, handleMessage);

  const chatContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (oldMessages) {
      setOldMsgFetched(true);
    }
  }, [oldMessages]);

  useEffect(() => {
    const scroll =
      chatContainer.current!.scrollHeight - chatContainer.current!.clientHeight;

    chatContainer.current?.scrollTo(0, scroll);
  }, [newMessages]);

  return (
    <div
      ref={chatContainer}
      className="flex flex-col h-screen w-screen border-8 border-custom-heading-primary-light pb-14 border-l-0 bg-custom-bg-light overflow-scroll"
    >
      {oldMessages?.messages.map((msg) => (
        <Message
          name={msg.userId.toString()}
          key={msg.id}
          content={msg.content}
        />
      ))}
      {newMessages?.map((msg) => (
        <Message
          name={msg.userId.toString()}
          key={msg.id}
          content={msg.content}
        />
      ))}
    </div>
  );
};
