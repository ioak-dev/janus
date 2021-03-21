import gql from 'graphql-tag';

export const schemaTableDataByIdQuery = gql`
  query schemaTableDataById($tableId: ID!, $id: ID!) {
    schemaTableDataById(tableId: $tableId, id: $id) {
      id
      tableId
      row
      relation
    }
  }
`;
