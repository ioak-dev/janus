import gql from 'graphql-tag';

export const updateSchemaTableFilterMutation = gql`
  mutation updateSchemaTableFilter($payload: SchemaTableFilterPayload) {
    updateSchemaTableFilter(payload: $payload) {
      id
      tableId
      name
      search
      sort
    }
  }
`;
