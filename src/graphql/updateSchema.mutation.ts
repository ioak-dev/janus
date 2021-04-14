import gql from 'graphql-tag';

export const updateSchemaMutation = gql`
  mutation updateSchema($payload: SchemaPayload) {
    updateSchema(payload: $payload) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
