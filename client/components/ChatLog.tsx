import React, { useEffect, useRef } from 'react';
import { useMessagesQuery } from '../generated/graphql';
import { Message } from './Message';

interface ChatLogProps {}

export const ChatLog: React.FC<ChatLogProps> = ({}) => {
  const [{ data }] = useMessagesQuery();
  const chatContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll =
      chatContainer.current!.scrollHeight - chatContainer.current!.clientHeight;

    chatContainer.current?.scrollTo(0, scroll);
  }, [data]);

  return (
    <div
      ref={chatContainer}
      className="flex flex-col h-screen w-screen border-8 border-custom-heading-primary-light pb-14 border-l-0 bg-custom-bg-light overflow-scroll"
    >
      {data?.messages.map((msg) => (
        <Message
          name={msg.userId.toString()}
          key={msg.id}
          content={msg.content}
        />
      ))}
    </div>
  );
};
