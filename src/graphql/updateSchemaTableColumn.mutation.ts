import gql from 'graphql-tag';

export const updateSchemaTableColumnMutation = gql`
  mutation updateSchemaTableColumn($payload: [SchemaTableColumnPayload]) {
    updateSchemaTableColumn(payload: $payload) {
      id
      name
      tableId
      datatype
      meta
      options {
        id
        tableId
        columnId
        value
        color
        icon
      }
    }
  }
`;
