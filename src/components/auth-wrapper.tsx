import { Box, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import BgImage from '../public/assets/bg.png';
import Wrapper from './wrapper';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDir="column"
      alignItems="center"
	  justifyContent="center"
      backgroundImage="url('/bg.png')"
      backgroundSize="contain"
      backgroundPosition="center"
      backgroundRepeat="repeat"
    >
      <Heading color="blackAlpha">Welcome To PagePals</Heading>
      <Wrapper variant="small">{children}</Wrapper>
    </Box>
  );
}
