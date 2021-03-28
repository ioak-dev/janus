<template>
  <app-section subtle>
    <div slot>
      <div class="app-action-bar">
        <div>
          <oak-button theme="primary" variant="regular" shape="sharp" @button-click="$emit('save')"
            ><font-awesome-icon :icon="['fas', 'check']" />Save</oak-button
          >
          <oak-button theme="default" variant="appear" shape="sharp" @button-click="closeEdit"
            ><font-awesome-icon :icon="['fas', 'times']" />Cancel</oak-button
          >
        </div>
      </div>
    </div>
  </app-section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { compose as spacingCompose } from '@oakui/core-stage/style-composer/OakSpacingComposer';
import AppSection from '@/components/ui/AppSection.vue';

export default defineComponent({
  name: 'ActionBarEdit',
  props: {
    isEdit: Boolean,
    closeEdit: Function,
    openEdit: Function
  },
  components: { AppSection },
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
