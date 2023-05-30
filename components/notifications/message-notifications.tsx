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
  useDisclosure,
} from '@chakra-ui/react';
import { toast } from 'react-hot-toast';
import NotificationItem from './notificationItem';
import useAuth from '@/hooks/useAuth';
import { ModalProps } from '../modal';
import DmModal from '../dm/dm-modal';

export default function MessageNotifications({ onClose, isOpen }: ModalProps) {
  const {
    isOpen: isOpenConversation,
    onOpen: onOpenConversation,
    onClose: onCloseConversation,
  } = useDisclosure();
  const { currentUser } = useAuth();
  // fetch convos
  const { data, loading, error } = useQuery(ConversationsDocument, {
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onViewConversation = () => {
    // when user clicks o a notification, it should:
    // 1. open that conversation's modal - the DM modal
    // this should mark that conversation's notread as read, unreadCount should come to zero
    try {
      onOpenConversation();
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <Drawer placement="right" size="sm" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Messages</DrawerHeader>
        <DrawerBody overflow="hidden" justifyContent="center">
          {loading && <Progress size="xs" isIndeterminate />}
          <Flex direction="column" gap="10px" alignItems="center">
            {data &&
              currentUser &&
              data.conversations.map((conversation) => (
                <>
                  <NotificationItem
                    key={conversation.id}
                    conversation={conversation}
                    onClick={onOpenConversation}
                    userId={currentUser ? currentUser.id : null}
                  />
                  <Divider />
                  <DmModal
                    conversationId={conversation.id}
                    sender={currentUser}
                    to={conversation.latestMessage?.sender.username || ''}
                    isOpen={isOpenConversation}
                    onClose={onCloseConversation}
                  />
                </>
              ))}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
