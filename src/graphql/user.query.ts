import gql from 'graphql-tag';

export const userQuery = gql`
  query user {
    user {
      id
      given_name
      family_name
      name
      nickname
      email
      resolver
    }
  }
`;
