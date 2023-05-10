import {
  CurrentUserDocument,
  CurrentUserQuery,
  GetBooksQuery,
  Get_Loans_By_IdDocument,
  Get_Loans_By_IdQuery,
  LoanFieldsFragment,
} from '@/generated/gql/graphql';
import { generateID } from '@/utils/generateID';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Text,
  Box,
  Flex,
  CircularProgress,
} from '@chakra-ui/react';
import moment from 'moment';
import Image from 'next/image';

// export interface Headcells {
//   label: string;
//   isNumeric: boolean;
// }
// interface PTProps {
//   caption?: string;
//   headCells: Headcells[];
//   book: GetBooksQuery['getBooks'][0];
// }

// if its borrowers,loop through the loans instead, each to have book details

function Row({ loan }: { loan: Get_Loans_By_IdQuery['loansByLenderId'][0] }) {
  return (
    <Tr>
      <Td>{Number(loan.id) + 1}</Td>
      <Td>
        <Image
          src={loan.book.cover}
          height={20}
          width={20}
          alt={loan.book.title}
        />
        <Text fontSize="sm">{loan.book.title}</Text>
      </Td>
      <Td>{moment(loan.createdAt).format('Do MMM YYYY')}</Td>
      <Td>{moment(loan.returnDate).format('Do MMM YYYY')}</Td>
      <Td>{loan.status}</Td>
      <Td>{loan.borrower.username}</Td>
      <Td>{loan.borrower.email}</Td>
      <Td>{loan.borrower.phoneNumber}</Td>
      <Td>{loan.loanOverdue.toString()}</Td>
    </Tr>
  );
}

const headCells = [
  {
    label: '#',
    isNumeric: false,
  },
  {
    label: 'Book',
    isNumeric: false,
  },
  {
    label: 'Loaned',
    isNumeric: false,
  },
  {
    label: 'Due Date',
    isNumeric: false,
  },
  {
    label: 'Status',
    isNumeric: false,
  },
  {
    label: 'Borrower',
    isNumeric: false,
  },
  {
    label: 'Borrower Email',
    isNumeric: false,
  },
  {
    label: 'Borrower Phone',
    isNumeric: false,
  },
  {
    label: 'Overdue',
    isNumeric: false,
  },
];
// book, borrower/reserver, actions
export default function BorroweredBooks() {
  const { data } = useQuery(CurrentUserDocument);
  const {
    data: loans,
    error: loansError,
    loading: loansLoading,
  } = useQuery(Get_Loans_By_IdDocument, {
    variables: { lenderId: Number(data?.currentUser.id) },
  });

  console.log({ loans });

  return (
    <Box>
      {loansLoading && (
        <Flex justifyContent="center">
          <CircularProgress />
        </Flex>
      )}
      {loans && (
        <TableContainer>
          <Table variant="striped" colorScheme="white">
            <TableCaption>Books Borrowed</TableCaption>
            <Thead>
              <Tr>
                {headCells.map((cell) => (
                  <Th isNumeric={cell.isNumeric} key={generateID()}>
                    {cell.label}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {loans && loans?.loansByLenderId.length ? (
                loans?.loansByLenderId.map((loan) => (
                  <Row key={loan.id} loan={loan} />
                ))
              ) : (
                <Text fontSize="xl">No borrowed books</Text>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
