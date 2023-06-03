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
import { Link } from '@chakra-ui/next-js';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { LoginUserDocument } from '@/generated/gql/graphql';
import { isEmail, isValidPhone } from '@/utils/helpers';
import useAuth from '../hooks/useAuth';
import Label from '@/components/forms/label';

function Login() {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [login, { data, error, loading }] = useMutation(LoginUserDocument);  

  const validationSchema = Yup.object().shape({
    username: Yup.string().test((username) => {
      if (
        username &&
        (isEmail(username as string) ||
          isValidPhone((username as string).replace(/\s/g, '')))
      ) {
        return true;
      }

      return new Yup.ValidationError(
        'Invalid email or phone number',
        undefined,
        'username'
      );
    }),
    password: Yup.string()
      .min(6, 'Password must be longer than 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (data) => {
      const vals = {
        ...data,
        email: isEmail(data.username) ? data.username : '',
        phoneNumber: isValidPhone(data.username.replace(/\s/g, ''))
          ? data.username.replace(/\s/g, '')
          : '',
      };

      const response = await login({ variables: vals });
      if (response.data?.login.member) {
        router.replace('/home');
      }
    },
  });

  return (
    <AuthWrapper>
      <Text fontSize="sm" color="whiteAlpha.800">
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
            <Label>Email or Phone Number:</Label>
            <Input
              name="username"
              id='username'
              background="white"
              size="lg"
              fontSize="sm"
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
            <Label>Password:</Label>
            <InputGroup fontSize="sm" background="white" size="lg">
              <Input
                name="password"
                id='password'
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
          <Button
            type="submit"
            id="login-btn"
            isLoading={formik.isSubmitting}
            rightIcon={<ArrowForwardIcon />}
            bg="primaries.yellow"
            color="primaries.white"
            _hover={{
              backgroundColor: 'primaries.olive',
              color: 'black',
            }}
          >
            Login
          </Button>
          {/* <Text fontSize="md">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              color="blue.400"
              _hover={{ color: 'blue.600' }}
            >
              signup
            </Link>
          </Text> */}
        </Stack>
      </form>
    </AuthWrapper>
  );
}

export default Login;
