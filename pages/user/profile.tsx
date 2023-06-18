import BookPost from '@/components/book/book-post';
import Layout from '@/components/layout';
import { useEffect, useState } from 'react';
import {
  CurrentUserDocument,
  GetBooksByOwnerDocument,
  GetBooksDocument,
  Get_Loans_By_IdDocument
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
  Text
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
        <Box
          backgroundImage="url('/header2.png')"
          filter="brightness(0.5) contrast(1.2) blur(1px)"
          opacity="0.7"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          width="100%"
          height="100%"
        ></Box>
        <Tabs align="center">
          <Flex direction="column" gap="20px">
            <Box position="relative">
              <Box
                backgroundImage="url('/header2.png')"
                filter="brightness(0.5) contrast(1.2) blur(1px)"
                opacity="0.7"
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                height="100%"
                width="100%"
                minHeight="80px"
                pt={4}
              ></Box>
              <Box
                position="absolute"
                bottom={-25}
                left={{ base: 0, md: '25%', lg: '35%' }}
                transform={{ base: 'translate(0%, -50%)', md: '' }}
              >
                <TabList border="none" color="white" bg="primaries.yellow">
                  <Tab>My Shelf</Tab>
                  <Tab>Borrowed</Tab>
                  <Tab>Reserved</Tab>
                </TabList>
              </Box>
            </Box>
            <Box>
              <TabPanels>
                <TabPanel>
                  <Box display="flex" justifyContent="center">
                    {data && (
                      <Box maxWidth="100%">
                        {data?.getBooksByOwner.length ? (
                          <Flex w="100%" flexWrap="wrap" gap="10px">
                            {data?.getBooksByOwner.map((book) => (
                              <Box minWidth="300px" key={book.id} width="30%">
                                <BookPost book={book} width={100} />
                              </Box>
                            ))}
                          </Flex>
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
