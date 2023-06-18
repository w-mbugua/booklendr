import React from 'react';
import {
  Box,
  Badge,
  Text,
  Flex,
  useColorModeValue,
  Grid,
  GridItem,
  Button,
  Tag,
  TagLabel
} from '@chakra-ui/react';
import {
  CurrentUserDocument,
} from '@/generated/gql/graphql';
import moment from 'moment';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import BookCardActions from './book-card-actions';
import { Book } from '@/types';
import { capitalize, startCase } from 'lodash';

export interface BookCardProps {
  book: Book,
}
const BookCard = ({ book }: BookCardProps) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const { data } = useQuery(CurrentUserDocument);

  return (
    <Box
      bg={bg}
      //   borderWidth="1px"
      //   borderRadius="lg"
      //   borderColor={borderColor}
      overflow="hidden"
      width="100%"
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
        <GridItem w="auto" colSpan={1}>
          <Image
            src={book.cover}
            width="200"
            height="70"
            quality={100}
            alt={book.title}
          />
        </GridItem>
        <GridItem w="100%" colSpan={4}>
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
              <Text>{startCase(book.title)}</Text>
            </Box>
            <Box mt="1" as="h6" lineHeight="tight" isTruncated>
              {book.subtitle}
            </Box>
            <Text mt="2" color={useColorModeValue('gray.600', 'gray.400')}>
              by {book.author.name}
            </Text>
            <Flex>
              {book.tags.map((tag) => (
                <Tag
                  size="sm"
                  width="max-content"
                  key={tag.name}
                  variant="solid"
                  mt={1}
                  padding={1}
                >
                  <TagLabel>{capitalize(tag.name)}</TagLabel>
                </Tag>
              ))}
            </Flex>
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
              {book.description}
            </Text>
            {data && data.currentUser && (
              <BookCardActions user={data.currentUser} book={book} />
            )}

          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default BookCard;
