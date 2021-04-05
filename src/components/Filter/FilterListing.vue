<template>
  <div class="filter-listing">
    <app-section subtle>
      <div slot>
        <div>
          <oak-select
            name="operator"
            fill="float"
            label="Choose filter"
            placeholder="Choose a filter"
            :value="currentFilter.id"
            :optionsAsKeyValue="filterList"
            size="small"
            @select-change="handleFilterChange"
            gutterBottom="true"
          />
          <create-filter
            :tableId="tableId"
            :filter="currentFilter"
            @change="$emit('change', $event)"
          />
        </div>
      </div>
    </app-section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import AppSection from '@/components/ui/AppSection.vue';
import CreateFilter from './CreateFilter.vue';

export default defineComponent({
  name: 'FilterListing',
  props: {
    tableId: String,
    currentFilter: Object,
    appliedFilter: Object
  },
  components: { AppSection, CreateFilter },
  setup(props) {
    const store = useStore();
    const columns = computed(() => store.getters.getColumnByTable(props.tableId));
    const filters = computed(() => store.getters.getFilterByTable(props.tableId));
    const filterList = computed(() =>
      store.getters.getFilterByTable(props.tableId).map((item: any) => {
        return { id: item.id, value: item.name };
      })
    );

    return { columns, filters, filterList };
  },
  methods: {
    handleFilterChange(event: any) {
      this.$emit(
        'change',
        this.filters.find((item: any) => item.id === event.detail.value)
      );
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filter-listing {
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  width: 100%;
}

.filter-listing__filter-item {
  padding: 10px 6px;
  width: 100%;
  display: grid;
  grid-template-columns: 12px 1fr;
  column-gap: 6px;
  align-items: center;
  // background-color: var(--color-container);
  &:hover {
    background-color: var(--color-primary-semitransparent2);
    cursor: pointer;
  }
  border-bottom: 1px solid var(--color-global-darker);
}

.filter-listing__filter-item__check {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
