import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

export default function SearchBar() {
  return (
    <InputGroup borderColor="primaries.olive">
      <Input size="md" placeholder="search..." />
      <InputRightElement>
        <SearchIcon color="primaries.olive" />
      </InputRightElement>
    </InputGroup>
  );
}
