import { Box } from '@chakra-ui/react';

type sizes = 'small' | 'regular';
interface WrapperProps {
  children: React.ReactNode;
  variant: sizes;
}

export default function Wrapper({ children, variant }: WrapperProps) {
  return (
    <Box
      mt="8"
      mx="auto"
      width={variant === 'small' ? 'sm' : 'md'}
      backgroundColor="primaries.white"
      padding={6}
    >
      {children}
    </Box>
  );
}
