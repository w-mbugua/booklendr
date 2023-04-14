import BookCard from '@/components/book-card';
import Layout from '@/components/layout';
import { Book, BookResponse, GetBooksDocument } from '@/generated/gql/graphql';
import GuestGuard from '@/utils/route-guards/guestGuard';
import { useQuery } from '@apollo/client';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';

export default function Home() {
  const { data, loading } = useQuery(GetBooksDocument);
  return (
    <GuestGuard>
      <Layout>
        <Grid templateColumns="repeat(5, 1fr)">
          <GridItem w="50%" colSpan={1} />
          <GridItem colSpan={3}>
            {data && (
              <Box>
                {data.getBooks.length ? (
                  <Box>
                    {data.getBooks.map((book: Book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </Box>
                ) : (
                  <Text>No books found.</Text>
                )}
              </Box>
            )}
          </GridItem>
          <GridItem w="100%" />
        </Grid>
      </Layout>
    </GuestGuard>
  );
}
