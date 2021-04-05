<template>
  <teleport to="#toolbar-left">
    <div class="app-toolbar-action-container">
      <oak-click-area @click-area-click="$emit('add')">
        <div class="app-toolbar-action app-toolbar-action--primary">
          <font-awesome-icon :icon="['fas', 'plus']" />Add column
        </div>
      </oak-click-area>
      <oak-click-area @click-area-click="$emit('save')" v-if="editing">
        <div class="app-toolbar-action app-toolbar-action--primary">
          <font-awesome-icon :icon="['fas', 'check']" />Save
        </div>
      </oak-click-area>
      <oak-click-area @click-area-click="$emit('reset')" v-if="editing">
        <div class="app-toolbar-action app-toolbar-action">
          <font-awesome-icon :icon="['fas', 'times']" />Reset
        </div>
      </oak-click-area>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { compose as spacingCompose } from '@oakui/core-stage/style-composer/OakSpacingComposer';

export default defineComponent({
  name: 'ActionBar',
  props: { editing: Boolean },
  computed: {
    headerSpacingStyle() {
      return spacingCompose({ marginVertical: 0, marginHorizontal: 2 });
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
