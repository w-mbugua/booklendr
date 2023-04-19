import BookPost from '@/components/book-post';
import Layout from '@/components/layout';
import SearchBar from '@/components/layout/searchbar';
import NewBook from '@/components/new-book';
import { GetBooksDocument } from '@/generated/gql/graphql';
import { useQuery } from '@apollo/client';
import { Box, Flex, Tag, TagLabel, Text } from '@chakra-ui/react';
import { size } from 'lodash';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data, loading } = useQuery(GetBooksDocument);
  const [allTags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (data?.getBooks.length) {
      let tags = new Set<string>();
      const tagsData = data.getBooks.map((book) => {
        book.tags.forEach((tag) => tags.add(tag.name));
      });
      setTags([...tags]);
    }
  }, [data]);

  return (
    <Layout>
      <Flex>
        <Box w="70%" display="grid" justifyContent="center">
          <NewBook />
          {data && data.getBooks.length ? (
            <Box w="auto" display="flex" flexDirection="column">
              {data.getBooks.map((book) => (
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
            {allTags.length &&
              allTags.map((tag) => (
                <Tag
                  size="sm"
                  key={tag}
                  variant="outline"
                  colorScheme="gray"
                  margin={1}
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
