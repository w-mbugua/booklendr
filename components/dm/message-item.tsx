import { MessagesQuery } from '@/generated/gql/graphql';
import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';

interface MessageItemProps {
  message: MessagesQuery['messages'][0];
  sentByMe: boolean;
}

function MessageItem({ message, sentByMe }: MessageItemProps) {
  return (
    <Stack
      direction="row"
      p={4}
      spacing={4}
      _hover={{ bg: 'blackAlpha.200' }}
      wordBreak="break-word"
    >
      {!sentByMe && (
        <Flex align="flex-end">
          <Avatar />
        </Flex>
      )}
      <Stack spacing={1} width="100%">
        <Stack
          direction="row"
          align="center"
          justify={sentByMe ? 'flex-end' : 'flex-start'}
        >
          {!sentByMe && (
            <Text fontWeight={500} textAlign="left">
              {message.sender.username}
            </Text>
          )}
          <Text fontSize={14} color="blackAlpha.700">
            {moment(message.createdAt).fromNow()}
          </Text>
        </Stack>
        <Flex justify={sentByMe ? 'flex-end' : 'flex-start'}>
          <Box
            bg={sentByMe ? 'primaries.lavender' : 'primaries.lightBlue'}
            px={2}
            py={1}
            borderRadius={12}
            maxWidth="65%"
          >
            <Text>{message.body}</Text>
          </Box>
        </Flex>
      </Stack>
    </Stack>
  );
}

export default MessageItem;
