<template>
  <div class="create-table-data">
    <oak-form formGroupName="create-table-data-form" @form-submit="handleSubmit">
      <oak-input
        v-for="item in columns"
        :key="item.id"
        type="text"
        :label="item.name"
        :name="item.id"
        :placeholder="item.name"
        :value="state[item.id]"
        @input-input="handleChange"
        formGroupName="create-table-data-form"
        gutterBottom
      />
      <oak-form-actions-container align="right">
        <oak-button
          theme="primary"
          variant="regular"
          type="click"
          @button-click="handleSubmit"
          formGroupName="create-table-data-form"
          >Create</oak-button
        >
        <oak-button theme="info" variant="appear" @button-click="goBack">Cancel</oak-button>
      </oak-form-actions-container>
    </oak-form>
  </div>
</template>

<script lang="ts">
import { allSchemaTableColumnQuery } from '@/graphql/allSchemaTableColumn.query';
import { addSchemaTableDataQuery } from '@/graphql/addSchemaTableData.mutation';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { mapGetters } from 'vuex';
import { allSchemaTableDataQuery } from '@/graphql/allSchemaTableData.query';

export default defineComponent({
  name: 'CreateTableData',
  computed: {
    ...mapGetters(['getProfile'])
  },
  methods: {
    handleChange(event: any) {
      this.state = { ...this.state, [event.detail.name]: event.detail.value };
    },
    goToTable(event: any) {
      this.$router.push(`/${this.getProfile.space}/table/${this.$route.params.id}`);
    },
    handleSubmit(event: any) {
      console.log('***');
      this.mutate().then((response) => this.$router.go(-1));
    }
  },
  setup() {
    const route = useRoute();
    const allSchemaTableColumnQueryOutput = useQuery(
      allSchemaTableColumnQuery,
      ref({
        tableId: route.params.id
      })
    );
    const columns = useResult(allSchemaTableColumnQueryOutput.result);
    const state: any = ref({});
    if (columns.value) {
      columns.value.forEach((column: any) => {
        state.value[column.id] = '';
      });
    }

    const { mutate } = useMutation(addSchemaTableDataQuery, () => ({
      update: (cache, mutationResult) => {
        const data: any = cache.readQuery({
          query: allSchemaTableDataQuery,
          variables: {
            tableId: route.params.id
          }
        });
        cache.writeQuery({
          query: allSchemaTableDataQuery,
          variables: {
            tableId: route.params.id
          },
          data: {
            allSchemaTableData: [...data.allSchemaTableData, mutationResult.data.addSchemaTableData]
          }
        });
      },
      variables: {
        payload: {
          tableId: route.params.id,
          row: state.value
        }
      }
    }));

    return { columns, state, mutate };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.create-table-data {
}
</style>
