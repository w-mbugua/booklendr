import AuthWrapper from '@/src/components/auth-wrapper';
import {
  Button,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';

function Login() {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [login, {data, error, loading}] = useMutation(Login)

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <AuthWrapper>
      <Text align="center" fontSize="sm">
        Enter Your Credentials To Login
      </Text>
      <br />
      <form>
        <Stack spacing={3}>
          <Input background="white" placeholder="Username" size="lg" />
          <InputGroup background="white" size="lg">
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button rightIcon={<ArrowForwardIcon />} colorScheme="blackAlpha">
            Login
          </Button>
        </Stack>
      </form>
    </AuthWrapper>
  );
}

export default Login;
