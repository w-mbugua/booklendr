import {
  CurrentUserDocument
} from '@/generated/gql/graphql';
import { useQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  Flex,
  Tag,
  TagLabel,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import moment from 'moment';
import Image from 'next/image';
import BookCard, { BookCardProps } from './book-card';
import BookCardActions from './book-card-actions';
import MainModal from '../modal';

interface BookPostProps extends BookCardProps {
  width?: number;
  secondaryContent?: boolean;
}

export default function BookPost({
  book,
  width = 30,
  secondaryContent
}: BookPostProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: user } = useQuery(CurrentUserDocument);

  return (
    <>
      <Box boxShadow="xl" w={`${width}%`} m={2} bgColor="white" id="book-post">
        {secondaryContent && (
          <Flex w="100%" justifyContent="space-between" padding={2}>
            <Tag size="md" variant="subtle" color="primaries.yellow">
              <Avatar src="" size="xs" ml={-1} mr={2} />
              <TagLabel>
                @
                {user && user.currentUser.id === book.owner.id
                  ? 'me'
                  : book.owner.username}
              </TagLabel>
            </Tag>
            <Text fontSize="sm">{moment(book.createdAt).fromNow()}</Text>
          </Flex>
        )}
        <Box
          w="100%"
          display="flex"
          justifyContent="center"
          borderBottom="1px solid rgba(0, 0, 0, .2)"
          paddingBlockEnd={6}
          height="200px"
        >
          <Image src={book.cover} width="120" height="150" alt={book.title} />
        </Box>

        {user?.currentUser && (
          <BookCardActions book={book} user={user.currentUser} secondaryContent={secondaryContent} />
        )}

      </Box>
      <MainModal isOpen={isOpen} onClose={onClose} size="2xl">
        <BookCard book={book} />
      </MainModal>
    </>
  );
}
