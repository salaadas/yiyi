import React from 'react';
import { fetchUsername } from '../helper';
import { Message } from './Message';

interface LoadMessagesFromArrayProps {
  messages: {
    __typename?: 'Message' | undefined;
    id: number;
    createdAt: any;
    updatedAt: any;
    content: string;
    important: boolean;
    userId: number;
  }[];
}

export const LoadMessagesFromArray: React.FC<LoadMessagesFromArrayProps> = ({
  messages,
}) => {
  return (
    <>
      {messages?.map((msg) => (
        <Message
          name={msg.userId.toString()}
          key={msg.id}
          content={msg.content}
        />
      ))}
    </>
  );
};
