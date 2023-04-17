import AuthWrapper from '@/components/auth-wrapper';
import {
  Button,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { RegisterDocument } from '@/generated/gql/graphql';

function Register() {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [register, response] = useMutation(RegisterDocument);
  const { data, error, loading } = response;

  console.log(response);

  useEffect(() => {
    if (data.register.member && !data.register.error) {
      router.replace('/login');
    }
  }, [data, router]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Please provide a valid email')
      .required('Email is required'),
    phone: Yup.string().min(3),
    password: Yup.string()
      .min(6, 'Password must be longer than 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      await register({ variables: { newMemberData: values } });
    },
  });

  return (
    <AuthWrapper>
      <Text align="center" fontSize="sm">
        Enter Your Details To Register
      </Text>
      <br />
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <Text fontSize="sm" ml={2} color="red">
            {data?.login?.error && data.login.error[0].message}
          </Text>
          <FormControl
            margin={1}
            isInvalid={
              formik.touched.username && Boolean(formik.errors.username)
            }
          >
            <FormLabel fontSize="sm">Username: *</FormLabel>
            <Input
              name="username"
              background="white"
              size="md"
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.username && Boolean(formik.errors.username)
              }
            />

            <FormErrorMessage fontSize="xs" color="red.600">
              {formik.errors.username}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            margin={1}
            isInvalid={formik.touched.email && Boolean(formik.errors.email)}
          >
            <FormLabel fontSize="sm">Email Address *</FormLabel>
            <Input
              name="email"
              background="white"
              size="md"
              onChange={formik.handleChange}
              isInvalid={formik.touched.email && Boolean(formik.errors.email)}
            />

            <FormErrorMessage fontSize="xs" color="red.600">
              {formik.errors.email}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            margin={1}
            isInvalid={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
          >
            <FormLabel fontSize="sm">Phone Number</FormLabel>
            <Input
              name="phoneNumber"
              background="white"
              size="md"
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
            />

            <FormErrorMessage fontSize="xs" color="red.600">
              {formik.errors.phoneNumber}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={
              formik.touched.password && Boolean(formik.errors.password)
            }
          >
            <FormLabel fontSize="sm">Password *</FormLabel>
            <InputGroup background="white" size="md">
              <Input
                name="password"
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage fontSize="xs" color="red.600">
              {formik.errors.password}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="blackAlpha" bg="primaries.olive">
            Register
          </Button>
          <Text fontSize="md">
            Already have an account?{' '}
            <Link href="/login" color="blue.400" _hover={{ color: 'blue.600' }}>
              login
            </Link>
          </Text>
        </Stack>
      </form>
    </AuthWrapper>
  );
}

export default Register;
