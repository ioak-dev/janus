<template>
  <div class="view-table-list-view">
    <ListTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListTable from '@/components/TableManagement/ListTable/index.vue';

export default defineComponent({
  name: 'ListTableView',
  components: {
    ListTable
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.view-table-list-view {
  margin: 20px;
}
</style>
