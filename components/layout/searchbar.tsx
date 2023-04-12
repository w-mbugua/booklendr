import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

export default function SearchBar() {
  return (
    <InputGroup maxWidth="40%" borderColor="primaries.olive">
      <Input size="md" placeholder="search..." />
      <InputRightElement>
        <SearchIcon color="primaries.olive" />
      </InputRightElement>
    </InputGroup>
  );
}
