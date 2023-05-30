import NotificationItem from '@/components/notifications/notificationItem';
import { ConversationsDocument } from '@/generated/gql/graphql';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@apollo/client';
import { Box, Flex, ModalProps, Progress } from '@chakra-ui/react';
import { toast } from 'react-hot-toast';

export default function MessageNotifications({ onClose, isOpen }: ModalProps) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const { currentUser } = useAuth();
  // fetch convos
  const { data, loading, error } = useQuery(ConversationsDocument, {
    onError: (error) => {
      toast.error(error.message);
    },
  });
  // display all unread messages
  console.log('DATA', data);

  return (
    <Flex
      height="100%"
      overflow="hidden"
      border="1px solid red"
      justifyContent="center"
    >
      {loading && <Progress size="xs" isIndeterminate />}
      <Flex
        direction="column"
        gap="10px"
        border="2px solid green"
        width="60%"
        alignItems="center"
      >
        {data &&
          data.conversations.map((conversation) => (
            <NotificationItem
              key={conversation.id}
              conversation={conversation}
              onClick={() => {}}
              userId={currentUser ? currentUser.id : null}
            />
          ))}
      </Flex>
    </Flex>
  );
}
