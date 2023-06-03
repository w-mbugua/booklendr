import NewBook from '@/components/new-book';
import { CurrentUserDocument, LogoutDocument } from '@/generated/gql/graphql';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { startCase } from 'lodash';
import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import NavButton from '../nav-button';
import SearchBar from './searchbar';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import {
  HomeIcon,
  BookOpenIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/solid';
import NotificationBadge from './notifications';
import ProfileHeader from './profile';
import Logo from '../logo';

export default function Header() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { data } = useQuery(CurrentUserDocument);
  const [logout] = useMutation(LogoutDocument);
  const apolloClient = useApolloClient();

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Box padding={4}>
          <Logo />
        </Box>
      </Box>
      <Flex padding={2} justifyContent="flex-end" height="40%" width="80%">
        <Link
          color="primaries.darkBlue"
          href="/home"
          padding={6}
          display="flex"
          alignItems="center"
        >
          Home
        </Link>

        <Link
          color="primaries.darkBlue"
          href="/user/profile"
          padding={6}
          display="flex"
          alignItems="center"
        >
          Books
        </Link>
        <NotificationBadge />
        <ProfileHeader />
      </Flex>
    </Flex>
  );
}
