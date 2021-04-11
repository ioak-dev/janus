import gql from 'graphql-tag';

export const schemaTableDataByReferenceQuery = gql`
  query schemaTableDataByReference($tableId: ID!, $reference: Int!) {
    schemaTableDataByReference(tableId: $tableId, reference: $reference) {
      id
      tableId
      row
      reference
      relation
    }
  }
`;
