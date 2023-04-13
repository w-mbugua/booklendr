import { background, Box } from '@chakra-ui/react';

export default function NavButton({ children }: { children: React.ReactNode }) {
  return (
    <Box
      paddingInline="1rem"
      h="2.5rem"
      display="inline-flex"
      alignItems="center"
      borderBottom="1px solid"
      color="primaries.olive"
      _hover={{
        borderRadius: '0.375rem',
        backgroundColor: 'primaries.olive',
        color: 'primaries.white',
        border: 'none',
      }}
    >
      {children}
    </Box>
  );
}
