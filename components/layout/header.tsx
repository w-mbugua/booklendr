import NewBook from '@/components/new-book';
import { Link } from '@chakra-ui/next-js';
import { Box, Button } from '@chakra-ui/react';
import NavButton from '../nav-button';
import SearchBar from './searchbar';

export default function Header() {
  return (
    <Box
      color="white"
      display="flex"
      justifyContent="space-evenly"
      alignItems="end"
    >
      <NavButton>
        <Link href="/">Free Books</Link>
      </NavButton>
      <SearchBar />
      <NewBook />
      <NavButton>
        <Link href="/">Borrow</Link>
      </NavButton>
      <Button bg="primaries.olive" variant="outline">
        logout
      </Button>
    </Box>
  );
}
