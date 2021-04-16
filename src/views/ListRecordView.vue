<template>
  <list-record v-if="tableId" :tableId="tableId" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import ListRecord from '@/components/ListRecord/index.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ListRecordView',
  components: {
    ListRecord
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
