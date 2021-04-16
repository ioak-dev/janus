<template>
  <ListTable v-if="schemaId" :schemaId="schemaId" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import ListTable from '@/components/ListTable/index.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ListTableView',
  components: {
    ListTable
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const schemaId = computed(() => store.getters.schemaRefToId(route.params.schemaRef));
    return { schemaId };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
