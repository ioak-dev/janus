<template>
  <div class="text-table-datatype" :class="wrap ? 'wrap-text' : ''">
    <computed-view-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import ComputedViewDatatype from '@/components/DatatypeView/ComputedViewDatatype.vue';

export default defineComponent({
  components: { ComputedViewDatatype },
  name: 'ComputedTableDatatype',
  props: {
    rowData: Object,
    cellHeader: Object,
    wrap: Boolean
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.computed-table-datatype {
  white-space: normal;
  min-width: 100px;
  max-width: 200px;
  &.wrap-text {
    div {
      display: -webkit-box !important;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
