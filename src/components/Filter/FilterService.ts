import { addSchemaTableDataMutation } from '@/graphql/addSchemaTableData.mutation';
import { allSchemaTableDataQuery } from '@/graphql/allSchemaTableData.query';
import { useMutation } from '@vue/apollo-composable';

export const useAddSchemaTableDataMutation = (tableId: string) => {
  const { mutate } = useMutation(addSchemaTableDataMutation, () => ({
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
          allSchemaTableData: data.allSchemaTableData.concat(mutationResult.data.addSchemaTableData)
        }
      });
    }
  }));
};
