import {
  ConversationsQuery,
  CurrentUserDocument,
  ReadConversationDocument,
} from '@/generated/gql/graphql';
import { useMutation, useQuery } from '@apollo/client';
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { GoPrimitiveDot } from 'react-icons/go';
import DmModal from '../dm/dm-modal';

interface NotificationItemProps {
  conversation: ConversationsQuery['conversations'][0];
  hasSeenLatestMessage?: boolean;
  selectedNotificationId?: string;
  userId: number | null;
  subScribeToCornversation: () => void;
}

export default function NotificationItem({
  conversation,
  userId,
  subScribeToCornversation,
}: NotificationItemProps) {
  const {
    isOpen: isOpenConversation,
    onOpen: onOpenConversation,
    onClose: onCloseConversation,
  } = useDisclosure();
  const { data } = useQuery(CurrentUserDocument);
  const [markConversationAsRead] = useMutation(ReadConversationDocument, {
    variables: { conversationId: conversation.id },
  });

  useEffect(() => {
    subScribeToCornversation();
  }, []);

  const hasSeenLatestMessage = conversation.participants.find(
    (p) => p.userId === userId
  )?.hasSeenLatestMessage;

  const handleClick = () => {
    try {
      onOpenConversation();
      // mark message as read
      if (hasSeenLatestMessage) return;
      markConversationAsRead();
    } catch (err) {
      toast.error('Failed to read message');
    }
  };

  return (
    <Stack
      direction="row"
      align="center"
      width="100%"
      p={4}
      cursor="pointer"
      borderRadius={4}
      // bg={
      //   conversation.id === selectedNotificationId ? 'whiteAlpha.200' : 'none'
      // }
      _hover={{ bg: 'whiteAlpha.200' }}
      onClick={handleClick}
      position="relative"
    >
      <Flex>
        {/* {hasSeenLatestMessage === false && (
          <GoPrimitiveDot fontSize={18} color="#6B46C1" />
        )} */}
        <Avatar size="sm" name={conversation.latestMessage?.sender.username}>
          {!hasSeenLatestMessage && (
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          )}
        </Avatar>
      </Flex>
      <Flex justify="space-between" width="80%" height="100%">
        <Flex direction="column" width="70%" height="100%">
          <Text
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {/* the sender's name */}
            {conversation.latestMessage?.sender.id === userId
              ? 'you'
              : conversation.latestMessage?.sender.username}
          </Text>
          {conversation.latestMessage && (
            <Box width="140%">
              <Text
                color="blackAlpha.700"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {conversation.latestMessage.body}
              </Text>
            </Box>
          )}
        </Flex>
        <Text color="blackAlpha.700" textAlign="right">
          {moment(conversation.updatedAt).fromNow()}
        </Text>
      </Flex>
      {data?.currentUser && (
        <DmModal
          conversationId={conversation.id}
          sender={data.currentUser}
          to={conversation.participants}
          isOpen={isOpenConversation}
          onClose={onCloseConversation}
        />
      )}
    </Stack>
  );
}
