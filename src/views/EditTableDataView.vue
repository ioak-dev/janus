<template>
  <div class="edit-table-data-view">
    <EditTableData />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EditTableData from '@/components/TableTransaction/EditTableData/index.vue';

export default defineComponent({
  name: 'EditTableDataView',
  components: {
    EditTableData
  }
});
</script>

<style scoped lang="scss">
.edit-table-data-view {
  margin: 20px;
}
</style>
