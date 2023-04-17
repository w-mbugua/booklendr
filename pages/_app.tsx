import '@/styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import {
  Merriweather,
  Lato,
  Open_Sans,
  Source_Sans_Pro,
} from 'next/font/google';

const merriweather = Open_Sans({ subsets: ['latin'], weight: ['300', '400'], style: ['normal', 'italic'] });

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
      body: {
        p: {
          color: '#000',
          fontSize: '16px'
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
