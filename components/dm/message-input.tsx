import { CurrentUserQuery, SendMessageDocument } from '@/generated/gql/graphql';
import { useMutation } from '@apollo/client';
import {
	Input,
	Text
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface MessageInputProps {
  conversationId: number;
  sender: CurrentUserQuery['currentUser'];
}

export default function MessageInput({
  conversationId,
  sender,
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [sendMessage, { data, error, loading }] =
    useMutation(SendMessageDocument);

  console.log({ conversationId });
  const onSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendMessage({
        variables: {
          messageData: { body: message, sender: sender.id, conversationId },
        },
      });
    } catch (err: any) {
      toast.error('Failed to send message ', err.message);
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
        onChange={({ target }) => setMessage(target.value)}
      />
    </form>
  );
}
