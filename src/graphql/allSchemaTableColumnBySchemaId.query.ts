import gql from 'graphql-tag';

export const allSchemaTableColumnBySchemaIdQuery = gql`
  query allSchemaTableColumnBySchemaId($schemaId: ID!) {
    allSchemaTableColumnBySchemaId(schemaId: $schemaId) {
      id
      tableId
      name
      datatype
      meta
    }
  }
`;
