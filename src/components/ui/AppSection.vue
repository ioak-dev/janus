<template>
  <div :class="mainSectionStyle" class="app-section">
    <slot />
  </div>
</template>

<script lang="ts">
import { compose as sectionCompose } from '@oakui/core-stage/style-composer/OakSectionComposer';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppSection',
  props: {
    subtle: Boolean
  },
  computed: {
    mainSectionStyle(): string {
      return sectionCompose({
        outlineColor: 'none',
        elevation: this.subtle ? 0 : 1,
        fillColor: this.subtle ? 'none' : 'container',
        marginHorizontal: 4,
        marginVertical: 0,
        paddingHorizontal: this.subtle ? 0 : 3,
        paddingVertical: this.subtle ? 0 : 3
      });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-section {
  margin-top: 20px;
}
</style>
