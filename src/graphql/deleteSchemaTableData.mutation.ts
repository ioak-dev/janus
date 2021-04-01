import gql from 'graphql-tag';

export const deleteSchemaTableDataMutation = gql`
  mutation deleteSchemaTableData($idList: [ID!]) {
    deleteSchemaTableData(idList: $idList) {
      idList
    }
  }
`;
