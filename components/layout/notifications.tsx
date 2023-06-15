import {
  CurrentUserDocument,
  NotificationsDocument,
  ReadNotificationsDocument
} from '@/generated/gql/graphql';
import { useMutation, useQuery } from '@apollo/client';
import { Button, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import MessageNotifications from '../notifications/message-notifications';

export default function NotificationBadge({ pad = 0 }: { pad?: number }) {
  const { data, error, loading, subscribeToMore } =
    useQuery(CurrentUserDocument);
  const [readNotifications] = useMutation(ReadNotificationsDocument);
  const {
    isOpen: isOpenNotifications,
    onOpen,
    onClose: onCloseNotifictions
  } = useDisclosure();

  const onOpenNotifications = () => {
    try {
      onOpen();
      if (data?.currentUser.unreadMessages) {
        readNotifications();
      }
    } catch (err: any) {
      toast.error(err?.message || 'error reading notifications');
    }
  };

  const subscribeToNotifications = () =>
    subscribeToMore({
      document: NotificationsDocument,
      variables: { userId: Number(data?.currentUser.id) },
      updateQuery: (prev, { subscriptionData }) => {
        console.log({ subscriptionData });

        if (!subscriptionData) return prev;
        const newData = subscriptionData.data.newNotification;

        return Object.assign({}, prev, newData);
      }
    });

  useEffect(() => {
    if (data?.currentUser) {
      subscribeToNotifications();
    }
  }, [data?.currentUser]);

  return (
    <>
      <Button
        variant="unstyled"
        onClick={onOpenNotifications}
        display="flex"
        justifyContent="start"
        fontWeight="normal"
        padding={pad}
      >
        Messages
        {data?.currentUser && Number(data.currentUser.unreadMessages) > 0
          ? ` (${data.currentUser.unreadMessages})`
          : ''}
      </Button>
      {data?.currentUser && (
        <MessageNotifications
          onClose={onCloseNotifictions}
          isOpen={isOpenNotifications}
        />
      )}
    </>
  );
}
