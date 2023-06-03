import { Box, Heading } from '@chakra-ui/react';

type sizes = 'small' | 'regular';
interface WrapperProps {
  children: React.ReactNode;
  variant: sizes;
}

export default function Wrapper({ children, variant }: WrapperProps) {
  return (
    <Box
      mt="6"
      ml={{ md: 8 }}
      // width={variant === 'small' ? 'sm' : 'md'}
      background="transparent"
      padding={2}
      maxWidth="100%"
    >
      <Heading color="white">Welcome To BookLendr</Heading>

      {children}
    </Box>
  );
}
