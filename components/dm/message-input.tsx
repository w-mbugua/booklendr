import {
  CurrentUserQuery,
  MessagesDocument,
  MessagesQuery,
  SendMessageDocument,
} from '@/generated/gql/graphql';
import { useMutation } from '@apollo/client';
import { Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { v4 } from 'uuid';
interface MessageInputProps {
  conversationId: number;
  sender: CurrentUserQuery['currentUser'];
}

export default function MessageInput({
  conversationId,
  sender,
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [sendMessage, { error, loading }] = useMutation(SendMessageDocument);

  const onSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendMessage({
        variables: {
          messageData: { body: message, sender: sender.id, conversationId },
        },
        optimisticResponse: {
          sendMessage: {
            __typename: 'Message',
            body: message,
            id: Math.random() * 10001
          },
        },
        update: (cache) => {
          const existing = cache.readQuery({
            query: MessagesDocument,
            variables: { conversationId },
          }) as MessagesQuery;
          const newMessage = {
            body: message,
            id: v4(), // temporary id for the cache
            conversation: conversationId,
            sender,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
          }
          cache.writeQuery({
            query: MessagesDocument,
            variables: { conversationId },
            data: {
              ...existing, // all other keys,
              messages: [
                newMessage,
                ...existing.messages,
              ],
            },
          });
        },
      });
    } catch (err: any) {
      toast.error('Failed to send message ', err.message);
    } finally {
      setMessage('');
    }
  };

  // fetch messages
  return (
    <form onSubmit={onSendMessage}>
      {error && <Text color="red">{error.message}</Text>}
      <Input
        name="message"
        placeholder="New message..."
        id="message"
        size="lg"
        value={message}
        onChange={({ target }) => setMessage(target.value)}
      />
    </form>
  );
}
