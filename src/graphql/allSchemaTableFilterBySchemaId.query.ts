import gql from 'graphql-tag';

export const allSchemaTableFilterBySchemaIdQuery = gql`
  query allSchemaTableFilterBySchemaId($schemaId: ID!) {
    allSchemaTableFilterBySchemaId(schemaId: $schemaId) {
      id
      tableId
      name
      search
      sort
    }
  }
`;
