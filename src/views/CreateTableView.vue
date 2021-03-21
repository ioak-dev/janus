<template>
  <div class="create-table-view">
    <CreateTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateTable from '@/components/TableManagement/CreateTable/index.vue';

export default defineComponent({
  name: 'CreateTableView',
  components: {
    CreateTable
  }
});
</script>

<style scoped lang="scss">
.create-table-view {
  margin: 20px;
}
</style>
