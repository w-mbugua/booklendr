import { Box } from '@chakra-ui/react';
import Image from 'next/image';

export default function Logo() {
  return (
    <Box w="100%" display="grid" placeContent="center">
      <Image src="/bookersImg.png" alt="logo" width="60" height="80" />
    </Box>
  );
}
