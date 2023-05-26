import { Flex, Stack, Text, useDisclosure } from '@chakra-ui/react';
import MainModal, { ModalProps } from '../modal';
import { Get_Loans_By_IdQuery } from '@/generated/gql/graphql';

interface BorrowerDetailsProps extends ModalProps {
  user: Get_Loans_By_IdQuery['loansByLenderId'][0]['borrower'];
}
export default function BorrowerDetails({ user, isOpen, onClose }: BorrowerDetailsProps) {
  return (
    <MainModal isOpen={isOpen} onClose={onClose} isCentered>
      <Stack spacing={3}>
        <Text>Name: {user.username}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Phone: {user.phoneNumber}</Text>
      </Stack>
    </MainModal>
  );
}
