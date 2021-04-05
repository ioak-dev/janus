import { allSchemaTableDataQuery } from '@/graphql/allSchemaTableData.query';
import { deleteSchemaTableDataMutation } from '@/graphql/deleteSchemaTableData.mutation';
import { searchSchemaTableDataQuery } from '@/graphql/searchSchemaTableData.query';
import { useMutation, useQuery } from '@vue/apollo-composable';

export const deleteRecords = (tableId: string) => {
  const { mutate } = useMutation(deleteSchemaTableDataMutation, () => ({
    update: (cache, mutationResult) => {
      const data: any = cache.readQuery({
        query: allSchemaTableDataQuery,
        variables: {
          tableId
        }
      });
      cache.writeQuery({
        query: allSchemaTableDataQuery,
        variables: {
          tableId
        },
        data: {
          allSchemaTableData: data.allSchemaTableData.filter(
            (item: any) => !mutationResult.data.deleteSchemaTableData.idList.includes(item.id)
          )
        }
      });
    }
  }));

  return mutate;
};
