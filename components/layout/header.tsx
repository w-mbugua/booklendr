import NewBook from '@/components/new-book';
import { CurrentUserDocument, LogoutDocument } from '@/generated/gql/graphql';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { startCase } from 'lodash';
import { Link } from '@chakra-ui/next-js';
import { Box, Button, Text } from '@chakra-ui/react';
import NavButton from '../nav-button';
import SearchBar from './searchbar';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const { data } = useQuery(CurrentUserDocument);
  const [logout] = useMutation(LogoutDocument);
  const apolloClient = useApolloClient();

  return (
    <Box
      color="white"
      display="flex"
      justifyContent="space-evenly"
      alignItems="end"
    ></Box>
  );
}
