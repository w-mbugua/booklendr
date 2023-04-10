import { Grid, GridItem } from '@chakra-ui/react';
import Footer from './footer';
import Header from './header';
import Sidebar from './sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Grid
      templateAreas={`"nav header"
					"nav main"
					"nav footer"`}
      gridTemplateRows={'80px 1fr auto'}
      gridTemplateColumns={'150px 1fr'}
      height="100%"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" bg="orange.300" area={'header'} display="grid" alignItems="center">
        <Header />
      </GridItem>
      <GridItem bg="pink.300" area={'nav'}>
        <Sidebar />
      </GridItem>
      <GridItem pl="2" bg="green.300" area={'main'}>
        {children}
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={'footer'}>
        <Footer />
      </GridItem>
    </Grid>
  );
}
