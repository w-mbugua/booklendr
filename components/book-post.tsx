import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import BookCard, { BookCardProps } from './book-card';
import Image from 'next/image';
import { capitalize, startCase } from 'lodash';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import MainModal from './modal';
import { useMutation, useQuery } from '@apollo/client';
import {
  Book,
  Borrow_BookDocument,
  CurrentUserDocument,
  DeleteBookDocument,
  GetBooksDocument,
  GetBooksQuery,
  Reserve_BookDocument,
} from '@/generated/gql/graphql';
import ConfirmationAlert, { alertProps } from './confirmationModal';
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  InfoOutlineIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import EditBook from './edit-book';

interface BookPostProps extends BookCardProps {
  width?: number;
  secondaryContent?: boolean;
}
export default function BookPost({
  book,
  width = 30,
  secondaryContent = true,
}: BookPostProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const reservers =
    book?.reservations && book.reservations.length
      ? book.reservations.map((res) => res.reserver.id)
      : [];
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const {
    isOpen: isOpenBorrowAlert,
    onOpen: onOpenBorrowAlert,
    onClose: onCloseBorrowAlert,
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
        <Stack>
          {/* flex for thumbnail and text title */}
          <Flex direction="column" p={2}>
            <Flex direction="column" justifyContent="space-between" mt={3}>
              <Text>{startCase(book.title)}</Text>
              <Flex justifyContent="start" gap="10px" mb={2}>
                {user && user.currentUser.id === book.owner.id ? (
                  <>
                    <EditBook book={book} />
                    <Button
                      variant="unstyled"
                      fontWeight="normal"
                      onClick={onOpenAlert}
                    >
                      Delete &bull;
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="unstyled"
                    fontWeight="normal"
                    onClick={onOpenBorrowAlert}
                    isDisabled={
                      book.loans[0]?.borrower.id === user?.currentUser.id ||
                      reservers.includes(Number(user?.currentUser.id))
                    }
                  >
                    Borrow
                  </Button>
                )}
                <Button variant="unstyled" fontWeight="normal" onClick={onOpen}>
                  view more
                </Button>
              </Flex>
            </Flex>

            {book.tags.map((tag) => (
              <Tag
                size="sm"
                width="max-content"
                key={tag.name}
                variant="solid"
                bg="primaries.olive"
                mt={1}
                padding={1}
              >
                <TagLabel>{capitalize(tag.name)}</TagLabel>
              </Tag>
            ))}
          </Flex>
          {secondaryContent && (
            <>
              <Box>
                {book.loans[0]?.borrower.id === user?.currentUser.id && (
                  <Flex>
                    <Text fontSize="sm" mr={2}>
                      Borrow Request Status:{' '}
                    </Text>

                    <Button
                      size="sm"
                      border="2px"
                      width="130px"
                      colorScheme="green"
                      my={2}
                      leftIcon={<InfoOutlineIcon />}
                    >
                      {book.loans[0]?.status}
                    </Button>
                  </Flex>
                )}
                {reservers.includes(Number(user?.currentUser.id)) && (
                  <Flex>
                    <Text>Reservation Status: </Text>
                    <Tag
                      size="sm"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="green"
                      ml={2}
                    >
                      <TagLeftIcon boxSize="12px" as={InfoOutlineIcon} />
                      <TagLabel>
                        {/* find the user's reservation's status */}
                        {
                          book.reservations.find(
                            (res) =>
                              res.reserver.id === Number(user?.currentUser.id)
                          )?.status
                        }
                      </TagLabel>
                    </Tag>
                  </Flex>
                )}
              </Box>
              {error && (
                <Text fontSize="sm" color="red" mb={2}>
                  {error}
                </Text>
              )}
            </>
          )}
        </Stack>
      </Box>
      <MainModal isOpen={isOpen} onClose={onClose} size="2xl">
        <BookCard book={book} />
      </MainModal>
      <ConfirmationAlert
        action="delete book"
        isOpen={isOpenAlert}
        onOpen={onOpenAlert}
        onClose={handleDeleteBook}
      />
      <BorrowBookResponse
        book={book}
        isOpen={isOpenBorrowAlert}
        onOpen={onOpenBorrowAlert}
        onClose={onCloseBorrowAlert}
      />
    </>
  );
}

interface BorrowBookResponseProps extends alertProps {
  book: GetBooksQuery['getBooks'][0];
  onClose: () => void;
}
function BorrowBookResponse({
  book,
  isOpen,
  onOpen,
  onClose,
}: BorrowBookResponseProps) {
  const cancelRef = useRef(null);
  let message: string = '';
  let actionBtn: React.ReactNode | null = null;
  const [borrowBook, { data, loading, error }] =
    useMutation(Borrow_BookDocument);
  const [
    reserveBook,
    { data: reserveData, loading: reserveLoading, error: reserveError },
  ] = useMutation(Reserve_BookDocument);

  const toast = useToast();

  if (!book) return null;

  const handleBorrow = async () => {
    await borrowBook({
      variables: { borrowId: book.id },
      refetchQueries: [{ query: GetBooksDocument }],
    });
    toast({
      position: 'top',
      title: data?.borrow.message,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  const handleReservation = async () => {
    await reserveBook({
      variables: { reserveId: book.id },
      refetchQueries: [{ query: GetBooksDocument }],
    });
    toast({
      position: 'top',
      title: reserveData?.reserve.message,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };
  if (book.loans.length) {
    message = 'This book is currently taken. Would you like to reserve it?';
    actionBtn = (
      <Button
        bg="primaries.olive"
        color="primaries.white"
        onClick={handleReservation}
        ml={3}
      >
        Reserve
      </Button>
    );
  } else {
    message = 'This book is currently available. Would you like to proceed?';
    actionBtn = (
      <Button
        bg="primaries.olive"
        color="primaries.white"
        onClick={handleBorrow}
        ml={3}
      >
        Borrow
      </Button>
    );
  }
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Borrow Book
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            {actionBtn}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
