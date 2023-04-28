
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: ["graphql/**/*.ts"],
  generates: {
    "./generated/gql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        fragmentMasking: false
      }
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
