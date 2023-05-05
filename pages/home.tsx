import BookPost from '@/components/book-post';
import Layout from '@/components/layout';
import SearchBar from '@/components/layout/searchbar';
import NewBook from '@/components/new-book';
import { Book, GetBooksDocument, GetBooksQuery } from '@/generated/gql/graphql';
import { useQuery } from '@apollo/client';
import { Box, Flex, HStack, Tag, TagLabel, Text } from '@chakra-ui/react';
import { size } from 'lodash';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data, loading } = useQuery(GetBooksDocument);
  const [allTags, setTags] = useState<string[]>([]);
  const [books, setBooks] = useState<GetBooksQuery['getBooks']>(
    data?.getBooks || []
  );
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    if (data?.getBooks.length) {
      setBooks(data.getBooks);
      let tags = new Set<string>();
      const tagsData = data.getBooks.map((book) => {
        book.tags.forEach((tag) => tags.add(tag.name));
      });
      setTags([...tags]);
    }
  }, [data]);

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
      <Flex marginTop="4em">
        <Box w="70%" display="grid" justifyContent="center">
          <HStack justifyContent="end">
            <NewBook />
          </HStack>
          {books.length ? (
            <Box w="auto" display="flex" flexDirection="column">
              {books.map((book) => (
                <BookPost width={100} key={book.id} book={book} />
              ))}
            </Box>
          ) : (
            <Text>No books found.</Text>
          )}
        </Box>
        <Box height="100%">
          <Box>
            <SearchBar />
          </Box>
          <br />
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
            <Tag
              size="sm"
              variant="outline"
              colorScheme="gray"
              margin={1}
              onClick={() => setSelectedTag('all')}
              cursor="pointer"
              _hover={{
                background: 'primaries.lavender',
                color: 'white',
                transform: 'scale(1.3)',
                mx: 2,
              }}
            >
              <TagLabel>All</TagLabel>
            </Tag>
            {allTags.length &&
              allTags.map((tag) => (
                <Tag
                  size="sm"
                  key={tag}
                  variant="outline"
                  colorScheme="gray"
                  margin={1}
                  onClick={() => setSelectedTag(tag)}
                  cursor="pointer"
                  _hover={{
                    background: 'primaries.lavender',
                    color: 'white',
                    transform: 'scale(1.3)',
                    mx: 2,
                  }}
                >
                  <TagLabel>{tag}</TagLabel>
                </Tag>
              ))}
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
}
