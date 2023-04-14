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
      gridTemplateColumns={'200px 1fr'}
      height="100%"
      gap="1"
      color="blackAlpha.700"
      bg="primaries.lightBlue"
    >
      <GridItem
        pl="2"
        area={'header'}
        display="grid"
        alignItems="center"
      >
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
