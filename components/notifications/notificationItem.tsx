import { ConversationsQuery } from '@/generated/gql/graphql';
import { Avatar, AvatarBadge, Box, Flex, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { GoPrimitiveDot } from 'react-icons/go';

interface NotificationItemProps {
  conversation: ConversationsQuery['conversations'][0];
  onClick: () => void;
  hasSeenLatestMessage?: boolean;
  selectedNotificationId?: string;
  userId: number | null;
}

export default function NotificationItem({
  conversation,
  onClick,
  userId,
}: NotificationItemProps) {
  const handleClick = (event: React.MouseEvent) => {};
  const hasSeenLatestMessage = conversation.participants.find(
    (p) => p.userId === userId
  )?.hasSeenLatestMessage;

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
      onContextMenu={handleClick}
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
    </Stack>
  );
}
