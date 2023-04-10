import { Link } from '@chakra-ui/next-js';
import { Box, Stack } from '@chakra-ui/react';
import Logo from '../logo';
import { Icon } from '@chakra-ui/react';
import { HomeIcon } from '@heroicons/react/24/solid';

export default function Sidebar() {
  return (
    <Box bg="primaries.white" height="100%" color="white">
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
        <Box display="flex" alignItems="center">
          <Icon as={HomeIcon} />
          <Link color="primaries.darkBlue" href="/">
            Home
          </Link>
        </Box>
        <Link color="primaries.darkBlue" href="/">
          Profile
        </Link>
        <Link color="primaries.darkBlue" href="/">
          Notifications
        </Link>
      </Stack>
    </Box>
  );
}
