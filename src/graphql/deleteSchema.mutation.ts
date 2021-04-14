import gql from 'graphql-tag';

export const deleteSchemaMutation = gql`
  mutation deleteSchema($idList: [ID!]) {
    deleteSchema(idList: $idList) {
      idList
    }
  }
`;
