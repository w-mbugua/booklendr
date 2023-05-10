import BookPost from '@/components/book-post';
import Layout from '@/components/layout';
import { useEffect, useState } from 'react';
import {
  CurrentUserDocument,
  GetBooksDocument,
  Get_Loans_By_IdDocument,
} from '@/generated/gql/graphql';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import BorroweredBooks from '@/components/profile/borrowedBooks';
import ReservedBooks from '@/components/profile/reservations';

export default function UserProfile() {
  const { data, loading, error } = useQuery(CurrentUserDocument);

  return (
    <Layout>
      <Tabs>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Borrowed</Tab>
          <Tab>Reserved</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box display="flex" justifyContent="center">
              <h1>BOOKS!!!!!</h1>
              {data && (
                <Box maxWidth="100%">
                  {data.currentUser.books.length ? (
                    <Box w="100%" display="flex" flexWrap="wrap">
                      {data?.currentUser.books.map((book) => (
                        <BookPost
                          key={book.id}
                          book={book}
                          secondaryContent={false}
                        />
                      ))}
                    </Box>
                  ) : (
                    <Text>No books found.</Text>
                  )}
                </Box>
              )}
            </Box>
          </TabPanel>
          <TabPanel>
            <BorroweredBooks />
          </TabPanel>
          <TabPanel>
            <ReservedBooks />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}
