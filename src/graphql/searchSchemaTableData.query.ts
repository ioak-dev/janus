import gql from 'graphql-tag';

export const searchSchemaTableDataQuery = gql`
  query searchSchemaTableData(
    $tableId: ID!
    $pageSize: Int
    $pageNo: Int
    $filterId: String
    $anonymousFilter: JSON
    $quickFilter: JSON
  ) {
    searchSchemaTableData(
      tableId: $tableId
      pageSize: $pageSize
      pageNo: $pageNo
      filterId: $filterId
      anonymousFilter: $anonymousFilter
      quickFilter: $quickFilter
    ) {
      pageNo
      hasMore
      total
      results {
        id
        reference
        tableId
        row
        relation
      }
    }
  }
`;
