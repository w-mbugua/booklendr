import { graphql } from '@/generated/gql';

const UPDATE_BOOK = graphql(`
  mutation updateBook($options: BookUpdateInput!, $cover: Upload) {
    updateBook(options: $options, cover: $cover) {
      ...bookFields
    }
  }
`);
