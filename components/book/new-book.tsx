import MainModal from '@/components/modal';
import {
  AddBookDocument,
  GetBooksDocument,
  GetBooksQuery
} from '@/generated/gql/graphql';
import { useMutation } from '@apollo/client';
import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

const bookSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  tag: Yup.string().required('Book category is required')
});

export default function NewBook() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState('');
  const [addBook, { data, loading, reset }] = useMutation(AddBookDocument, {
    refetchQueries: [{ query: GetBooksDocument }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    }
    // update: (cache, response) => {
    //   cache.updateQuery({ query: GetBooksDocument }, (res) => {
    //     return {
    //       getBooks: res?.getBooks.concat(response.data?.addBook || []) || [],
    //     };
    //   });
    // },
  });
  const toast = useToast();

  const initialRef = React.useRef(null);

  const handleClose = () => {
    onClose();
    reset();
  };
  useEffect(() => {
    if (data && !data.addBook.message) {
      toast({
        position: 'top',
        title: 'Book successfully added!',
        status: 'success',
        duration: 2000,
        isClosable: true
      });
      handleClose();
    }
    if (data?.addBook.message === 'book not found') {
      toast({
        position: 'bottom-right',
        title:
          'A book with that author was not found ;( in case of a mismatch please edit the book with the correct details',
        status: 'warning',
        duration: 6000,
        isClosable: true
      });
      handleClose();
    }
  }, [data, loading, onClose]);

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      tag: ''
    },
    validationSchema: bookSchema,
    onSubmit: async (values) => {
      await addBook({ variables: { newBookData: values } });
    }
  });

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        colorScheme="tomato"
        minWidth="100px"
        leftIcon={<AddIcon />}
        onClick={onOpen}
        _hover={{
          backgroundColor: 'primaries.yellow',
          color: 'primaries.white',
          border: 'none'
        }}
      >
        New Book
      </Button>
      <MainModal
        initialRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        header="Add a New Book"
      >
        <Text fontSize="sm" color="red">
          {error}
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            isInvalid={formik.touched.title && Boolean(formik.errors.title)}
          >
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              id="book-title"
              size="lg"
              ref={initialRef}
              onChange={formik.handleChange}
              isInvalid={formik.touched.title && Boolean(formik.errors.title)}
            />
            <FormErrorMessage id="title-error" fontSize="xs" color="red.600">
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
              id="author"
              size="lg"
              onChange={formik.handleChange}
              isInvalid={formik.touched.author && Boolean(formik.errors.author)}
            />
            <FormErrorMessage id="author-error" fontSize="xs" color="red.600">
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
              id="tag"
              size="lg"
              onChange={formik.handleChange}
              isInvalid={formik.touched.tag && Boolean(formik.errors.tag)}
            />
            <FormErrorMessage id="tag-error" fontSize="xs" color="red.600">
              {formik.errors.tag}
            </FormErrorMessage>
          </FormControl>
          <Box display="flex" justifyContent="end" mt={4}>
            <Button
              variant="solid"
              type="submit"
              id="new-book-btn"
              background="primaries.yellow"
              color="primaries.white"
              _hover={{
                bg: 'primaries.yellow',
                color: 'white'
              }}
              mr={3}
            >
              Submit
            </Button>
            <Button
              variant="outline"
              color="primaries.yellow"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </MainModal>
    </>
  );
}
