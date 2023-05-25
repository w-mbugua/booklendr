import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import MainModal, { ModalProps } from '../modal';
import { useState } from 'react';

interface DmModalProps extends ModalProps {
  conversationId: number;
}
export default function DmModal({
  conversationId,
  isOpen,
  onClose,
}: DmModalProps) {
  const [message, setMessage] = useState('');

  console.log({ conversationId });

  // fetch messages
  return (
    <MainModal
      isOpen={isOpen}
      onClose={onClose}
      header={
        <Box>
          <Flex>
            <Text fontWeight="bold">To:</Text>
          </Flex>
        </Box>
      }
    >
      {/* displat messages */}
      <Box minHeight="400px" position="absolute" bottom={0}></Box>
      {/* message input */}
      <form onSubmit={() => {}}>
        <Input
          name="author"
          id="author"
          size="lg"
          onChange={({ target }) => setMessage(target.value)}
        />
      </form>
    </MainModal>
  );
}
