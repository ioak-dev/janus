import { allSchemaTableFilterBySchemaIdQuery } from '@/graphql/allSchemaTableFilterBySchemaId.query';
import { updateSchemaTableFilterMutation } from '@/graphql/updateSchemaTableFilter.mutation';
import { useMutation } from '@vue/apollo-composable';

export const useUpdateSchemaTableFilterMutation = (schemaId: string) => {
  const { mutate } = useMutation(updateSchemaTableFilterMutation, () => ({
    update: (cache, mutationResult) => {
      const data: any = cache.readQuery({
        query: allSchemaTableFilterBySchemaIdQuery,
        variables: {
          schemaId
        }
      });
      console.log(
        ...data.allSchemaTableFilterBySchemaId.filter(
          (item: any) => item.id !== mutationResult.data.updateSchemaTableFilter.id
        ),
        mutationResult.data.updateSchemaTableFilter
      );
      cache.writeQuery({
        query: allSchemaTableFilterBySchemaIdQuery,
        variables: {
          schemaId
        },
        data: {
          allSchemaTableFilterBySchemaId: [
            ...data.allSchemaTableFilterBySchemaId.filter(
              (item: any) => item.id !== mutationResult.data.updateSchemaTableFilter.id
            ),
            mutationResult.data.updateSchemaTableFilter
          ]
        }
      });
    }
  }));

  return mutate;
};
