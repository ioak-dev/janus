import gql from 'graphql-tag';

export const allSchemaQuery = gql`
  query allSchema {
    allSchema {
      id
      name
    }
  }
`;
