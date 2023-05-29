import BookPost from '@/components/book-post';
import Layout from '@/components/layout';
import { useEffect, useState } from 'react';
import {
  CurrentUserDocument,
  GetBooksByOwnerDocument,
  GetBooksDocument,
  Get_Loans_By_IdDocument,
} from '@/generated/gql/graphql';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import BorroweredBooks from '@/components/profile/borrowedBooks';
import ReservedBooks from '@/components/profile/reservations';
import { useSearchParams } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

export default function UserProfile() {
  const searchParams = useSearchParams();
  const { currentUser } = useAuth();
  const [id, setId] = useState<number | null>(null);
  useEffect(() => {
    if (searchParams.get('id')) setId(Number(searchParams.get('id')));
    if (!searchParams.get('id') && currentUser) setId(currentUser.id);
  }, [currentUser, searchParams]);

  const { data, loading, error } = useQuery(GetBooksByOwnerDocument, {
    variables: { ownerId: Number(id) },
    skip: !id
  });


  return (
    <Layout>
      <Box>
        <Tabs>
          <Flex direction="column" gap="20px">
            <Box bg="white" p={4}>
              <TabList border="none">
                <Tab>Profile</Tab>
                <Tab>Borrowed</Tab>
                <Tab>Reserved</Tab>
              </TabList>
            </Box>
            <Box bg="white">
              <TabPanels>
                <TabPanel>
                  <Box display="flex" justifyContent="center">
                    {data && (
                      <Box maxWidth="100%">
                        {data?.getBooksByOwner.length ? (
                          <Box w="100%" display="flex" flexWrap="wrap">
                            {data?.getBooksByOwner.map((book) => (
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
            </Box>
          </Flex>
        </Tabs>
      </Box>
    </Layout>
  );
}
