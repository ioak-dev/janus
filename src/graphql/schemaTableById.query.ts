import gql from 'graphql-tag';

export const schemaTableByIdQuery = gql`
  query schemaTableById($id: ID!) {
    schemaTableById(id: $id) {
      id
      name
    }
  }
`;
