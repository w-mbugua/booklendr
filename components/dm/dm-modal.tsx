import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import MainModal, { ModalProps } from '../modal';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CurrentUserQuery, SendMessageDocument } from '@/generated/gql/graphql';
import { toast } from 'react-hot-toast';
import MessageList from './messagesList';
import MessageInput from './message-input';

interface DmModalProps extends ModalProps {
  conversationId: number;
  to: string;
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
    <MainModal
      isOpen={isOpen}
      onClose={onClose}
      header={
        <Box>
          <Flex>
            <Text fontWeight="bold">To: {to}</Text>
          </Flex>
          <Divider />
        </Box>
      }
    >
      <Flex direction="column" minHeight="400px">
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
