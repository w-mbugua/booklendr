import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import BookCard, { BookCardProps } from './book-card';
import Image from 'next/image';
import { capitalize, startCase } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import MainModal from './modal';
import { useMutation, useQuery } from '@apollo/client';
import {
  CurrentUserDocument,
  DeleteBookDocument,
  GetBooksDocument,
} from '@/generated/gql/graphql';
import ConfirmationAlert from './confirmationModal';

interface BookPostProps extends BookCardProps {
  width?: number;
}
export default function BookPost({ book, width = 30 }: BookPostProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const { data: user } = useQuery(CurrentUserDocument);
  const [error, setError] = useState('');
  const [deleteBook, { data, loading }] = useMutation(DeleteBookDocument, {
    refetchQueries: [{ query: GetBooksDocument }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const toast = useToast();

  const handleDeleteBook = async (status: boolean) => {
    if (status) {
      await deleteBook({ variables: { id: book.id } });
    }
    onCloseAlert();
  };

  useEffect(() => {
    if (data?.deleteBook === 204) {
      toast({
        position: 'top',
        title: 'Book deleted successfully!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [data]);

  return (
    <>
      <Box boxShadow="xl" w={`${width}%`} m={2} bgColor="white" id="book-post">
        <Flex w="100%" justifyContent="space-between" padding={2}>
          <Tag size="md" variant="subtle" color="primaries.olive">
            <Avatar
              src=""
              size="xs"
              name={book.owner.username}
              ml={-1}
              mr={2}
            />
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
          {error && (
            <Text fontSize="sm" color="red" mb={2}>
              {error}
            </Text>
          )}
          <Flex justifyContent="space-evenly">
            {user && user.currentUser.id === book.owner.id ? (
              <Button
                size="sm"
                width="200px"
                border="2px"
                borderColor="primaries.olive"
                color="primaries.olive"
                my={2}
                onClick={onOpenAlert}
                isLoading={loading}
              >
                Delete
              </Button>
            ) : (
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
            )}

            <Button
              size="sm"
              width="200px"
              border="2px"
              color="primaries.olive"
              my={2}
              onClick={onOpen}
            >
              View More
            </Button>
          </Flex>
        </Stack>
      </Box>
      <MainModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} size="2xl">
        <BookCard book={book} />
      </MainModal>
      <ConfirmationAlert
        action="delete book"
        isOpen={isOpenAlert}
        onOpen={onOpenAlert}
        onClose={handleDeleteBook}
      />
    </>
  );
}
