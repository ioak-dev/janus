<template>
  <div class="action-footer action-footer-sidepane position-right">
    <oak-button
      theme="primary"
      variant="outline"
      shape="sharp"
      :formGroupName="formGroupName"
      type="submit"
      ><font-awesome-icon :icon="['fas', 'check']" />Save</oak-button
    >
    <oak-button theme="default" variant="outline" shape="sharp" @button-click="$emit('close')"
      ><font-awesome-icon :icon="['fas', 'times']" />Cancel</oak-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { compose as spacingCompose } from '@oakui/core-stage/style-composer/OakSpacingComposer';

export default defineComponent({
  name: 'ActionBarEdit',
  props: { formGroupName: String },
  computed: {
    headerSpacingStyle() {
      return spacingCompose({ marginVertical: 0, marginHorizontal: 2 });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
