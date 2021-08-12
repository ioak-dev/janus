import gql from 'graphql-tag';

export const authorizeUserQuery = gql`
  query authorizeUser($accessToken: String, $refreshToken: String) {
    authorizeUser(accessToken: $accessToken, refreshToken: $refreshToken) {
      accessToken
      claims
    }
  }
`;
