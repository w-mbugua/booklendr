import {
  CurrentUserDocument,
  CurrentUserQuery,
  NotificationsDocument,
} from '@/generated/gql/graphql';
import { useQuery, useSubscription } from '@apollo/client';
import { Badge, Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function NotificationBadge() {
  const { data, error, loading, subscribeToMore } =
    useQuery(CurrentUserDocument);

  const subscribeToNotifications = () =>
    subscribeToMore({
      document: NotificationsDocument,
      variables: { userId: Number(data?.currentUser.id) },
      updateQuery: (prev, { subscriptionData }) => {
        console.log({ subscriptionData });

        if (!subscriptionData) return prev;
        const newData = subscriptionData.data.newNotification;
        return Object.assign({}, prev, newData);
      },
    });

  useEffect(() => {
    subscribeToNotifications();
  }, []);

  if (error) return null;
  return (
    !loading && (
      <Badge ml="1" colorScheme="green">
        {data?.currentUser.unreadMessages}
      </Badge>
    )
  );
}
