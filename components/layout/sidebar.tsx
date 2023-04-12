import { Link } from '@chakra-ui/next-js';
import { Box, Stack } from '@chakra-ui/react';
import Logo from '../logo';
import { Icon } from '@chakra-ui/react';
import { HomeIcon, BookOpenIcon, BellAlertIcon } from '@heroicons/react/24/solid';

export default function Sidebar() {
  return (
    <Box height="100%">
      <Box>
        <Logo />
      </Box>
      <Stack
        padding={2}
        display="flex"
        height="40%"
        justifyContent="space-evenly"
        textAlign="left"
      >
        <Link color="primaries.darkBlue" href="/">
          <Icon as={HomeIcon} w={22} h={22} pr={2} />
          Home
        </Link>

        <Link color="primaries.darkBlue" href="/">
          <Icon as={BookOpenIcon} w={22} h={22} pr={2} />
          Profile
        </Link>
        <Link color="primaries.darkBlue" href="/">
          <Icon as={BellAlertIcon} w={22} h={22} pr={2} />
          Notifications
        </Link>
      </Stack>
    </Box>
  );
}
