<template>
  <div class="text-table-datatype" :class="wrap ? 'wrap-text' : ''">
    <text-view-datatype :rowData="rowData" :cellHeader="cellHeader" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import TextViewDatatype from '@/components/DatatypeView/TextViewDatatype.vue';

export default defineComponent({
  components: { TextViewDatatype },
  name: 'ListTableDatatype',
  props: {
    rowData: Object,
    cellHeader: Object,
    wrap: Boolean
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.text-table-datatype {
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
