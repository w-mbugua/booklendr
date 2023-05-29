import {
  Book,
  Search_BooksDocument,
  Search_BooksQuery,
} from '@/generated/gql/graphql';
import { useLazyQuery } from '@apollo/client';
import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement, grid } from '@chakra-ui/react';
import { resetIdCounter, useCombobox } from 'downshift';
import { debounce } from 'lodash';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type SearchBook = Search_BooksQuery['searchBook'];

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [searchBooks, { data, loading, error }] = useLazyQuery(
    Search_BooksDocument,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items: SearchBook = data?.searchBook || [];

  //debounce func
  const findBooks = debounce(searchBooks, 2000);
  resetIdCounter();

  useEffect(() => {
    if (inputValue) findBooks({ variables: { searchTerm: inputValue } });
  }, [inputValue]);
  const {
    isOpen,
    getItemProps,
    getInputProps,
    getMenuProps,
    getToggleButtonProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onSelectedItemChange({ selectedItem }) {
      console.log('SELECTED!', selectedItem);
    },
  });
  return (
    <InputGroup borderColor="primaries.olive">
      <Input
        size="md"
        {...getInputProps({
          type: 'search',
          placeholder: 'Search for an Item',
          onChange: (event) => {
            console.log((event.target as HTMLInputElement).value);

            setInputValue((event.target as HTMLInputElement).value);
          },
          id: 'search-books',
        })}
      />
      <InputRightElement>
        <SearchIcon {...getToggleButtonProps()} color="primaries.olive" />
      </InputRightElement>
      <ul
        style={{
          position: 'absolute',
          overflow: 'scroll',
          maxHeight: '280px',
          width: '280px',
          marginTop: '42px',
          display: isOpen && items.length ? 'block' : 'none',
        }}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((option: SearchBook[0], index: number) => (
            <li
              key={index}
              {...getItemProps({ item: option, index })}
              style={{
                backgroundColor:
                  highlightedIndex === index ? 'lightgray' : 'white',
                fontWeight: inputValue === option.title ? 'bold' : 'normal',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingTop: '5px',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '2em'
              }}
            >
              <Image
                src={option.cover}
                alt={option.title}
                width="30"
                height="30"
              />
              {option.title}
            </li>
          ))}
      </ul>
    </InputGroup>
  );
}
