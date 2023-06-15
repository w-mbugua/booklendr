import {
  Borrow_BookDocument,
  DeleteBookDocument,
  GetBooksDocument,
  GetBooksQuery,
  Reserve_BookDocument
} from '@/generated/gql/graphql';
import { Book, CurrentUser } from '@/types';
import { useMutation } from '@apollo/client';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { capitalize, startCase } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import ConfirmationAlert, { alertProps } from '../confirmationModal';
import EditBook from './edit-book';
import { InfoOutlineIcon } from '@chakra-ui/icons';

interface BookActionProps {
  book: Book;
  user: CurrentUser;
  secondaryContent?: boolean;
}
export default function BookCardActions({
  book,
  user,
  secondaryContent = true
}: BookActionProps) {
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert
  } = useDisclosure();
  const {
    isOpen: isOpenBorrowAlert,
    onOpen: onOpenBorrowAlert,
    onClose: onCloseBorrowAlert
  } = useDisclosure();

  const reservers =
    book?.reservations && book.reservations.length
      ? book.reservations.map((res) => res.reserver.id)
      : [];

  const [error, setError] = useState('');
  const [deleteBook, { data, loading }] = useMutation(DeleteBookDocument, {
    refetchQueries: [{ query: GetBooksDocument }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    }
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
        isClosable: true
      });
    }
  }, [data]);

  return (
    <Stack>
      <Flex direction="column" p={2}>
        <Flex direction="column" justifyContent="space-between" mt={3}>
          <Flex justifyContent="start" gap="10px" mb={2}>
            {user && user.id === book.owner.id ? (
              <>
                <EditBook book={book} />
                <Button
                  variant="solid"
                  fontWeight="normal"
                  onClick={onOpenAlert}
                  size={'sm'}
                  _hover={{
                    bg: 'primaries.yellow',
                    color: 'white'
                  }}
                  bg='primaries.yellow'
                  color={'white'}
                >
                  Delete
                </Button>
              </>
            ) : (
              <Button
                variant="solid"
                fontWeight="normal"
                size={'sm'}
                onClick={onOpenBorrowAlert}
                _hover={{
                  bg: 'primaries.yellow',
                  color: 'white'
                }}
                isDisabled={
                  book.loans[0]?.borrower.id === user?.id ||
                  reservers.includes(Number(user?.id))
                }
              >
                Borrow
              </Button>
            )}
          </Flex>
        </Flex>

      </Flex>
      {secondaryContent && (
        <>
          <Box>
            {book.loans[0]?.borrower.id === user?.id && (
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
            {reservers.includes(Number(user?.id)) && (
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
                        (res) => res.reserver.id === Number(user?.id)
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
    </Stack>
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
  onClose
}: BorrowBookResponseProps) {
  const cancelRef = useRef(null);
  let message: string = '';
  let actionBtn: React.ReactNode | null = null;
  const [borrowBook, { data, loading, error }] =
    useMutation(Borrow_BookDocument);
  const [
    reserveBook,
    { data: reserveData, loading: reserveLoading, error: reserveError }
  ] = useMutation(Reserve_BookDocument);

  const toast = useToast();

  if (!book) return null;

  const handleBorrow = async () => {
    await borrowBook({
      variables: { borrowId: book.id },
      refetchQueries: [{ query: GetBooksDocument }]
    });
    toast({
      position: 'top',
      title: data?.borrow.message,
      status: 'success',
      duration: 2000,
      isClosable: true
    });
    onClose();
  };

  const handleReservation = async () => {
    await reserveBook({
      variables: { reserveId: book.id },
      refetchQueries: [{ query: GetBooksDocument }]
    });
    toast({
      position: 'top',
      title: reserveData?.reserve.message,
      status: 'success',
      duration: 2000,
      isClosable: true
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
