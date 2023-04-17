import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { MutableRefObject } from 'react';

interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  header: string;
  children: React.ReactNode;
  initialRef: MutableRefObject<null>
}

export default function MainModal({
  isOpen,
  onOpen,
  onClose,
  children,
  header,
  initialRef
}: ModalProps) {
  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
