import gql from 'graphql-tag';

export const allSchemaTableBySchemaIdQuery = gql`
  query allSchemaTableBySchemaId($schemaId: ID!) {
    allSchemaTableBySchemaId(schemaId: $schemaId) {
      id
      schemaId
      reference
      name
      description
    }
  }
`;
