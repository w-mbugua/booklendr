import AuthGuard from '@/utils/route-guards/authGuard';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import Image from 'next/image';
import BgImage from '../public/assets/bg.png';
import Wrapper from './wrapper';
import { useRouter } from 'next/router';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const logins = ['/', '/login'];
export default function AuthWrapper({ children }: AuthWrapperProps) {
  const location = useRouter();
  return (
    <AuthGuard>
      <Box
        width="100%"
        height="100vh"
        display="flex"
        flexDir="column"
        alignItems="start"
        // justifyContent="center"
        backgroundImage="url('https://res.cloudinary.com/mbuguajoy/image/upload/v1687066120/pagepals/booklendr-auth.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="repeat"
      >
        <Flex width="80%" justifyContent="end">
          <Button
            variant="unstyled"
            color="white"
            mr={2}
            mb={0}
            mt={4}
            size="sm"
            as={Link}
            href={logins.includes(location.pathname) ? '/register' : '/login'}
            minWidth="100px"
          >
            {logins.includes(location.pathname) ? 'Sign Up' : 'Sign In'}
          </Button>
        </Flex>
        <Wrapper variant="small">{children}</Wrapper>
      </Box>
    </AuthGuard>
  );
}
