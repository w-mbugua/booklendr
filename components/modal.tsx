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
  header?: string;
  children: React.ReactNode;
  initialRef?: MutableRefObject<null>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | 'full';
}

export default function MainModal({
  isOpen,
  onOpen,
  onClose,
  children,
  header,
  initialRef,
  size = 'md',
}: ModalProps) {
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        size={size}
        isOpen={isOpen}
        onClose={onClose}
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
