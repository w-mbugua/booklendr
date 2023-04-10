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
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js'
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { LoginUserDocument } from '@/generated/gql/graphql';

function Login() {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [login, { data, error, loading }] = useMutation(LoginUserDocument);

  console.log(data);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Password must be longer than 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      await login({ variables: values });
    },
  });

  return (
    <AuthWrapper>
      <Text align="center" fontSize="sm">
        Enter Your Credentials To Login
      </Text>
      <br />
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <Text fontSize="sm" ml={2} color="red">
            {data?.login?.error && data.login.error[0].message}
          </Text>
          <FormControl
            isInvalid={
              formik.touched.username && Boolean(formik.errors.username)
            }
          >
            <Input
              name="username"
              background="white"
              placeholder="Username"
              size="lg"
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
            isInvalid={
              formik.touched.password && Boolean(formik.errors.password)
            }
          >
            <InputGroup background="white" size="lg">
              <Input
                name="password"
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
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
          <Button
            type="submit"
            rightIcon={<ArrowForwardIcon />}
            colorScheme="blackAlpha"
          >
            Login
          </Button>
          <Text fontSize="md">
            Don&apos;t have an account? <Link href="/register" color="blue.400" _hover={{color: "blue.600"}}>register here</Link>
          </Text>
        </Stack>
      </form>
    </AuthWrapper>
  );
}

export default Login;
