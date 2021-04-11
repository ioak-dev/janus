<template>
  <div class="action-footer action-footer-sidepane position-right">
    <oak-button
      type="submit"
      :formGroupName="formGroupName"
      theme="primary"
      variant="outline"
      shape="sharp"
      ><font-awesome-icon :icon="['fas', 'check']" />Save</oak-button
    >
    <oak-button theme="default" variant="outline" shape="sharp" @button-click="closeEdit"
      ><font-awesome-icon :icon="['fas', 'times']" />Cancel</oak-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { compose as spacingCompose } from '@oakui/core-stage/style-composer/OakSpacingComposer';

export default defineComponent({
  name: 'ActionBarEdit',
  props: {
    isEdit: Boolean,
    closeEdit: Function,
    openEdit: Function,
    formGroupName: String
  },
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
<style scoped lang="scss">
.sidepane-action-bar {
  justify-content: flex-end;
}
</style>
