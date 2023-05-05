import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { startCase } from 'lodash';
import React from 'react';

export interface alertProps {
  isOpen: boolean;
  onOpen: () => void;
}

interface ConfirmationAlertProps extends alertProps {
  action: string;
  onClose: (status: boolean) => void;
}

export default function ConfirmationAlert({
  action,
  isOpen,
  onOpen,
  onClose,
}: ConfirmationAlertProps) {
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => onClose(false)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {startCase(action)}
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure you want to proceed?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => onClose(false)}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => onClose(true)} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
