import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Divider,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
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
import { useApolloClient, useMutation } from '@apollo/client';
import {
  LogoutDocument,
  ReadNotificationsDocument,
} from '@/generated/gql/graphql';
import { useRouter } from 'next/router';
import NotificationBadge from '../notifications';
import MessageNotifications from '../notifications/message-notifications';
import { toast } from 'react-hot-toast';

export default function Sidebar() {
  const { currentUser } = useAuth();
  const [logout, { error, data }] = useMutation(LogoutDocument);
  const apollo = useApolloClient();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    if (!error) {
      apollo.resetStore();
    }
    router.push('/login');
  };

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
            href="/home"
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
          href="/home"
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

        <NotificationBadge />
        <Button
          variant="ghost"
          leftIcon={<Icon as={ArrowLeftOnRectangleIcon} />}
          onClick={handleLogout}
          display="flex"
          justifyContent="start"
        >
          Logout
        </Button>
      </Stack>
    </Box>
  );
}
