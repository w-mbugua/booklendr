import { graphql } from '@/generated/gql';

const addBook = graphql(`
  mutation AddBook($newBookData: NewBookInput!) {
    addBook(newBookData: $newBookData) {
      id
      title
      status
      tags {
        name
      }
      author {
        name
        id
      }
    }
  }
`);
