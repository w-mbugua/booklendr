import { Box, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { Link } from '@chakra-ui/next-js';
import { Playfair_Display } from 'next/font/google';

export default function Logo() {
  return (
    <Heading as={Link} href="/home" color="primaries.yellow" fontWeight="bold">
      BookLendr
    </Heading>
  );
}
