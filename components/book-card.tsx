import React from 'react';
import {
  Box,
  Badge,
  Text,
  Flex,
  useColorModeValue,
  Grid,
  GridItem,
  Button
} from '@chakra-ui/react';
import {
  Book,
  CurrentUserDocument,
  GetBooksQuery
} from '@/generated/gql/graphql';
import moment from 'moment';
import Image from 'next/image';
import { useQuery } from '@apollo/client';

export interface BookCardProps {
  book: GetBooksQuery['getBooks'][0];
}
const BookCard = ({ book }: BookCardProps) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const { data } = useQuery(CurrentUserDocument);

  return (
    <Box
      bg={bg}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderColor={borderColor}
      width="550px"
      padding={4}
    >
      <Flex justifyContent="space-between" alignItems="center" my="3">
        <Text fontSize="sm">
          @
          {data && data.currentUser.id === book.owner.id
            ? 'me'
            : book.owner.username}
        </Text>
        <Text fontSize="sm">
          {moment(book.createdAt).format('Do MMM YYYY')}
        </Text>
      </Flex>
      <Grid templateColumns="repeat(5, 1fr)" gap={2}>
        <GridItem w="100%" colSpan={2}>
          <Image
            src={book.cover}
            width="200"
            height="70"
            quality={100}
            alt={book.title}
          />
        </GridItem>
        <GridItem w="100%" colSpan={3}>
          <Box>
            <Flex justifyContent="space-between" alignItems="baseline">
              <Badge
                borderRadius="full"
                px="2"
                bg="primaries.olive"
                color="primaries.white"
              >
                {book.status}
              </Badge>
            </Flex>

            <Box mt="1" as="h4" lineHeight="tight" isTruncated>
              {book.title}
            </Box>
            <Box mt="1" as="h6" lineHeight="tight" isTruncated>
              {book.subtitle}
            </Box>
            <Text mt="2" color={useColorModeValue('gray.600', 'gray.400')}>
              by {book.author.name}
            </Text>
            {data && data.currentUser.id !== book.owner.id && (
              <Box>
                <Button
                  size="sm"
                  width="200px"
                  border="2px"
                  borderColor="primaries.yellow"
                  color="primaries.yellow"
                  my={2}
                  isDisabled={
                    book.loans[0]?.borrower.id === data?.currentUser.id
                  }
                >
                  Borrow
                </Button>
              </Box>
            )}
            <Text mt="2" color={useColorModeValue('gray.600', 'gray.400')}>
              {book.textSnippet}... Continue Reading
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default BookCard;
