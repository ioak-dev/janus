<template>
  <div class="view-table-data-view">
    <ViewTableData :tableId="$route.params.tableId" :recordId="$route.params.recordId" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ViewTableData from '@/components/TableTransaction/ViewTableData/index.vue';

export default defineComponent({
  name: 'ViewTableDataView',
  components: {
    ViewTableData
  }
});
</script>

<style scoped lang="scss">
.view-table-data-view {
  // margin: 20px;
}
</style>
