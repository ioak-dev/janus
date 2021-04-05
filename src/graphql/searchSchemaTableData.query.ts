import gql from 'graphql-tag';

export const searchSchemaTableDataQuery = gql`
  query searchSchemaTableData(
    $tableId: ID!
    $pageSize: Int
    $pageNo: Int
    $filterId: String
    $anonymousFilter: JSON
  ) {
    searchSchemaTableData(
      tableId: $tableId
      pageSize: $pageSize
      pageNo: $pageNo
      filterId: $filterId
      anonymousFilter: $anonymousFilter
    ) {
      pageNo
      hasMore
      total
      results {
        id
        tableId
        row
        relation
      }
    }
  }
`;
