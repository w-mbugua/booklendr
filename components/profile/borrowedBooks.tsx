import {
    CreateConversationDocument,
    CurrentUserDocument,
    CurrentUserQuery,
    Get_Loans_By_IdDocument,
    Get_Loans_By_IdQuery
} from '@/generated/gql/graphql';
import { generateID } from '@/utils/generateID';
import { useMutation, useQuery } from '@apollo/client';
import {
    HamburgerIcon
} from '@chakra-ui/icons';
import {
    Box,
    CircularProgress,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { capitalize } from 'lodash';
import moment from 'moment';
import Image from 'next/image';
import { IoMdChatbubbles } from 'react-icons/io';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { MdOutlineCancel, MdOutlineMoreVert } from 'react-icons/md';
import DmModal from '../dm/dm-modal';
import BorrowerDetails from './borrower-details';

// export interface Headcells {
//   label: string;
//   isNumeric: boolean;
// }
// interface PTProps {
//   caption?: string;
//   headCells: Headcells[];
//   book: GetBooksQuery['getBooks'][0];
// }

function BookMenu() {
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
            />
            <MenuList>
                <MenuItem icon={<IoCheckmarkDoneOutline />} command="⌘T">
                    Verify
                </MenuItem>
                <MenuItem icon={<MdOutlineCancel />} command="⌘N">
                    Reject
                </MenuItem>
                <MenuItem icon={<IoMdChatbubbles />} command="⌘⇧N">
                    Message
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

function Row({
    loan,
    currentUser
}: {
    loan: Get_Loans_By_IdQuery['loansByLenderId'][0];
    currentUser: CurrentUserQuery['currentUser'];
}) {
    const {
        isOpen: isChatOpen,
        onOpen: onOpenChat,
        onClose: onCloseChat,
    } = useDisclosure();
    const {
        isOpen: isBorrowerOpen,
        onOpen: onOpenBorrower,
        onClose: onCloseBorrower,
    } = useDisclosure();

    const [createConversation, { data, error, loading }] = useMutation(
        CreateConversationDocument
    );
    const toast = useToast();
    const onCreateConversation = async () => {
        try {
            await createConversation({
                variables: {
                    createConversationData: {
                        participantIds: [loan.borrower.id],
                    },
                },
            });
            onOpenChat();
        } catch (err: any) {
            console.log('error creating conversation');
            toast({
                position: 'top',
                title: err?.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <Tr>
            <Td>{Number(loan.id) + 1}</Td>
            <Td>
                <Flex gap="5px">
                    <Image
                        src={loan.book.cover}
                        height={20}
                        width={20}
                        alt={loan.book.title}
                    />
                    <Text fontSize="sm">{capitalize(loan.book.title)}</Text>
                </Flex>
            </Td>
            {/* <Td>{moment(loan.createdAt).format('Do MMM YYYY')}</Td> */}
            <Td>{moment(loan.returnDate).format('Do MMM YYYY')}</Td>
            <Td>{loan.status}</Td>
            <Td>
                <Text onClick={onOpenBorrower} color="blue" cursor="pointer">
                    {loan.borrower.username}
                </Text>
            </Td>
            <Td>{loan.loanOverdue.toString()}</Td>
            <Td>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<MdOutlineMoreVert />}
                        variant="ghost"
                    />
                    <MenuList>
                        <MenuItem icon={<IoCheckmarkDoneOutline size="20px" />}>
                            Verify
                        </MenuItem>
                        <MenuItem icon={<MdOutlineCancel size="20px" />}>Reject</MenuItem>
                        <MenuItem
                            onClick={onCreateConversation}
                            icon={<IoMdChatbubbles size="20px" />}
                        >
                            Message
                        </MenuItem>
                    </MenuList>
                </Menu>
                {data?.createConversation.conversation && (
                    <DmModal
                        isOpen={isChatOpen}
                        onClose={onCloseChat}
                        conversationId={data.createConversation.conversation.id}
                        to={data.createConversation.conversation.participants}
                        sender={currentUser}
                    />
                )}
            </Td>
            <BorrowerDetails
                isOpen={isBorrowerOpen}
                onClose={onCloseBorrower}
                user={loan.borrower}
            />
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
    // {
    //   label: 'Loaned',
    //   isNumeric: false,
    // },
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
        label: 'Overdue',
        isNumeric: false,
    },
    {
        label: 'Options',
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

    return (
        <Box>
            {loansLoading && (
                <Flex justifyContent="center">
                    <CircularProgress />
                </Flex>
            )}
            {loans && (
                <TableContainer>
                    {data?.currentUser && loans?.loansByLenderId.length ? (
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
                                {loans?.loansByLenderId.map((loan) => (
                                    <Row
                                        key={loan.id}
                                        loan={loan}
                                        currentUser={data.currentUser}
                                    />
                                ))}
                            </Tbody>
                        </Table>
                    ) : <Text align='center'>No books.</Text>}

                </TableContainer>
            )}
        </Box>
    );
}
