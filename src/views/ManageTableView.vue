<template>
  <manage-table />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ManageTable from '@/components/ManageTable/index.vue';

export default defineComponent({
  name: 'ManageTableView',
  components: {
    ManageTable
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
