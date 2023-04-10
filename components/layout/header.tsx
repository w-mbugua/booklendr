import { Link } from '@chakra-ui/next-js';
import { Box, Button } from '@chakra-ui/react';
import SearchBar from './searchbar';

export default function Header() {
  return (
    <Box color="white" display="flex" justifyContent="space-evenly" alignItems="end">
      <Box>
        <Link href="/">Free Books</Link>
      </Box>
      <SearchBar />
      <Box>
        <Link href="/">New Book</Link>
      </Box>
      <Box>
        <Link href="/">Borrow</Link>
      </Box>
      <Button>logout</Button>
    </Box>
  );
}
