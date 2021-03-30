<template>
  <oak-sheet
    fillColor="global"
    position="right"
    sizeVertical="two-third"
    sizeHorizontal="half"
    :isOpen="isOpen"
    @sheet-close="$emit('close')"
  >
    <create-record
      :tableId="tableId"
      :columnHeaders="columns"
      :record="record"
      @saved="$emit('close')"
      @close="$emit('close')"
    />
  </oak-sheet>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { allSchemaTableColumnQuery } from '@/graphql/allSchemaTableColumn.query';
import CreateRecord from './CreateRecord.vue';

export default defineComponent({
  components: { CreateRecord },
  name: 'CreateRecordPrompt',
  props: { isOpen: Boolean, tableId: String, record: Object },
  data() {
    return {};
  },
  setup(props) {
    const allSchemaTableColumnQueryOutput = useQuery(
      allSchemaTableColumnQuery,
      ref({
        tableId: props.tableId
      })
    );
    return {
      columns: useResult(allSchemaTableColumnQueryOutput.result),
      loading: allSchemaTableColumnQueryOutput.loading
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
