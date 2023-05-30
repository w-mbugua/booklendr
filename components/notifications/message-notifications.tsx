import { ConversationsDocument } from '@/generated/gql/graphql';
import { useQuery } from '@apollo/client';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Progress,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { toast } from 'react-hot-toast';
import NotificationItem from './notificationItem';
import useAuth from '@/hooks/useAuth';
import { ModalProps } from '../modal';

export default function MessageNotifications({ onClose, isOpen }: ModalProps) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const { currentUser } = useAuth();
  // fetch convos
  const { data, loading, error } = useQuery(ConversationsDocument, {
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Drawer placement="right" size="sm" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Messages</DrawerHeader>
        <DrawerBody overflow="hidden" justifyContent="center">
          {loading && <Progress size="xs" isIndeterminate />}
          <Flex direction="column" gap="10px" alignItems="center">
            {data &&
              data.conversations.map((conversation) => (
                <>
                <NotificationItem
                  key={conversation.id}
                  conversation={conversation}
                  onClick={() => {}}
                  userId={currentUser ? currentUser.id : null}
                />
                <Divider />
                </>
              ))}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
