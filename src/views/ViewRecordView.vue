<template>
  <ViewRecord :tableId="$route.params.tableId" :recordRef="$route.params.recordRef" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import ViewRecord from '@/components/ViewRecord/index.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ViewRecordView',
  components: {
    ViewRecord
  }
});
</script>

<style scoped lang="scss"></style>
