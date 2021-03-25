<template>
  <div v-if="rowData?.row && cellHeader.datatype === 'text'" class="data-cell">
    <text-table-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
  <div v-if="rowData?.row && cellHeader.datatype === 'number'" class="data-cell">
    {{ rowData.row[cellHeader.id] }}
  </div>
  <div v-if="rowData?.row && cellHeader.datatype === 'list'" class="data-cell">
    <list-table-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
  <div v-if="rowData?.row && cellHeader.datatype === 'relation'" class="data-cell">
    <relation-table-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
  <div
    v-if="!['text', 'number', 'list', 'relation'].includes(cellHeader.datatype)"
    class="data-cell"
  >
    datatype ({{ cellHeader.datatype }}) not supported
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import ListTableDatatype from './ListTableDatatype.vue';
import RelationTableDatatype from './RelationTableDatatype.vue';
import TextTableDatatype from './TextTableDatatype.vue';

export default defineComponent({
  name: 'DatatypeTableView',
  components: { TextTableDatatype, RelationTableDatatype, ListTableDatatype },
  props: {
    rowData: Object,
    cellHeader: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.datatype-table-view {
}
</style>
