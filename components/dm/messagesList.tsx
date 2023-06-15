import {
  CurrentUserQuery,
  MessageSentDocument,
  MessagesDocument
} from '@/generated/gql/graphql';
import { useQuery } from '@apollo/client';
import { Alert, AlertIcon, CircularProgress, Flex } from '@chakra-ui/react';
import MessageItem from './message-item';
import { useEffect } from 'react';

export default function MessageList({
  conversationId,
  user
}: {
  conversationId: number;
  user: CurrentUserQuery['currentUser'];
}) {
  const { data, error, loading, subscribeToMore } = useQuery(MessagesDocument, {
    variables: { conversationId }
  });

  const subscribeToMoreMessages = () =>
    subscribeToMore({
      document: MessageSentDocument,
      variables: { conversationId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newItem = subscriptionData.data.messageSent;
        return Object.assign({}, prev, {
          messages:
            newItem.sender.id === user.id
              ? prev.messages
              : [newItem, ...prev.messages]
        });
      }
    });

  useEffect(() => {
    subscribeToMoreMessages();
  }, []);

  if (loading) return <CircularProgress isIndeterminate color="green.300" />;
  if (error)
    return (
      <Alert status="error" variant="left-accent">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  return (
    <Flex direction="column" overflow="hidden">
      {data?.messages && (
        <Flex direction="column-reverse" overflowY="scroll" height="100%">
          {data.messages.map((msg) => (
            <MessageItem
              key={msg.id}
              message={msg}
              sentByMe={msg.sender.id === user.id}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
}
