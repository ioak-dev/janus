<template>
  <div class="filter-status">
    <div v-if="appliedFilter" class="filter-status__group">
      <div class="filter-status__value--active__indicator" />
      Active
    </div>
    <div v-else class="filter-status__group">
      <div class="filter-status__value--inactive__indicator" />
      Inactive
    </div>
    <div v-if="isFilterApplied" class="filter-status__group">
      <div class="filter-status__value--active__indicator" />
      Live
    </div>
    <div v-if="!isFilterApplied && appliedFilter" class="filter-status__group">
      <div class="filter-status__value--inactive__indicator" />
      Outdated
    </div>
  </div>
</template>

<script lang="ts">
import { isEqual } from 'lodash';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FilterStatus',
  props: { appliedFilter: Object, currentFilter: Object },
  setup(props) {
    const isFilterApplied = computed(() => {
      return isEqual(props.currentFilter, props.appliedFilter);
    });

    return { isFilterApplied };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filter-status {
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-end;
  font-size: 12px;
  column-gap: 10px;
}
.filter-status__value--active {
  color: var(--color-success);
}
.filter-status__group {
  display: grid;
  grid-auto-flow: column;
  column-gap: 4px;
  align-items: center;
}
.filter-status__value--inactive__indicator,
.filter-status__value--active__indicator {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: var(--color-1);
}
.filter-status__value--active__indicator {
  background-color: var(--color-success);
}
</style>
