<template>
  <ViewRecord :tableId="$route.params.tableId" :recordId="$route.params.recordId" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ViewRecord from '@/components/ViewRecord/index.vue';

export default defineComponent({
  name: 'ViewRecordView',
  components: {
    ViewRecord
  }
});
</script>

<style scoped lang="scss"></style>
