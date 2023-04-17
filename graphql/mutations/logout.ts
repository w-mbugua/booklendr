import { graphql } from "@/generated/gql";

const logout = graphql(`
  mutation Logout {
	logout
  }
`)