import gql from 'graphql-tag';

export const addSchemaTableDataMutation = gql`
  mutation addSchemaTableData($payload: SchemaTableDataPayload) {
    addSchemaTableData(payload: $payload) {
      id
      tableId
      row
    }
  }
`;
