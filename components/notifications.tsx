import {
  CurrentUserDocument,
  CurrentUserQuery,
  NotificationsDocument,
  ReadNotificationsDocument,
} from '@/generated/gql/graphql';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import {
  Badge,
  Box,
  Button,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import MessageNotifications from './notifications/message-notifications';

export default function NotificationBadge() {
  const { data, error, loading, subscribeToMore } =
    useQuery(CurrentUserDocument);
  const [readNotifications] = useMutation(ReadNotificationsDocument);
  const {
    isOpen: isOpenNotifications,
    onOpen,
    onClose: onCloseNotifictions,
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
        console.log("NEW NEW",newData);
        
        return Object.assign({}, prev, newData);
      },
    });

  useEffect(() => {
    if (data?.currentUser) {
      subscribeToNotifications();
    }
  }, [data?.currentUser]);

  return (
    <>
      <Button
        variant="ghost"
        leftIcon={<Icon as={BellAlertIcon} />}
        onClick={onOpenNotifications}
        display="flex"
        justifyContent="start"
      >
        Messages
        {data?.currentUser && (
          <Badge ml="1" colorScheme="green">
            {Number(data?.currentUser.unreadMessages) > 0
              ? data?.currentUser.unreadMessages
              : ''}
          </Badge>
        )}
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
