<template>
  <div class="filter-prompt">
    <sidepane-heading
      heading="Filter settings"
      @close="$emit('close')"
      @expand="$emit('expand')"
      @collapse="$emit('collapse')"
      :isSidepaneExpanded="isSidepaneExpanded"
    />
    <div class="filter-prompt__main">
      <action-bar
        @save="handleSubmit"
        @close="$emit('close')"
        @apply="$emit('apply', currentFilter)"
        @clear="$emit('clear')"
        :currentFilter="currentFilter"
        :appliedFilter="filter"
      />
      <filter-listing
        :tableId="tableId"
        :currentFilter="currentFilter"
        :appliedFilter="filter"
        @change="handleFilterChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { filterDefinitionChangedSubject } from '@/events/FilterDefinitionChangedEvent';
import { useUpdateSchemaTableFilterMutation } from '@/services/FilterService';
import SidepaneHeading from '@/components/ui/SidepaneHeading.vue';
import FilterListing from './FilterListing.vue';
import ActionBar from './ActionBar.vue';

export default defineComponent({
  components: { FilterListing, ActionBar, SidepaneHeading },
  name: 'FilterPane',
  props: { isOpen: Boolean, tableId: String, filter: Object, isSidepaneExpanded: Boolean },
  setup(props) {
    const store = useStore();
    const profile = computed(() => store.getters.profile);
    const view = ref('list');
    const emptyFilter = {
      id: null,
      tableId: props.tableId,
      name: '',
      search: { operator: 'and', condition: [] },
      sort: null
    };
    const currentFilter = ref(emptyFilter);
    const filterMutate = useUpdateSchemaTableFilterMutation(profile?.value?.schema || '');
    return { view, emptyFilter, currentFilter, filterMutate, profile };
  },
  methods: {
    changeView(view: string) {
      this.view = view;
    },
    handleFilterChange(filter: any) {
      this.currentFilter = filter;
      console.log(filter);
    },
    handleSubmit() {
      this.filterMutate({
        payload: {
          id: this.currentFilter.id,
          tableId: this.tableId,
          name: this.currentFilter.name,
          search: this.currentFilter.search,
          sort: this.currentFilter.sort
        }
      }).then((response: any) => {
        filterDefinitionChangedSubject.next({ schemaId: this.profile.schema });
      });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filter-prompt {
  display: grid;
  grid-template-rows: 1fr auto;
  width: 100%;
}
.filter-prompt__main {
  overflow-y: auto;
}
</style>
