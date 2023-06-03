import { FormLabel } from '@chakra-ui/react';

export default function Label({ children }: { children: string }) {
  return (
    <FormLabel fontSize="sm" color="whiteAlpha.800">
      {children}
    </FormLabel>
  );
}
