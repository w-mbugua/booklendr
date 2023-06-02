import {
  ConversationParticipant,
  CurrentUserQuery,
  SendMessageDocument,
} from '@/generated/gql/graphql';
import { useMutation } from '@apollo/client';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import MainModal, { ModalProps } from '../modal';
import MessageInput from './message-input';
import MessageList from './messagesList';

interface DmModalProps extends ModalProps {
  conversationId: number;
  to: Omit<
    ConversationParticipant,
    'conversation' | 'createdAt' | 'updatedAt'
  >[];
  sender: CurrentUserQuery['currentUser'];
}
export default function DmModal({
  conversationId,
  isOpen,
  onClose,
  to,
  sender,
}: DmModalProps) {
  const [message, setMessage] = useState('');
  const [sendMessage, { data, error, loading }] =
    useMutation(SendMessageDocument);

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

  const receivers = to.filter(
    (participant) => participant.userId !== sender.id
  ); // filter out current user

  // fetch messages
  return (
    <MainModal
      isOpen={isOpen}
      onClose={onClose}
      header={
        <Box>
          <Flex>
            <Text fontWeight="bold">To: {receivers.map((r) => r.userId)}</Text>
          </Flex>
          <Divider />
        </Box>
      }
    >
      <Flex
        direction="column"
        minHeight="400px"
        maxHeight="500px"
        overflow="hidden"
      >
        {/* display messages */}
        <Flex direction="column" overflow="hidden" flexGrow={1}>
          <MessageList user={sender} conversationId={conversationId} />
        </Flex>
        {/* message input */}
        <MessageInput sender={sender} conversationId={conversationId} />
      </Flex>
    </MainModal>
  );
}
