import gql from 'graphql-tag';

export const allSchemaTableDataQuery = gql`
  query allSchemaTableData($tableId: ID!) {
    allSchemaTableData(tableId: $tableId) {
      id
      tableId
      row
      relation
    }
  }
`;
