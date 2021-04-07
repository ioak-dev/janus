<template>
  <div class="user-table-datatype">
    <percentage-view-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import PercentageViewDatatype from '@/components/DatatypeView/PercentageViewDatatype.vue';

export default defineComponent({
  components: { PercentageViewDatatype },
  name: 'PercentageTableDatatype',
  props: {
    rowData: Object,
    cellHeader: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.percentage-table-datatype {
  white-space: normal;
  min-width: 200px;
  max-width: 300px;
  // text-overflow: ellipsis;
  // overflow: hidden;
  // min-width: 100px;
  // max-width: 200px;
  // white-space: normal;
}
</style>
