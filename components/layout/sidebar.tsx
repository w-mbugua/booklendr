import { Link } from '@chakra-ui/next-js';
import { Box, Divider, Stack, Text } from '@chakra-ui/react';
import Logo from '../logo';
import { Icon } from '@chakra-ui/react';
import {
  HomeIcon,
  BookOpenIcon,
  BellAlertIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/solid';
import useAuth from '@/hooks/useAuth';
import { startCase } from 'lodash';

export default function Sidebar() {
  const { currentUser } = useAuth();
  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="fixed"
      top="0"
      left="0"
    >
      <Box>
        {/* <Logo /> */}
        <Box padding={4}>
          <Text
            fontSize="lg"
            as={Link}
            href="/"
            color="primaries.olive"
            fontWeight="bold"
          >
            Welcome, {startCase(currentUser?.username)}
          </Text>
        </Box>
      </Box>
      <Divider />
      <Stack padding={2} display="flex" height="40%">
        <Link
          color="primaries.darkBlue"
          href="/"
          padding={6}
          display="flex"
          alignItems="center"
        >
          <Icon as={HomeIcon} w={26} h={26} paddingRight={2} />
          Home
        </Link>

        <Link
          color="primaries.darkBlue"
          href="/user/profile"
          padding={6}
          display="flex"
          alignItems="center"
        >
          <Icon as={BookOpenIcon} w={26} h={26} paddingRight={2} />
          Profile
        </Link>
        <Link
          color="primaries.darkBlue"
          href="/notifications"
          padding={6}
          display="flex"
          alignItems="center"
        >
          <Icon as={BellAlertIcon} w={26} h={26} paddingRight={2} />
          Notifications
        </Link>
        <Link
          color="primaries.darkBlue"
          href="/notifications"
          padding={6}
          display="flex"
          alignItems="center"
        >
          <Icon as={ArrowLeftOnRectangleIcon} w={26} h={26} paddingRight={2} />
          Logout
        </Link>
      </Stack>
    </Box>
  );
}
