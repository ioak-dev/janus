import gql from 'graphql-tag';

export const activityQuery = gql`
  query activity($domains: [String], $references: [String], $parentReference: String) {
    activity(domains: $domains, references: $references, parentReference: $parentReference) {
      id
      fields
      domain
      operation
      parentReference
      reference
      userId
      createdAt
    }
  }
`;
