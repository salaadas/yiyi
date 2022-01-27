import React from 'react';
import { useMessagesQuery } from '../generated/graphql';
import { Message } from './Message';

interface ChatLogProps {}

export const ChatLog: React.FC<ChatLogProps> = ({}) => {
  const [{ data }] = useMessagesQuery();

  return (
    <div className="flex flex-col h-screen w-screen border-8 border-custom-heading-primary-light border-l-0 bg-custom-bg-light">
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
