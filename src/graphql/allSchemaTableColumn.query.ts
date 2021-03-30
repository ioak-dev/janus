import gql from 'graphql-tag';

export const allSchemaTableColumnQuery = gql`
  query allSchemaTableColumn($tableId: ID!) {
    allSchemaTableColumn(tableId: $tableId) {
      id
      tableId
      name
      datatype
      meta
    }
  }
`;
