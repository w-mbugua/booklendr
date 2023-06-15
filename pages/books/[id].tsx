import BookCard from '@/components/book-card';
import { GetBookByIdDocument } from '@/generated/gql/graphql';
import { useQuery } from '@apollo/client';
import { CircularProgress, Flex, HStack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function BookPage() {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');

  const { data, error, loading } = useQuery(GetBookByIdDocument, {
    variables: { BookId: Number(id) },
    onError: (error) => {
      setErrorMsg(error.graphQLErrors[0].message);
    }
  });
  const [errorMsg, setErrorMsg] = useState('');

  if (error) {
    return (
      <Text fontSize="md" color="red">
        {errorMsg}
      </Text>
    );
  }
  if (loading) {
    return (
      <Flex justifyContent="center">
        <CircularProgress isIndeterminate color="green.300" />
      </Flex>
    );
  }

  return data?.getBookById && <BookCard book={data?.getBookById} />;
}
