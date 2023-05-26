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

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: string | React.ReactNode;
  children?: React.ReactNode;
  initialRef?: MutableRefObject<null>;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | 'full';
  isCentered?: boolean;
}

export default function MainModal({
  isOpen,
  onClose,
  children,
  header,
  initialRef,
  size = 'md',
  isCentered = false,
}: ModalProps) {
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        size={size}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
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
