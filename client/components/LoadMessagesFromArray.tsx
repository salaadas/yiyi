import React from 'react';
import { useUserQuery } from '../generated/graphql';
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
  const fetchUsername = (userId: number) => {
    const [{ data }] = useUserQuery({
      variables: { userId },
    });

    return data?.user?.name || 'John Doe';
  };

  return (
    <>
      {messages?.map((msg) => (
        <Message
          name={fetchUsername(msg.userId)}
          key={msg.id}
          content={msg.content}
        />
      ))}
    </>
  );
};
