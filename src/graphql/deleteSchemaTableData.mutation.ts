import gql from 'graphql-tag';

export const deleteSchemaTableDataMutation = gql`
  mutation deleteSchemaTableData($tableId: ID!, $idList: [ID!]) {
    deleteSchemaTableData(tableId: $tableId, idList: $idList) {
      idList
    }
  }
`;
