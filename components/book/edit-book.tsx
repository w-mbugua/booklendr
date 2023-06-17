import MainModal from '@/components/modal';
import {
  AddBookDocument,
  GetBooksDocument,
  GetBooksQuery,
  UpdateBookDocument
} from '@/generated/gql/graphql';
import { useMutation } from '@apollo/client';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { BookCardProps } from './book-card';
import { File } from 'buffer';
import { Book } from '@/types';

const bookSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  subtitle: Yup.string().nullable(),
  author: Yup.string().required('Author is required'),
  description: Yup.string().required('Description is required'),
  cover: Yup.mixed()
    .test(
      'File size',
      'File size cannot exceed 1MB',
      (value) => !value || value.size <= 1024 * 1024
    )
    .test(
      'format',
      'File type not supported.\n Upload either jpeg or png file.',
      (value) => !value || ['image/jpeg', 'image/png'].includes(value.type)
    )
});

export default function EditBook({ book }: { book: Book }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState('');
  const [updateBook, { data, loading }] = useMutation(UpdateBookDocument, {
    refetchQueries: [{ query: GetBooksDocument }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
      formik.setErrors({ subtitle: error.graphQLErrors[0].message })
    }
  });
  const toast = useToast();

  const initialRef = React.useRef(null);

  useEffect(() => {
    if (!loading && data) {
      toast({
        position: 'top',
        title: 'Book successfully updated!',
        status: 'success',
        duration: 2000,
        isClosable: true
      });
      onClose();
    }
  }, [data, loading, onClose, toast]);

  interface valueProps {
    title: string;
    subtitle: string;
    description: string;
    author: string;
    cover?: File | null;
  }

  const formik = useFormik({
    initialValues: {
      title: book.title,
      subtitle: book.subtitle,
      description: book.description,
      author: book.author.name,
      cover: null
    } as valueProps,
    validationSchema: bookSchema,
    onSubmit: async (values) => {
      const { cover, ...others } = values;
      await updateBook({
        variables: { options: { ...others, id: book.id }, cover }
      });
    }
  });


  return (
    <>
      <Button variant="solid" size={'sm'} fontWeight="normal"
        backgroundColor='primaries.olive' color='white' _hover={{
          bg: 'primaries.olive',
          color: 'white'
        }} onClick={onOpen}>
        Edit
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Text fontSize="sm" color="red">
              {error}
            </Text>
            <form onSubmit={formik.handleSubmit} id='edit-book'>
              <FormControl
                m={4}
                isInvalid={formik.touched.title && Boolean(formik.errors.title)}
              >
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  id="book-title"
                  value={formik.values.title}
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
                isInvalid={
                  formik.touched.subtitle && Boolean(formik.errors.subtitle)
                }
                m={4}
              >
                <FormLabel>Subtitle</FormLabel>
                <Input
                  name="subtitle"
                  id="book-subtitle"
                  value={formik.values.subtitle}
                  size="lg"
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.subtitle && Boolean(formik.errors.subtitle)
                  }
                />
                <FormErrorMessage id="subtitle-error" fontSize="xs" color="red.600">
                  {formik.errors.subtitle}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                m={4}
                isInvalid={formik.touched.author && Boolean(formik.errors.author)}
              >
                <FormLabel>Author</FormLabel>
                <Input
                  name="author"
                  value={formik.values.author}
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
                m={4}
                isInvalid={formik.touched.cover && Boolean(formik.errors.cover)}
              >
                <FormLabel>Book Cover:</FormLabel>
                <Input
                  name="cover"
                  accept="image/jpeg, image/png"
                  value={undefined}
                  type="file"
                  id="cover"
                  size="lg"
                  p={2}
                  onChange={(event) => {
                    console.log(event.currentTarget.files);

                    formik.setFieldValue(
                      'cover',
                      event.currentTarget.files
                        ? event.currentTarget.files[0]
                        : null
                    );
                  }}
                  isInvalid={formik.touched.cover && Boolean(formik.errors.cover)}
                />
                <FormErrorMessage id="cover-error" fontSize="xs" color="red.600">
                  {formik.errors.cover}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  formik.touched.description && Boolean(formik.errors.description)
                }
                m={4}
              >
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  id="book-description"
                  size="sm"
                  height="sm"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.description && Boolean(formik.errors.description)
                  }
                />
                <FormErrorMessage
                  id="description-error"
                  fontSize="xs"
                  color="red.600"
                >
                  {formik.errors.description}
                </FormErrorMessage>
              </FormControl>

            </form>
          </DrawerBody>

          <DrawerFooter>
            <Box display="flex" justifyContent="end" mt={4}>
              <Button
                variant="solid"
                type="submit"
                id="new-book-btn"
                background="primaries.yellow"
                color="primaries.white"
                _hover={{
                  background: "primaries.yellow",
                  color: "primaries.white"
                }}
                mr={3}
                isLoading={loading}
                form='edit-book'
              >
                Submit
              </Button>
              <Button
                variant="outline"
                color="primaries.yellow"
                onClick={() => {
                  formik.resetForm({});
                  onClose()
                }}
                form='edit-book'
              >
                Cancel
              </Button>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
