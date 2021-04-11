<template>
  <div class="sidepane-heading">
    <div class="sidepane-heading__left">{{ heading }}</div>
    <div class="sidepane-heading__right">
      <oak-click-area
        v-if="isSidepaneExpanded"
        @click-area-click="$emit('collapse')"
        class="sidepane-heading__rightsidepane-heading__right__expand-collapse"
      >
        <div class="sidepane-heading__right__icon">
          <font-awesome-icon :icon="['fas', 'compress-alt']" />
        </div>
      </oak-click-area>
      <oak-click-area
        v-else
        @click-area-click="$emit('expand')"
        class="sidepane-heading__rightsidepane-heading__right__expand-collapse"
      >
        <div class="sidepane-heading__right__icon">
          <font-awesome-icon :icon="['fas', 'expand-alt']" />
        </div>
      </oak-click-area>
      <oak-click-area @click-area-click="$emit('close')">
        <div class="sidepane-heading__right__icon sidepane-heading__right__icon--close">
          <font-awesome-icon :icon="['fas', 'times']" />
        </div>
      </oak-click-area>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { compose as spacingCompose } from '@oakui/core-stage/style-composer/OakSpacingComposer';

export default defineComponent({
  name: 'SidepaneHeading',
  props: { heading: String, isSidepaneExpanded: Boolean },
  computed: {
    headerSpacingStyle() {
      return spacingCompose({ marginVertical: 0, marginHorizontal: 2 });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sidepane-heading {
  height: 50px;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  margin: 0 5px;
  padding: 0 5px;
  border-bottom: 1px solid var(--global-border-color);
}
.sidepane-heading__left {
  font-size: 14px;
  font-weight: bold;
}
.sidepane-heading__right {
  display: grid;
  grid-auto-flow: column;
  column-gap: 0px;
}
.sidepane-heading__right__icon {
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  transition: color 250ms ease-in-out;
}
.sidepane-heading__rightsidepane-heading__right__expand-collapse {
  display: none;
  @media (min-width: 1000px) {
    display: flex;
  }
}
.sidepane-heading__right__icon--close {
  &:hover {
    color: var(--color-danger);
  }
}
</style>
