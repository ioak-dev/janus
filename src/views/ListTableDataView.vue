<template>
  <div class="view-table-data-view">
    <ListTableData />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListTableData from '@/components/TableTransaction/ListTableData/index.vue';

export default defineComponent({
  name: 'ListTableDataView',
  components: {
    ListTableData
  }
});
</script>
<style scoped lang="scss">
.view-table-data-view {
  // margin: 20px;
}
</style>
