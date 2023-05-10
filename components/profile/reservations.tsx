import {
  CurrentUserDocument,
  Get_Lender_ReservationsDocument,
  Get_Lender_ReservationsQuery,
} from '@/generated/gql/graphql';
import { generateID } from '@/utils/generateID';
import { useQuery } from '@apollo/client';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import moment from 'moment';
import Image from 'next/image';

function Row({
  reservation,
  index,
}: {
  index: number;
  reservation: Get_Lender_ReservationsQuery['reservationsByLenderId'][0];
}) {
  return (
    <Tr>
      <Td>{index + 1}</Td>
      <Td>
        <Image
          src={reservation.book.cover}
          height={20}
          width={20}
          alt={reservation.book.title}
        />
        <Text fontSize="sm">{reservation.book.title}</Text>
      </Td>
      <Td>{moment(reservation.createdAt).format("Do MMM YYYY")}</Td>
      <Td>{reservation.toBorrowDate}</Td>
      <Td>{reservation.status}</Td>
      <Td>{reservation.reserver.username}</Td>
      <Td>{reservation.reserver.email}</Td>
      <Td>{reservation.reserver.phoneNumber}</Td>
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
    label: 'Reserved',
    isNumeric: false,
  },
  {
    label: 'Days To Borrow Date',
    isNumeric: false,
  },
  {
    label: 'Status',
    isNumeric: false,
  },
  {
    label: 'Reserved By',
    isNumeric: false,
  },
  {
    label: 'Email',
    isNumeric: false,
  },
  {
    label: 'Phone Number',
    isNumeric: false,
  },
];
// book, borrower/reserver, actions
export default function ReservedBooks() {
  const { data: request } = useQuery(CurrentUserDocument);
  const { data, error, loading } = useQuery(Get_Lender_ReservationsDocument, {
    variables: { lenderId: Number(request?.currentUser.id) },
  });

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="white">
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
          {data &&
            data?.reservationsByLenderId.length &&
            data?.reservationsByLenderId.map((reservation, idx) => (
              <Row index={idx} key={reservation.id} reservation={reservation} />
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
