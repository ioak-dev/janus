<template>
  <div class="action-footer action-footer-sidepane position-right">
    <oak-button
      v-if="editing"
      theme="primary"
      variant="outline"
      shape="sharp"
      @button-click="$emit('save')"
      ><font-awesome-icon :icon="['fas', 'check']" />Save</oak-button
    >
    <oak-button theme="default" variant="outline" shape="sharp" @button-click="$emit('add')"
      ><font-awesome-icon :icon="['fas', 'plus']" />Add column</oak-button
    >
    <oak-button theme="default" variant="outline" shape="sharp" @button-click="$emit('reset')"
      ><font-awesome-icon :icon="['fas', 'times']" />Reset</oak-button
    >
  </div>
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
