<template>
  <div v-if="rowData?.row && cellHeader.datatype === 'text'" class="data-cell">
    <text-view-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
  <div v-if="rowData?.row && cellHeader.datatype === 'number'" class="data-cell">
    {{ rowData.row[cellHeader.id] }}
  </div>
  <div v-if="rowData?.row && cellHeader.datatype === 'list'" class="data-cell">
    <list-view-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
  <div v-if="rowData?.row && cellHeader.datatype === 'relation'" class="data-cell">
    <relation-view-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
  <div v-if="rowData?.row && cellHeader.datatype === 'user'" class="data-cell">
    <user-view-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
  <div v-if="rowData?.row && cellHeader.datatype === 'percentage'" class="data-cell">
    <percentage-view-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
  <div
    v-if="
      !['text', 'number', 'list', 'relation', 'user', 'percentage'].includes(cellHeader.datatype)
    "
    class="data-cell"
  >
    datatype ({{ cellHeader.datatype }}) not supported
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import ListViewDatatype from './ListViewDatatype.vue';
import RelationViewDatatype from './RelationViewDatatype.vue';
import TextViewDatatype from './TextViewDatatype.vue';
import UserViewDatatype from './UserViewDatatype.vue';
import PercentageViewDatatype from './PercentageViewDatatype.vue';

export default defineComponent({
  name: 'DatatypeView',
  components: {
    TextViewDatatype,
    RelationViewDatatype,
    ListViewDatatype,
    UserViewDatatype,
    PercentageViewDatatype
  },
  props: {
    rowData: Object,
    cellHeader: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.datatype-view {
}
</style>
