<template>
  <div class="action-footer action-footer-sidepane position-right">
    <oak-button
      v-if="currentFilter.id || currentFilter.name"
      theme="default"
      variant="outline"
      shape="sharp"
      @button-click="$emit('save')"
      ><font-awesome-icon :icon="['fas', 'plus']" />Save</oak-button
    >
    <oak-button
      v-if="!isFilterApplied"
      theme="default"
      variant="outline"
      shape="sharp"
      @button-click="$emit('apply')"
      ><font-awesome-icon :icon="['fas', 'check']" />Apply</oak-button
    >
    <oak-button
      v-if="isFilterApplied"
      theme="default"
      variant="outline"
      shape="sharp"
      @button-click="$emit('clear')"
      ><font-awesome-icon :icon="['fas', 'times']" />Clear</oak-button
    >
    <oak-button
      v-if="currentFilter.id"
      theme="danger"
      variant="outline"
      shape="sharp"
      @button-click="$emit('delete')"
      ><font-awesome-icon :icon="['fas', 'trash-alt']" />Delete</oak-button
    >
  </div>
  <!-- <div>
        <filter-status :currentFilter="currentFilter" :appliedFilter="appliedFilter" />
      </div> -->
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { compose as spacingCompose } from '@oakui/core-stage/style-composer/OakSpacingComposer';
import { isEqual } from 'lodash';
import FilterStatus from './FilterStatus.vue';

export default defineComponent({
  name: 'ActionBar',
  props: { currentFilter: Object, appliedFilter: Object },
  setup(props) {
    const headerSpacingStyle = computed(() =>
      spacingCompose({ marginVertical: 0, marginHorizontal: 2 })
    );
    const isFilterApplied = computed(() => {
      console.log(
        props.currentFilter,
        props.appliedFilter,
        isEqual(ref(props.currentFilter), ref(props.appliedFilter))
      );
      return isEqual(props.currentFilter, props.appliedFilter);
    });

    return { headerSpacingStyle, isFilterApplied };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.action-bar-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
