<template>
  <div class="manage-table-view">
    <manage-table />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ManageTable from '@/components/TableManagement/ManageTable/index.vue';

export default defineComponent({
  name: 'ManageTableView',
  components: {
    ManageTable
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.manage-table-view {
  margin: 20px;
}
</style>
