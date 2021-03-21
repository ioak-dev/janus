<template>
  <div class="create-table-data-view">
    <CreateTableData />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateTableData from '@/components/TableTransaction/CreateTableData/index.vue';

export default defineComponent({
  name: 'CreateTableDataView',
  components: {
    CreateTableData
  }
});
</script>

<style scoped lang="scss">
.create-table-data-view {
  margin: 20px;
}
</style>
