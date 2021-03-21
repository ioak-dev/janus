<template>
  <div class="edit-table-data">
    <oak-form formGroupName="edit-table-data-form" @form-submit="handleSubmit">
      <div class="edit-table-data__form">
        <div
          class="edit-table-data__form__element"
          v-for="column in allSchemaTableColumnQueryResult"
          :key="column.id"
        >
          <div class="edit-table-data__form__element__label">{{ column.name }}</div>
          <div class="edit-table-data__form__element__value">
            <datatype-edit
              :value="state[column.id]"
              :cellHeader="column"
              @change="handleChange"
              formGroupName="edit-table-data-form"
            />
          </div>
        </div>
      </div>
      <oak-form-actions-container align="right">
        <oak-button
          theme="primary"
          variant="regular"
          type="click"
          @button-click="handleSubmit"
          formGroupName="edit-table-data-form"
          >Save changes</oak-button
        >
      </oak-form-actions-container>
    </oak-form>
  </div>
</template>

<script lang="ts">
import { allSchemaTableColumnQuery } from '@/graphql/allSchemaTableColumn.query';
import { addSchemaTableDataQuery } from '@/graphql/addSchemaTableData.mutation';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { mapGetters } from 'vuex';
import { schemaTableDataByIdQuery } from '@/graphql/schemaTableDataById.query';
import DatatypeEdit from '../../DatatypeEdit/index.vue';

export default defineComponent({
  name: 'EditTableData',
  computed: {
    ...mapGetters(['getProfile'])
  },
  components: { DatatypeEdit },
  methods: {
    handleChange(event: any) {
      console.log(event);
      this.state = { ...this.state, [event.detail.name]: event.detail.value };
    },
    goToTable(event: any) {
      this.$router.push(`/${this.getProfile.space}/table/${this.$route.params.id}`);
    },
    handleSubmit(event: any) {
      console.log(event);
      console.log(this.state.value);
      this.mutate().then((response) => {
        this.$router.go(-1);
      });
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
    const allSchemaTableColumnQueryResult = useResult(allSchemaTableColumnQueryOutput.result);

    const schemaTableDataByIdQueryOutput = useQuery(
      schemaTableDataByIdQuery,
      ref({
        tableId: route.params.id,
        id: route.params.rowId
      })
    );
    const schemaTableDataByIdQueryResult = useResult(schemaTableDataByIdQueryOutput.result);

    const state: any = ref({});
    if (allSchemaTableColumnQueryResult.value && schemaTableDataByIdQueryResult.value) {
      allSchemaTableColumnQueryResult.value.forEach((column: any) => {
        state.value[column.id] = schemaTableDataByIdQueryResult.value.row[column.id];
      });
    }
    watch(schemaTableDataByIdQueryResult, (currentValue, _) => {
      if (allSchemaTableColumnQueryResult.value) {
        allSchemaTableColumnQueryResult.value.forEach((column: any) => {
          state.value[column.id] = currentValue.row[column.id];
        });
      }
    });
    watch(allSchemaTableColumnQueryResult, (currentValue, _) => {
      if (schemaTableDataByIdQueryResult.value) {
        currentValue.forEach((column: any) => {
          state.value[column.id] = schemaTableDataByIdQueryResult.value.row[column.id];
        });
      }
    });

    const { mutate } = useMutation(addSchemaTableDataQuery, () => ({
      variables: {
        payload: {
          id: route.params.rowId,
          tableId: route.params.id,
          row: state.value
        }
      }
    }));
    return {
      allSchemaTableColumnQueryResult,
      schemaTableDataByIdQueryResult,
      schemaTableDataByIdQueryOutput,
      loading: allSchemaTableColumnQueryOutput.loading || schemaTableDataByIdQueryOutput.loading,
      state,
      mutate
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.edit-table-data {
}
.edit-table-data__form {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: flex-start;
  // justify-items: flex-start;
  column-gap: 20px;
  row-gap: 20px;
  font-size: 14px;
}
.edit-table-data__form__element {
  display: flex;
  flex-direction: column;
  gap: 6px;
  // background-color: var(--color-container);
  padding: 10px;
  border-radius: 4px;
}
.edit-table-data__form__element__label {
  font-weight: 600;
}
.edit-table-data__form__element__value {
}
</style>
