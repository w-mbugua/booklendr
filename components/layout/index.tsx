import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import Footer from './footer';
import Header from './header';
import Sidebar from './sidebar';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, currentUser } = useAuth();
  const router = useRouter();

  return (
    <Flex direction="column" height="100%">
      <Header />
      <Flex width="100%">
        <Box width='100%'>{children}</Box>
      </Flex>
    </Flex>
  );
}
