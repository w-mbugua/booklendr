import { CurrentUserDocument } from '@/generated/gql/graphql';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';
import { useApolloClient, useQuery } from '@apollo/client';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Logo from '../logo';
import NotificationBadge from './notifications';
import ProfileHeader from './profile';

export default function Header() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { data } = useQuery(CurrentUserDocument);
  const { logout } = useLogout();
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
      <Flex
        padding={2}
        justifyContent="flex-end"
        height="40%"
        width={{ base: '100%', sm: '80%' }}
      >
        <Box display={{ base: 'flex', sm: 'none' }} mb={6}>
          <Menu>
            <MenuButton
              as={Button}
              variant="unstyled"
              fontWeight="normal"
              padding={3}
              rightIcon={<HamburgerIcon w={8} h={8} />}
            />

            <MenuList>
              <MenuItem>
                <Link
                  color="primaries.darkBlue"
                  href="/home"
                  display="flex"
                  alignItems="center"
                >
                  Home
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  color="primaries.darkBlue"
                  href="/user/profile"
                  display="flex"
                  alignItems="center"
                >
                  My Books
                </Link>
              </MenuItem>
              <MenuItem>
                <NotificationBadge />
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box display={{ base: 'none', sm: 'flex' }}>
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
            My Books
          </Link>
          <NotificationBadge pad={6} />
          <ProfileHeader />
        </Box>
      </Flex>
    </Flex>
  );
}
