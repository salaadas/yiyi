import React, { useEffect, useRef, useState } from 'react';
import {
  MessageSentSubscription,
  useMessageSentSubscription,
  useMessagesQuery,
} from '../generated/graphql';
import { LoadMessagesFromArray } from './LoadMessagesFromArray';

interface ChatLogProps {}

export const ChatLog: React.FC<ChatLogProps> = ({}) => {
  const handleMessage = (
    messages: MessageSentSubscription[] = [],
    response: MessageSentSubscription
  ) => {
    const result = [...messages, response.messageSent];
    return result as MessageSentSubscription[];
  };

  const [oldMsgFetched, setOldMsgFetched] = useState(false);
  const [{ data: oldMessages }] = useMessagesQuery({ pause: oldMsgFetched });
  const [{ data: newMessages }] = useMessageSentSubscription({}, handleMessage);

  const chatContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll =
      chatContainer.current!.scrollHeight - chatContainer.current!.clientHeight;

    chatContainer.current?.scrollTo(0, scroll);
  }, [newMessages]);

  useEffect(() => {
    if (oldMessages) {
      setOldMsgFetched(true);
    }
  }, [oldMessages]);

  return (
    <div
      ref={chatContainer}
      className="flex flex-col h-screen w-screen border-8 border-custom-heading-primary-light pb-14 border-l-0 bg-custom-bg-light overflow-scroll"
    >
      <LoadMessagesFromArray messages={oldMessages?.messages as any[]} />
      <LoadMessagesFromArray messages={newMessages as any[]} />
    </div>
  );
};
