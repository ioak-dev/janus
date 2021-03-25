<template>
  <div class="action-bar">
    <div>
      <oak-button theme="default" variant="outline" shape="sharp" @button-click="goBack">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Back</oak-button
      >
    </div>
    <div>
      <oak-button
        v-if="!isEdit"
        theme="primary"
        variant="regular"
        shape="sharp"
        @button-click="openEdit"
        ><font-awesome-icon :icon="['fas', 'pencil-alt']" />Edit</oak-button
      >
      <oak-button
        v-if="isEdit"
        theme="primary"
        variant="regular"
        shape="sharp"
        @button-click="closeEdit"
        ><font-awesome-icon :icon="['fas', 'check']" />Save</oak-button
      >
      <oak-button
        v-if="isEdit"
        theme="default"
        variant="appear"
        shape="sharp"
        @button-click="closeEdit"
        ><font-awesome-icon :icon="['fas', 'times']" />Cancel</oak-button
      >
      <oak-button
        v-if="!isEdit"
        theme="danger"
        variant="appear"
        shape="sharp"
        @button-click="goBack"
        ><font-awesome-icon :icon="['fas', 'trash-alt']" />Delete</oak-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { compose as spacingCompose } from '@oakui/core-stage/style-composer/OakSpacingComposer';

export default defineComponent({
  name: 'ActionBar',
  props: {
    record: Object,
    isEdit: Boolean,
    closeEdit: Function,
    openEdit: Function
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
.action-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  div {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
}
</style>
