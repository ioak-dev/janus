<template>
  <ViewRecord v-if="tableId" :tableId="tableId" :recordRef="$route.params.recordRef" />
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
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const tableId = computed(() => store.getters.tableRefToId(route.params.tableRef));
    return { tableId };
  }
});
</script>

<style scoped lang="scss"></style>
