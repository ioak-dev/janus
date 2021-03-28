<template>
  <div class="field-listing">
    <div v-for="field in columns" :key="field.id">{{ field.name }}</div>
  </div>
</template>

<script lang="ts">
import { allSchemaTableColumnQuery } from '@/graphql/allSchemaTableColumn.query';
import { useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'FieldListing',
  computed: {
    ...mapGetters(['getProfile'])
  },
  props: {
    tableId: String
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
<style scoped lang="scss">
.field-listing {
}
</style>
