<template>
  <div v-if="rowData?.row && cellHeader.datatype === 'text'" class="data-cell">
    <text-table-datatype :rowData="rowData" :cellHeader="cellHeader" :wrap="wrap" />
  </div>
  <div v-if="rowData?.row && cellHeader.datatype === 'number'" class="data-cell">
    <number-table-datatype :rowData="rowData" :cellHeader="cellHeader" :wrap="wrap" />
  </div>
  <div v-if="rowData?.row && cellHeader.datatype === 'date'" class="data-cell">
    <date-table-datatype :rowData="rowData" :cellHeader="cellHeader" :wrap="wrap" />
  </div>
  <div v-if="rowData?.row && cellHeader.datatype === 'list'" class="data-cell">
    <list-table-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
  <div v-if="rowData?.row && cellHeader.datatype === 'relation'" class="data-cell">
    <relation-table-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
  <div v-if="rowData?.row && cellHeader.datatype === 'user'" class="data-cell">
    <user-table-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
  <div v-if="rowData?.row && cellHeader.datatype === 'percentage'" class="data-cell">
    <percentage-table-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
  <div v-if="rowData?.row && cellHeader.datatype === 'computed'" class="data-cell">
    <computed-table-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
  <div
    v-if="
      !['text', 'number', 'date', 'list', 'relation', 'user', 'percentage', 'computed'].includes(
        cellHeader.datatype
      )
    "
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
import NumberTableDatatype from './NumberTableDatatype.vue';
import DateTableDatatype from './DateTableDatatype.vue';
import UserTableDatatype from './UserTableDatatype.vue';
import PercentageTableDatatype from './PercentageTableDatatype.vue';
import ComputedTableDatatype from './ComputedTableDatatype.vue';

export default defineComponent({
  name: 'DatatypeTableView',
  components: {
    TextTableDatatype,
    NumberTableDatatype,
    DateTableDatatype,
    RelationTableDatatype,
    ListTableDatatype,
    UserTableDatatype,
    PercentageTableDatatype,
    ComputedTableDatatype
  },
  props: {
    rowData: Object,
    cellHeader: Object,
    wrap: Boolean
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.datatype-table-view {
}
</style>
