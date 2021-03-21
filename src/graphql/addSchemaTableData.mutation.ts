import gql from 'graphql-tag';

export const addSchemaTableDataQuery = gql`
  mutation addSchemaTableData($payload: SchemaTableDataPayload) {
    addSchemaTableData(payload: $payload) {
      id
      tableId
      row
    }
  }
`;
