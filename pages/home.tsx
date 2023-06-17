import BookCard from '@/components/book/book-card';
import Layout from '@/components/layout';
import SearchBar from '@/components/layout/searchbar';
import NewBook from '@/components/book/new-book';
import {
  GetBooksDocument,
  GetBooksQuery,
  GetTagsDocument
} from '@/generated/gql/graphql';
import { useQuery } from '@apollo/client';
import {
  Box,
  CircularProgress,
  Divider,
  Flex,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data, loading } = useQuery(GetBooksDocument);
  const { data: tagsData, error } = useQuery(GetTagsDocument);
  const [books, setBooks] = useState<GetBooksQuery['getBooks']>(
    data?.getBooks || []
  );
  const [selectedTag, setSelectedTag] = useState('all');

  useEffect(() => {
    if (selectedTag && data?.getBooks.length) {
      if (selectedTag === 'all') {
        setBooks(data.getBooks);
        return;
      }
      const booksToShow = data?.getBooks.filter((b) =>
        b.tags.map((t) => t.name).includes(selectedTag)
      );
      setBooks(booksToShow);
    }
  }, [selectedTag, data]);

  return (
    <Layout>
      <Flex mt="4" ml={4} gap="4em" width="100%">
        <Box height="100%">
          {!!books.length && (
            <Box>
              <SearchBar />
            </Box>
          )}
          <br />
          {!!tagsData?.getTags.length && (
            <Box
              flexWrap="wrap"
              bg="white"
              boxShadow="lg"
              borderRadius="20px"
              padding={2}
              minH="500px"
              justifyContent="center"
            >
              <Text as="h3" textAlign="center">
                Topic
              </Text>
              <RadioGroup
                onChange={(val) => setSelectedTag(val)}
                value={selectedTag}
              >
                <Stack>
                  <Radio
                    size="sm"
                    name="all"
                    value="all"
                    cursor="pointer"
                    _hover={{
                      background: 'primaries.olive',
                      color: 'white'
                    }}
                  >
                    All
                  </Radio>
                  {tagsData.getTags.map((tag) => (
                    <Radio
                      key={tag.id}
                      size="sm"
                      margin={1}
                      cursor="pointer"
                      value={tag.name}
                      _hover={{
                        background: 'primaries.olive',
                        color: 'white'
                      }}
                    >
                      {tag.name}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>
          )}
        </Box>
        <Box
          w="100%"
          h="100%"
          justifyContent="center"
          bg={books?.length ? 'white' : 'inherit'}
          p={6}
        >
          <HStack width="90%" justifyContent="end">
            <NewBook />
          </HStack>
          {books.length ? (
            <Flex gap="20px" direction="column" flexWrap="wrap">
              {books.map((book, idx) => (
                <Box key={book.id}>
                  <BookCard book={book} />
                  {books.length > 1 && idx < books.length - 1 && <Divider />}
                </Box>
                /* 
                                <Box minWidth="300px" key={book.id} width="30%">
                                    <BookPost book={book} width={100} />
                                </Box>
                                 */
              ))}
            </Flex>
          ) : (
            <>
              {loading ? (
                <Flex justifyContent="center" alignItems="center">
                  <CircularProgress
                    isIndeterminate
                    color="primaries.olive"
                    thickness="12px"
                  />
                </Flex>
              ) : (
                <Text align="center">No books found.</Text>
              )}
            </>
          )}
        </Box>
      </Flex>
    </Layout>
  );
}
