import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Tag,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import { BookCardProps } from './book-card';
import Image from 'next/image';
import { capitalize, startCase } from 'lodash';
import moment from 'moment';

interface BookPostProps extends BookCardProps {
  width?: number;
}
export default function BookPost({ book, width = 30 }: BookPostProps) {
  return (
    <Box boxShadow='xl' w={`${width}%`} m={2} bgColor="white">
      <Flex w="100%" justifyContent="space-between" padding={2}>
        <Tag size="md" variant="subtle" color="primaries.olive">
          <Avatar src="" size="xs" name={book.owner.username} ml={-1} mr={2} />
          <TagLabel>{book.owner.username}</TagLabel>
        </Tag>
        <Text fontSize="sm">{moment(book.createdAt).fromNow()}</Text>
      </Flex>
      <Box
        w="100%"
        display="flex"
        justifyContent="center"
        borderBottom="1px solid rgba(0, 0, 0, .2)"
        paddingBlockEnd={6}
        height="200px"
      >
        <Image src={book.cover} width="100" height="150" alt={book.title} />
      </Box>
      <Stack>
        {/* flex for thumbnail and text title */}
        <Flex justifyContent="space-between" paddingInline={2}>
          {book.thumbnail && (
            <Image
              src={book.thumbnail as string}
              width="40"
              height="40"
              alt={book.title}
            />
          )}
          <Text>{startCase(book.title)}</Text>

          {book.tags.map((tag) => (
            <Tag
              size="sm"
              key={tag.name}
              variant="solid"
              bg="primaries.lavender"
              mt={1}
              padding={1}
            >
              <TagLabel>{capitalize(tag.name)}</TagLabel>
            </Tag>
          ))}
        </Flex>
        {/* text for owner */}

        {/* flex for book tags */}

        {/* flex for borrow, view more buttons === description, subtitle, author */}
        <Flex justifyContent="space-evenly">
          <Button
            size="sm"
            width="200px"
            border="2px"
            borderColor="primaries.olive"
            color="primaries.olive"
            my={2}
          >
            Borrow
          </Button>

          <Button
            size="sm"
            width="200px"
            border="2px"
            color="primaries.olive"
            my={2}
          >
            View More
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
