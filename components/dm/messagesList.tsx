import { CurrentUserQuery, MessagesDocument } from '@/generated/gql/graphql';
import { useQuery } from '@apollo/client';
import { Alert, AlertIcon, CircularProgress, Flex } from '@chakra-ui/react';
import MessageItem from './message-item';

export default function MessageList({
  conversationId,
  user,
}: {
  conversationId: number;
  user: CurrentUserQuery['currentUser'];
}) {
  const { data, error, loading } = useQuery(MessagesDocument, {
    variables: { conversationId },
  });
  if (loading) return <CircularProgress isIndeterminate color="green.300" />;
  if (error)
    return (
      <Alert status="error" variant="left-accent">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  return (
    <Flex direction="column">
      {data?.messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          sentByMe={msg.sender.id === user.id}
        />
      ))}
    </Flex>
  );
}
