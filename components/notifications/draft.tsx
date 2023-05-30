import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { GoPrimitiveDot } from 'react-icons/go';

interface ConversationItemProps {
  userId: string;
  conversation: any;
  isSelected: boolean;
  onClick: () => void;
  hasSeenLatestMessage?: boolean;
  selectedConversationId?: string;
}

export default function ConversationItem({
  userId,
  conversation,
  selectedConversationId,
  hasSeenLatestMessage,
  onClick,
}: ConversationItemProps) {
  const handleClick = (event: React.MouseEvent) => {};

  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      p={4}
      cursor="pointer"
      borderRadius={4}
      bg={
        conversation.id === selectedConversationId ? 'whiteAlpha.200' : 'none'
      }
      _hover={{ bg: 'whiteAlpha.200' }}
      onClick={handleClick}
      onContextMenu={handleClick}
      position="relative"
    >
      <Flex position="absolute" left="-6px">
        {hasSeenLatestMessage === false && (
          <GoPrimitiveDot fontSize={18} color="#6B46C1" />
        )}
      </Flex>
      <Avatar />
      <Flex justify="space-between" width="80%" height="100%">
        <Flex direction="column" width="70%" height="100%">
          <Text
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {/* the sender's name */}
            sender
          </Text>
          {conversation.latestMessage && (
            <Box width="140%">
              <Text
                color="whiteAlpha.700"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {conversation.latestMessage.body.substring(70)}
              </Text>
            </Box>
          )}
        </Flex>
        <Text color="whiteAlpha.700" textAlign="right">
          {moment(conversation.updatedAt).fromNow()}
        </Text>
      </Flex>
    </Stack>
  );
}
