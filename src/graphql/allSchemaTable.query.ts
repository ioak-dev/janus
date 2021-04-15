import gql from 'graphql-tag';

export const allSchemaTableQuery = gql`
  query allSchemaTable {
    allSchemaTable {
      id
      schemaId
      reference
      name
      description
    }
  }
`;
