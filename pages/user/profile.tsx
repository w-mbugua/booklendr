import BookPost from '@/components/book-post';
import Layout from '@/components/layout';
import { GetBooksDocument } from '@/generated/gql/graphql';
import { useQuery } from '@apollo/client';
import { Box, Text } from '@chakra-ui/react';

export default function Home() {
  const { data, loading } = useQuery(GetBooksDocument);

  return (
    <Layout>
      <Box display="flex" justifyContent="center">
        {data && (
          <Box maxWidth="100%">
            {data.getBooks.length ? (
              <Box w="100%" display="flex" flexWrap="wrap">
                {data.getBooks.map((book) => (
                  <BookPost key={book.id} book={book} />
                ))}
              </Box>
            ) : (
              <Text>No books found.</Text>
            )}
          </Box>
        )}
      </Box>
    </Layout>
  );
}
