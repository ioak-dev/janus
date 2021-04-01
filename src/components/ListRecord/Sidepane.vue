<template>
  <div>
    <view-record-main
      v-if="selectedRecords.length === 1"
      :tableId="table.id"
      :recordId="selectedRecords[0]"
    />
    <div v-if="selectedRecords.length > 1">
      More than one selected. Show bulk edit options. Or show some statistics or chart data using
      chosen records
    </div>
    <div v-if="selectedRecords.length === 0">Show activity log for the current table</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ViewRecordMain from '@/components/ViewRecord/ViewRecordMain.vue';

export default defineComponent({
  name: 'Sidepane',
  components: { ViewRecordMain },
  props: {
    selectedRecords: Array,
    table: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
