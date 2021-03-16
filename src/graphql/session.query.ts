import gql from 'graphql-tag';

export const sessionQuery = gql`
  query session($id: ID!, $space: String) {
    session(id: $id, space: $space) {
      id
      firstName
      lastName
      email
      token
    }
  }
`;
