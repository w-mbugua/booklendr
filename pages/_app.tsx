import '@/styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache(),
  credentials: 'include',
});

const theme = extendTheme({
  colors: {
    primaries: {
      lightBlue: '#E8ECEB',
      slateGray: '#94A7AE',
      lavender: '#C0A9BD',
      brown: '#E09E50',
      olive: '#647669',
      darkBlue: '#2D3E4E',
      white: '#fff',
    },
  },
  styles: {
    global: {
      body: {},
      a: {
        _hover: {
          textDecoration: 'none!important',
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}
