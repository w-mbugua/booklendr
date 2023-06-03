import { background, Box } from '@chakra-ui/react';

export default function NavButton({ children }: { children: React.ReactNode }) {
  return (
    <Box
      paddingInline="1rem"
      h="2.5rem"
      display="inline-flex"
      alignItems="center"
      color="primaries.yellow"
      _hover={{
        borderRadius: '0.375rem',
        backgroundColor: 'primaries.yellow',
        color: 'primaries.white',
        border: 'none',
      }}
    >
      {children}
    </Box>
  );
}
