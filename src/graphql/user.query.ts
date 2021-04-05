import gql from 'graphql-tag';

export const userQuery = gql`
  query user {
    user {
      id
      firstName
      lastName
      email
      resolver
    }
  }
`;
