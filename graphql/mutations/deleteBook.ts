import { graphql } from "@/generated/gql";

const DELETE_BOOK = graphql(`
  mutation deleteBook($id: Float!) {
	deleteBook(id: $id)
  }
`)