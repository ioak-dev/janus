import gql from 'graphql-tag';

export const updateSchemaTableMutation = gql`
  mutation updateSchemaTable($payload: SchemaTablePayload) {
    updateSchemaTable(payload: $payload) {
      id
      schemaId
      name
      description
      createdAt
      updatedAt
    }
  }
`;
