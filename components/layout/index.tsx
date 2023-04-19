import { Grid, GridItem } from '@chakra-ui/react';
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
    <Grid
      templateAreas={`"nav header"
					"nav main"
					"nav footer"`}
      gridTemplateRows={'80px 1fr auto'}
      gridTemplateColumns={'250px 1fr'}
      gap="1"
      color="blackAlpha.700"
      bg="primaries.lightBlue"
    >
      <GridItem pl="2" area={'header'} display="grid" alignItems="center">
        <Header />
      </GridItem>
      <GridItem bg="primaries.white" area={'nav'}>
        <Sidebar />
      </GridItem>
      <GridItem pl="2" area={'main'}>
        {children}
      </GridItem>
      <GridItem pl="2" area={'footer'}>
        {/* <Footer /> */}
      </GridItem>
    </Grid>
  );
}
