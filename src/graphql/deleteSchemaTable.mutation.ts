import gql from 'graphql-tag';

export const deleteSchemaTableMutation = gql`
  mutation deleteSchemaTable($idList: [ID!]) {
    deleteSchemaTable(idList: $idList) {
      idList
    }
  }
`;
