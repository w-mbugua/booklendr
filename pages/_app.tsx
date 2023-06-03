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
  Inter,
  Poppins,
  Open_Sans,
  Source_Sans_Pro,
  Playfair_Display,
} from 'next/font/google';
import { createUploadLink } from 'apollo-upload-client';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const font = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
});

const headingFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  style: ['normal', 'italic'],
});

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: process.env.NEXT_PUBLIC_WS_URL as string,
          connectionParams: {
            credentials: 'include',
          },
        })
      )
    : null;

const httpLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
});

const splitLink =
  typeof window !== 'undefined' && wsLink !== null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

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
      olive: '#82dc7d',
      darkBlue: '#2D3E4E',
      white: '#fff',
      yellow: '#d6a419',
      yellow2: '#f9f871',
    },
  },
  fonts: {
    body: font.style.fontFamily,
    heading: headingFont.style.fontFamily,
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
        <main style={{ height: '100%', fontSize: '16px' }}>
          <Component {...pageProps} />
        </main>
      </ApolloProvider>
    </ChakraProvider>
  );
}
