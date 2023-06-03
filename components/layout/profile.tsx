import { LogoutDocument } from '@/generated/gql/graphql';
import useAuth from '@/hooks/useAuth';
import { useMutation, useApolloClient } from '@apollo/client';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';

export default function ProfileHeader() {
  const { currentUser } = useAuth();
  const [logout, { error, data }] = useMutation(LogoutDocument);
  const apollo = useApolloClient();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    if (!error) {
      await apollo.clearStore();
    }
    router.push('/login');
  };

  return (
    <Box pl={8}>
      <Menu>
        <MenuButton
          as={Button}
          variant="unstyled"
          fontWeight="normal"
          padding={3}
          rightIcon={<ChevronDownIcon />}
        >
          {capitalize(currentUser?.username)}
        </MenuButton>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
