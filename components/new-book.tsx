import MainModal from '@/components/modal';
import { AddBookDocument } from '@/generated/gql/graphql';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';

const bookSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  tag: Yup.string().required('Book Category is required'),
});

export default function NewBook() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addBook, { data, error, loading }] = useMutation(AddBookDocument);
  const toast = useToast()

  const initialRef = React.useRef(null);

  useEffect(() => {
    if (!loading && data) {
      toast({
        position: 'top',
        title: 'Book successfully added!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      onClose();
    }
  }, [data, loading, onClose]);

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      tag: '',
    },
    validationSchema: bookSchema,
    onSubmit: async (values) => {
      await addBook({ variables: { newBookData: values } });
    },
  });

  return (
    <>
      <Button
        variant="ghost"
        color="primaries.olive"
        borderRadius={0}
        onClick={onOpen}
        _hover={{
          backgroundColor: 'primaries.olive',
          color: 'primaries.white',
          border: 'none',
        }}
      >
        New Book
      </Button>
      <MainModal
        initialRef={initialRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        header="Add a New Book"
      >
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            isInvalid={formik.touched.title && Boolean(formik.errors.title)}
          >
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              size="lg"
              ref={initialRef}
              onChange={formik.handleChange}
              isInvalid={formik.touched.title && Boolean(formik.errors.title)}
            />
            <FormErrorMessage fontSize="xs" color="red.600">
              {formik.errors.title}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            mt={1}
            isInvalid={formik.touched.author && Boolean(formik.errors.author)}
          >
            <FormLabel>Author</FormLabel>
            <Input
              name="author"
              size="lg"
              onChange={formik.handleChange}
              isInvalid={formik.touched.author && Boolean(formik.errors.author)}
            />
            <FormErrorMessage fontSize="xs" color="red.600">
              {formik.errors.author}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            mt={1}
            isInvalid={formik.touched.tag && Boolean(formik.errors.tag)}
          >
            <FormLabel>Category</FormLabel>
            <Input
              name="tag"
              size="lg"
              onChange={formik.handleChange}
              isInvalid={formik.touched.tag && Boolean(formik.errors.tag)}
            />
            <FormErrorMessage fontSize="xs" color="red.600">
              {formik.errors.tag}
            </FormErrorMessage>
          </FormControl>
          <Box display="flex" justifyContent="end" mt={4}>
            <Button
              variant="solid"
              type="submit"
              background="primaries.olive"
              color="primaries.white"
              mr={3}
            >
              Submit
            </Button>
            <Button variant="outline" color="primaries.olive" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </MainModal>
    </>
  );
}
