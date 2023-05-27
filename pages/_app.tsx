import '@/styles/globals.css';
import {
  ChakraProvider,
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import type { AppProps } from 'next/app';
import {
  Merriweather,
  Lato,
  Open_Sans,
  Source_Sans_Pro,
} from 'next/font/google';
import { createUploadLink } from 'apollo-upload-client';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const merriweather = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_API_URL as string,
  })
);

const httpLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export const theme = extendTheme({
  initialColorMode: 'dark',
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
      body: {
        p: {
          color: '#000',
          fontSize: '16px',
        },
        h4: {
          color: '#000!important',
          fontWeight: 'bold',
        },
        h6: {
          color: '#000!important',
          fontWeight: 'bold',
        },
      },
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
        <main className={merriweather.className} style={{ height: '100%' }}>
          <Component {...pageProps} />
        </main>
      </ApolloProvider>
    </ChakraProvider>
  );
}
