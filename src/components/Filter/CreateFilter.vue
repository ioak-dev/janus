<template>
  <div class="filter-listing">
    <oak-input
      name="name"
      label="Filter name"
      :value="filter.name"
      fill="global"
      size="small"
      @input-input="handleNameChange"
      gutterBottom="true"
    />
    <oak-tab
      @tab-change="handleTabChange"
      :tabs="tabs"
      :activeTabIndex="activeTab"
      color="secondary"
      variant="underline"
    >
      <div slot="content" class="filter-tab">
        <div v-if="activeTab === 0">
          <oak-select
            name="operator"
            label="Matches"
            fill="global"
            :value="filter.search.operator"
            :optionsAsKeyValue="operatorList"
            size="small"
            @select-change="handleOperatorChange"
            gutterBottom="true"
          />
          <condition-listing
            :tableId="tableId"
            :conditions="filter.search.condition"
            @change="handleConditionChange"
          />
        </div>
      </div>
    </oak-tab>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watch, watchEffect } from 'vue';
import { useStore } from 'vuex';
import ConditionListing from './ConditionListing.vue';

export default defineComponent({
  name: 'CreateFilter',
  props: {
    tableId: String,
    filter: Object
  },
  components: { ConditionListing },
  setup(props) {
    const tabs = ['Search', 'Sort'];
    const activeTab = ref(0);
    const store = useStore();
    const columns = computed(() => store.getters.getColumnByTable(props.tableId));
    const profile = computed(() => store.getters.getProfile);
    const operatorList = [
      { id: 'and', value: 'All conditions must match' },
      { id: 'or', value: 'At least one condition must match' }
    ];

    return { columns, profile, operatorList, activeTab, tabs };
  },
  methods: {
    handleTabChange(event: any) {
      this.activeTab = event.detail.value;
    },
    handleNameChange(event: any) {
      this.$emit('change', { ...this.filter, name: event.detail.value });
    },
    handleOperatorChange(event: any) {
      this.$emit('change', {
        ...this.filter,
        search: { ...this.filter?.search, operator: event.detail.value }
      });
    },
    handleConditionChange(event: any) {
      this.$emit('change', {
        ...this.filter,
        search: { ...this.filter?.search, condition: event.detail.value }
      });
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

.filter-tab {
  padding: 12px 4px;
}
</style>
