import NewBook from '@/components/new-book';
import { CurrentUserDocument, LogoutDocument } from '@/generated/gql/graphql';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { startCase } from 'lodash';
import { Link } from '@chakra-ui/next-js';
import { Box, Button, Text } from '@chakra-ui/react';
import NavButton from '../nav-button';
import SearchBar from './searchbar';

export default function Header() {
  const { data } = useQuery(CurrentUserDocument);
  const [logout] = useMutation(LogoutDocument);
  const apolloClient = useApolloClient();

  return (
    <Box
      color="white"
      display="flex"
      justifyContent="space-evenly"
      alignItems="end"
    >
      <Text
        fontSize="3xl"
        as={Link}
        href="/"
        color="primaries.olive"
        fontWeight="bold"
      >
        {startCase(data?.currentUser?.username)}
      </Text>

      <SearchBar />
      <NewBook />
      <NavButton>
        <Link href="/">Borrow</Link>
      </NavButton>
      <Button
        bg="primaries.olive"
        variant="outline"
        onClick={async () => {
          await logout({});
          apolloClient.resetStore()
        }}
      >
        logout
      </Button>
    </Box>
  );
}
